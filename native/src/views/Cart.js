import { StatusBar } from "expo-status-bar";
import React, { useContext, useState } from "react";
import { Image, ScrollView } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faLight,
  faUser,
  faLock,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import DropDown from "react-native-dropdown-picker";
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useCart } from "../context/CartContext";
import { LoginContext } from "./Index";

const windownWidth = Dimensions.get("window").width;
const windownHeight = Dimensions.get("window").height;

export default Cart = ({ navigation }) => {
  const [user, dispatch] = useContext(LoginContext);
  const isLoggedIn = user !== null;
  return (
    <View style={styles.viewContainer}>
      <View style={styles.viewHeader}>
        <HeaderComponent />
      </View>

      <View style={styles.viewContent}>
        <ContentComponent
          navigation={navigation}
          user={user}
          isLoggedIn={isLoggedIn}
        />
      </View>

      <View style={styles.viewFooter}>
        <FooterComponent user={user} isLoggedIn={isLoggedIn} />
      </View>
    </View>
  );
};

const HeaderComponent = () => {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      {/* Component Header */}
      <View style={styles.containerHeader}>
        <View style={styles.signIn}>
          <TouchableOpacity>
            <Text style={styles.textSignIn}>Giỏ hàng (31)</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.bgIconMess}>
            <Image
              source={require("../images/333.png")}
              style={styles.iconBack}
            ></Image>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.brButton6}></View>

      <View style={styles.bgContent}>
        <View style={styles.bgFreeShip}>
          <Image
            source={require("../images/freeship.png")}
            style={styles.iconFreeShip}
          ></Image>
          <Text>Đừng bỏ lỡ mã Freeship ở mục Voucher</Text>
        </View>
      </View>
      <View style={styles.brButton6}></View>
    </View>
  );
};

