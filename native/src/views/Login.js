import { StatusBar } from "expo-status-bar";
import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { Image } from "react-native";
import { authorize } from "react-native-app-auth";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faLight,
  faUser,
  faLock,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";

// const { hashPassword, comparePassword } = require("../config/bcrypt");

import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { LoginContext } from "./Index";
// import Home from "./home";
const windownWidth = Dimensions.get("window").width;
const windownHeight = Dimensions.get("window").height;

const SIGN_IN = "SIGN_IN";

export default Login = ({ navigation }) => {
  return (
    <View style={styles.viewContainer}>
      <View style={styles.viewHeader}>
        <HeaderComponent />
      </View>

      <View style={styles.viewContent}>
        <ContentComponent navigation={navigation} />
      </View>

      <View style={styles.viewFooter}>
        <FooterComponent navigation={navigation} />
      </View>
    </View>
  );
};

const HeaderComponent = ({ page, setPage }) => {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      {/* Component Header */}
      <View style={styles.containerHeader}>
        <View style={styles.signIn}>
          <TouchableOpacity
            style={styles.backgroundSignIn}
            onPress={() => {
              setPage(SIGN_IN);
            }}
            disabled={page === SIGN_IN ? true : false}
          >
            <Text style={styles.textSignIn}>Đăng nhập</Text>
            {page === SIGN_IN ? <View style={styles.brButton}></View> : null}
          </TouchableOpacity>
        </View>

        <View style={styles.header}>
          <Image
            source={require("../images/shopee.png")}
            style={styles.iconShopee}
          ></Image>
        </View>
      </View>
    </View>
  );
};

const ContentComponent = ({ navigation }) => {
  const [passHidden, setPassHidden] = useState(true);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [token, setToken] = useState(null);

  //show password
  const chaneIconPassHidden = () => {
    setPassHidden(!passHidden);
  };

  const [user, dispatch] = useContext(LoginContext);

  //login
  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://10.0.2.2:8000/o/token/",
        `grant_type=password&username=${username}&password=${password}&client_id=dMlVgp3i59e91nDEGZ0Kq6D7uLX6MKLq3RL68eoT&client_secret=hA095gEXYFSqRCnt2fN2qgzWRL7M6Xpay3Bjd8ddQLVc7LhQzH7mYibKpOrMR7soZhthIaWsKf6rxBHDWohV5ePKNIMFmQQT9gEgS3Dt3ngvlv6zftrKtwk8usb5wFLH`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const accessToken = response.data.access_token;

      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

      const userInfoResponse = await axios.get(
        "http://10.0.2.2:8000/accounts/current_account/"
      );

      console.log("Thông tin người dùng:", userInfoResponse.data);
      dispatch({
        type: "login",
        payload: userInfoResponse.data,
      });
      navigation.navigate("HomeTabs");
    } catch (error) {
      console.error("Đăng nhập thất bại:", error);
      console.log("Error details:", error.response.data);
    }
  };

  return (
    <View style={styles.containerContent}>
      {/* <Text style={styles.textContent}>Nhập tài khoản của bạn</Text> */}
      {/* username */}
      <View style={styles.bgInputTK}>
        <Image
          source={require("../images/username.png")}
          style={styles.iconUser}
        ></Image>
        <TextInput
          style={styles.textInputTK}
          placeholder="Tên đăng nhập"
          autoCapitalize="none"
          placeholderTextColor="#969696"
          onChangeText={(text) => setUsername(text)}
        />
      </View>
      {/* password */}
      <View style={styles.bgInputTK}>
        <Image
          source={require("../images/password.png")}
          style={styles.iconPass}
        ></Image>
        <TextInput
          style={styles.textInputTK}
          placeholder="Mật khẩu"
          autoCapitalize="none"
          placeholderTextColor="#969696"
          secureTextEntry={passHidden ? true : false}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity onPress={chaneIconPassHidden}>
          <FontAwesomeIcon
            icon={passHidden ? faEyeSlash : faEye}
            size={18}
            style={[styles.iconUser, { marginRight: 20, marginLeft: 0 }]}
          />
        </TouchableOpacity>
      </View>

      {/* forget password */}
      <View style={styles.bgForgetPass}>
        <TouchableOpacity style={styles.textForgetPass}>
          <Text style={styles.textForgetPassChild}>Quên mật khẩu?</Text>
        </TouchableOpacity>
      </View>

      {/* button login */}
      <TouchableOpacity
        style={styles.bgButtonLogin}
        // onPress={() => {
        //   navigation.navigate("HomeTabs");
        // }}
        onPress={handleLogin}
      >
        <Text style={styles.textBtnLogin}>Đăng nhập</Text>
      </TouchableOpacity>
    </View>
  );
};

