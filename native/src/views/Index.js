import React, {
  Component,
  useState,
  useEffect,
  createContext,
  useReducer,
} from "react";
import { View, Text, SafeAreaView, Image } from "react-native";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
// import Profile from "./Profile";
// import Cart from "./Cart";
import ProductDetail from "./ProductDetail";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
// import {} from "@fortawesome/free-solid-svg-icons";
import { faHouse, faUser } from "@fortawesome/free-regular-svg-icons";
import { SafeAreaProvider } from "react-native-safe-area-context";
import MyTabs from "../views/MyTabs";
import LoginReducer from "../reducer/LoginReducer";
import CartReducer from "../reducer/CartReducer";
import { CartProvider } from "../context/CartContext";

const Stack = createNativeStackNavigator();

const initialUser = null;

export const LoginContext = createContext();

const RootComponent = () => {
  const [user, dispatch] = useReducer(LoginReducer, initialUser);
  const [cart, dispatchCart] = useReducer(CartReducer, { cartItems: [] });
  return (
    <CartProvider initialState={cart} reducer={CartReducer}>
      <LoginContext.Provider value={[user, dispatch]}>
        <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="HomeTabs"
              screenOptions={{ headerShown: false }}
            >
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Register" component={Register} />
              <Stack.Screen name="ProductDetail" component={ProductDetail} />

              {/* <Stack.Screen name="Cart" component={Cart} /> */}
              {/* <Stack.Screen name="Profile" component={Profile} /> */}

              <Stack.Screen name="HomeTabs" component={MyTabs} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </LoginContext.Provider>
    </CartProvider>
  );
};

export default RootComponent;

const styles = {
  cartIcon: {
    height: 29,
    width: 29,
    marginRight: 3,
  },
};