const ContentComponent = ({ navigation, user, isLoggedIn }) => {
  const [quantity, setQuantity] = useState(0);

  //add cart
  const [{ cartItems }] = useCart();

  // console.log(cartItems);

  const CartItem = ({ item }) => (
    <View>
      <View>
        <TouchableOpacity style={styles.bgNameShop}>
          <Image
            source={require("../images/shop.png")}
            style={styles.iconShop}
          ></Image>
          <Text style={styles.textShop}>{item.store_info.name_store}</Text>

          <Image
            source={require("../images/settingnext.png")}
            style={styles.iconView}
          ></Image>
        </TouchableOpacity>
        <View style={styles.brButton2}></View>
      </View>

      <View style={styles.bgInfoShop}>
        <TouchableOpacity style={styles.bgImgProduct}>
          <Image
            source={{ uri: item.images[0].thumbnail }}
            style={styles.imgProdcut}
          ></Image>
        </TouchableOpacity>

        <View style={styles.bgInfoProduct}>
          <TouchableOpacity>
            <Text
              style={styles.textNamePr}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              <Text>{item.name_product}</Text>
            </Text>
          </TouchableOpacity>

          {/* dropdown */}
          {/* <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: 15,
              }}
            >
              <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                placeholder={"Choose a fruit."}
                containerStyle={{ height: 15, width: 170 }}
                style={{
                  backgroundColor: "gray",
                  borderColor: "transparent",
                }}
                textStyle={{
                  color: "white",
                }}
                arrowColor={"white"}
                dropDownContainerStyle={{
                  backgroundColor: "gray",
                  borderColor: "transparent",
                }}
              />
            </View> */}
          {/* <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text>Chosen fruit: {value === null ? "none" : value}</Text>
            </View> */}

          <Text style={styles.textPricePr}>{item.price}</Text>

          <View style={styles.bgQuantity}>
            <TouchableOpacity onPress={handleDecrease} style={styles.button}>
              <Text style={styles.buttonText}>–</Text>
            </TouchableOpacity>

            <Text style={styles.quantity}>{quantity}</Text>

            <TouchableOpacity onPress={handleIncrease} style={styles.button}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.brButton2}></View>

      <View style={styles.bgVoucher}>
        <TouchableOpacity style={styles.bgFreeShip}>
          <Image
            source={require("../images/voucher.png")}
            style={styles.iconVoucher}
          ></Image>
          <Text>Voucher giảm đến 5k</Text>

          <Image
            source={require("../images/settingnext.png")}
            style={styles.iconView}
          ></Image>
        </TouchableOpacity>
      </View>

      <View style={styles.brButton1}></View>
    </View>
  );

  //quantily
  const handleDecrease = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };
  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  ///options: size, color,...
  // const [open, setOpen] = useState(false);
  // const [value, setValue] = useState(null);
  // const [items, setItems] = useState([
  //   { label: "Apple", value: "apple" },
  //   { label: "Banana", value: "banana" },
  //   { label: "Pear", value: "pear" },
  // ]);

  return (
    <ScrollView>
      {isLoggedIn ? (
        <>
          {cartItems.map((item, index) => (
            <CartItem key={index} item={item} isLoggedIn={isLoggedIn} />
          ))}
        </>
      ) : (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            padding: 15,
          }}
        >
          <Text style={{ fontSize: 15 }}>Vui lòng</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <Text
              style={{
                fontSize: 15,
                marginLeft: 2,
                color: "#EE4D2D",
                fontWeight: "500",
              }}
            >
              đăng nhập?
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const FooterComponent = ({ user, isLoggedIn }) => {
  return (
    <>
      {isLoggedIn ? (
        <>
          <View style={styles.bgPayProduct}>
            <View style={styles.bgIconChat}>
              <Text style={styles.textIconChat}>Tổng thanh toán:</Text>
              <Text style={styles.textTotalPay}>đ201511</Text>
            </View>

            <TouchableOpacity style={styles.bgPayProduct1}>
              <Text style={styles.textPayProduct}>Mua hàng (0)</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  viewHeader: {
    width: "100%",
    flex: 14.1,
    backgroundColor: "white",
    // borderWidth: 1,
  },
  viewContent: {
    width: "100%",
    flex: 57,
    // marginTop: 1,

    backgroundColor: "white",
    // borderWidth: 1,
  },
  viewFooter: {
    // borderWidth: 1,
    width: "100%",
    flex: 6,
    // backgroundColor: "gray",
  },
  containerHeader: {
    marginTop: 40,
    // width: "100%",
    // height: "100%",
  },
  signIn: {
    height: 60,
    flexDirection: "row",
    backgroundColor: "#FEFEFE",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    // borderWidth: 1
  },
  textSignIn: {
    fontSize: 19,
    color: "black",
    fontWeight: "400",
  },
  brButton: {
    height: 3,
    width: "100%",
    backgroundColor: "#F2F2F2",
    position: "absolute",
    bottom: 0,
  },
  brButton1: {
    height: 10,
    width: "100%",
    backgroundColor: "#F2F2F2",
  },
  brButton6: {
    height: 2,
    width: "100%",
    backgroundColor: "#F2F2F2",
  },
  brButton2: {
    height: 1.5,
    width: "100%",
    backgroundColor: "#F2F2F2",
  },
  bgContent: {
    backgroundColor: "#FFF7E3",
  },
  iconBack: {
    height: 25,
    width: 25,
    // marginLeft: 200,
  },
  bgIconMess: {
    position: "absolute",
    right: 20,
  },
  bgFreeShip: {
    padding: 4,
    flexDirection: "row",
    width: windownWidth - 20,
    marginLeft: 10,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  iconFreeShip: {
    height: 27,
    width: 27,
    marginRight: 15,
  },
  bgNameShop: {
    flexDirection: "row",
    width: windownWidth - 20,
    marginLeft: 10,
    alignItems: "center",
    paddingTop: 13,
    paddingBottom: 13,
    position: "relative",
  },
  iconShop: {
    height: 19,
    width: 19,
    marginRight: 10,
  },
  textShop: {
    fontSize: 14.5,
    fontWeight: "700",
  },
  iconView: {
    position: "absolute",
    height: 21,
    width: 21,
    right: 0,
  },
  bgInfoShop: {
    flexDirection: "row",
    width: windownWidth - 20,
    marginLeft: 10,
    marginTop: 25,
    marginBottom: 25,
    // backgroundColor: "red",
  },
  imgProdcut: {
    height: 80,
    width: 80,
  },
  bgImgProduct: {
    marginRight: 20,
  },
  // bgInfoProduct: {
  //  marginRight: 20
  // },
  bgQuantity: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    // width: 105,
  },
  button: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    width: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#535353",
    fontSize: 15,
    fontWeight: "500",
  },
  quantity: {
    fontWeight: "500",
    color: "#535353",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    fontSize: 15,
    paddingLeft: 15,
    paddingRight: 15,
  },
  textNamePr: {
    maxWidth: "88%",
    fontSize: 15,
  },
  textPricePr: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: "500",
    color: "#EE4D2D",
  },
  iconVoucher: {
    height: 25,
    width: 25,
    marginRight: 15,
  },

  //footer
  bgPayProduct: {
    flex: 1,
    // borderWidth: 2,
    flexDirection: "row",
  },
  bgIconChat: {
    borderTopWidth: 0.5,
    borderTopColor: "#c5c5c5",
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    flexDirection: "row",
  },

  iconChat: {
    marginTop: 5,
    width: 21,
    height: 21,
  },
  textIconChat: {
    marginTop: 2,
    color: "#3b3b3b",
    fontSize: 14,
    marginRight: 7,
  },
  textTotalPay: {
    marginTop: 2,
    color: "black",
    fontSize: 15,
    color: "#EE4D2D",
    fontWeight: "600",
    // marginRight: 5
  },
  bgPayProduct1: {
    borderTopWidth: 0.5,
    borderTopColor: "#EE4D2D",
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EE4D2D",
  },
  textPayProduct: {
    color: "white",
  },
  brFooterPay: {
    width: 1,
    backgroundColor: "#ebebeb",
    // marginRight: 10,
  },
});