const FooterComponent = ({ navigation }) => {
  return (
    <View style={styles.viewFooter}>
      <View style={styles.bgFooter}>
        <View style={styles.brFooter}></View>
        <Text style={styles.textOR}> Hoặc </Text>
        <View style={styles.brFooter}></View>
      </View>

      <View>
        <TouchableOpacity style={styles.typeLoginGG}>
          <Image
            source={require("../images/google.png")}
            style={styles.iconGG}
          ></Image>
          <View style={styles.brIconLoginGG}></View>
          <Text style={styles.textIconGG}>Tiếp tục với Google </Text>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity style={styles.typeLoginFB}>
          <Image
            source={require("../images/facebook.png")}
            style={styles.iconFB}
          ></Image>
          <View style={styles.brIconLoginFB}></View>
          <Text style={styles.textIconFB}>Tiếp tục với Facebook</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bgTextSignInFooter}>
        <Text style={styles.textSignInFooter}>Bạn chưa có tài khoản?</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Register");
          }}
        >
          <Text style={styles.clickTextSignIn}>Đăng ký ngay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    width: "100%",
    height: "100%",
  },
  viewHeader: {
    width: "100%",
    height: "25%",
    backgroundColor: "white",
    // borderWidth: 1,
  },
  viewContent: {
    width: "100%",
    height: "35%",
    // marginTop: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FEFEFE",
    // borderWidth: 1,
  },
  viewFooter: {
    flex: 1,
    // borderWidth: 1,
    width: "100%",
    height: "40%",
    backgroundColor: "#FEFEFE",
  },
  containerHeader: {
    marginTop: 40,
    width: "100%",
    height: "100%",
  },
  header: {
    width: "100%",
    flex: 1,
    // backgroundColor: "#EE4D2D",
    justifyContent: "center",
    alignItems: "center",
  },
  iconShopee: {
    marginTop: 0,
    width: 75,
    height: 75,
  },
  signIn: {
    height: 55,
    flexDirection: "row",
    backgroundColor: "#FEFEFE",
    borderBottomWidth: 2,
    borderBottomColor: "#eeeeee",
  },
  backgroundSignIn: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  textSignIn: {
    fontSize: 20,
    color: "black",
    fontWeight: "400",
  },
  brButton: {
    height: 2,
    width: "100%",
    backgroundColor: "#F2F2F2",
    position: "absolute",
    bottom: 0,
    shadowColor: "#51A179",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 1,
  },
  containerContent: {
    // borderWidth: 1,
    height: "80%",
    width: "100%",
    justifyContent: "center",
  },
  textContent: {
    fontSize: 22,
    marginBottom: 6,
    fontWeight: "700",
    color: "black",
    marginLeft: 30,
    // textAlign: 'center'
  },
  bgInputTK: {
    width: windownWidth - 60,
    marginLeft: 30,
    marginTop: 10,
    backgroundColor: "white",
    height: 53,
    // borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#EE4D2D",
    // elevation: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#dddddd",
  },
  iconUser: {
    height: 22,
    width: 22,
    marginLeft: 12,
  },
  iconPass: {
    height: 24,
    width: 24,
    marginLeft: 10,
  },
  textInputTK: {
    height: "100%",
    flex: 1,
    marginLeft: 15,
    fontSize: 15,
    marginRight: 15,
  },
  bgForgetPass: {
    height: 30,
    width: windownWidth - 60,
    marginLeft: 30,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  textForgetPass: {
    position: "absolute",
    right: 0,
  },
  textForgetPassChild: {
    color: "#1A76EC",
  },
  bgButtonLogin: {
    height: 48,
    borderRadius: 5,
    width: windownWidth - 60,
    marginLeft: 30,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EE4D2D",
    marginBottom: 20,
  },
  textBtnLogin: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
  },
  bgFooter: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: windownWidth - 60,
    marginLeft: 30,
    height: 20,
  },
  brFooter: {
    height: 1,
    width: "30%",
    backgroundColor: "#999999",
  },
  textOR: {
    marginLeft: 15,
    marginRight: 15,
  },
  brIconLoginGG: {
    height: "100%",
    width: 2,
    backgroundColor: "#b4b4b4",
    marginRight: 30,
  },
  typeLoginGG: {
    flexDirection: "row",
    height: 45,
    width: windownWidth - 60,
    marginLeft: 30,
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ececec",
  },
  iconGG: {
    marginRight: 20,
    width: 24,
    height: 24,
  },
  textIconGG: {
    color: "black",
    fontWeight: "400",
    fontSize: 15,
    paddingRight: 15,
  },
  brIconLoginFB: {
    height: "100%",
    width: 2,
    backgroundColor: "#b4b4b4",
    marginRight: 30,
  },
  typeLoginFB: {
    flexDirection: "row",
    height: 45,
    width: windownWidth - 60,
    marginLeft: 30,
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ececec",
  },
  iconFB: {
    marginRight: 20,
    width: 25,
    height: 25,
  },
  textIconFB: {
    color: "black",
    fontWeight: "400",
    fontSize: 15,
  },
  bgTextSignInFooter: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
    backgroundColor: "#f8f8f8",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  textSignInFooter: {
    color: "#414141",
  },
  clickTextSignIn: {
    marginLeft: 10,
    color: "#1A76EC",
  },
});
