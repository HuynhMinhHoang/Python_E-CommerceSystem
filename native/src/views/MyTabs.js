import React, {
  useState,
  useEffect,
  useContext,
  useReducer,
  createContext,
} from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./Home";
import Cart from "./Cart";
import Profile from "./Profile";
import { View, Text, SafeAreaView, Image } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import LoginContext from "../context/LoginContext";
import LoginReducer from "../reducer/LoginReducer";

const Tab = createBottomTabNavigator();

const MyTabs = () => {
  const [selectedTab, setSelectedTab] = useState("Home");

  useEffect(() => {
    setSelectedTab("Home");
  }, []);

  const tabBarOptions = {
    headerShown: false,
    tabBarStyle: {
      backgroundColor: "#FEFEFE",
      padding: 5,
      borderRadius: 0,
      height: 55,
      elevation: 10,
    },
    tabBarLabelStyle: {
      marginBottom: 5,
      fontWeight: "bold",
    },
    tabBarActiveTintColor: "#EE4D2D",
    tabBarInactiveTintColor: "#5a595e",
  };

  const tabBarIconOptions = (route, color, size) => {
    const icons = {
      Home: {
        default: require("../images/home.png"),
        selected: require("../images/home1.png"),
      },
      Cart: {
        default: require("../images/cartt.png"),
        selected: require("../images/cart1.png"),
      },
      Profile: {
        default: require("../images/user.png"),
        selected: require("../images/user1.png"),
      },
    };

    const isCurrentTab = route.name === selectedTab;
    const imageSource = isCurrentTab
      ? icons[route.name].selected
      : icons[route.name].default;

    const cartStyle = route.name === "Cart" ? styles.cartIcon : null;

    return (
      <Image
        source={imageSource}
        style={{ width: size, height: size, tintColor: color, ...cartStyle }}
      />
    );
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        ...tabBarOptions,
        tabBarIcon: ({ color, size }) => tabBarIconOptions(route, color, size),
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Trang chủ",
        }}
        listeners={{
          tabPress: () => {
            setSelectedTab("Home");
          },
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarLabel: "Giỏ hàng",
        }}
        listeners={{
          tabPress: () => {
            setSelectedTab("Cart");
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Cá nhân",
        }}
        listeners={{
          tabPress: () => {
            setSelectedTab("Profile");
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default MyTabs;

const styles = {
  cartIcon: {
    height: 29,
    width: 29,
    marginRight: 3,
  },
};
