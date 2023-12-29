import { StatusBar } from "expo-status-bar";
import React, { useContext, useState, useReducer } from "react";
import { Image, ScrollView } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faLight,
  faUser,
  faLock,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";

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

const windownWidth = Dimensions.get("window").width;
const windownHeight = Dimensions.get("window").height;

export default Profile = ({ navigation }) => {
  const [user, dispatch] = useContext(LoginContext);
  // console.log(user);
  return (
    <ScrollView style={styles.viewContainer}>
      <View style={styles.viewHeader}>
        <HeaderComponent user={user} navigation={navigation} />
      </View>

      <View style={styles.viewContent}>
        <ContentComponent
          navigation={navigation}
          dispatch={dispatch}
          user={user}
        />
      </View>

      <View style={styles.viewFooter}>
        <FooterComponent />
      </View>
    </ScrollView>
  );
};

const HeaderComponent = ({ user, navigation }) => {
  return (
    <View style={styles.bgHeader}>
      <View style={styles.bgIconHeader}>
        <TouchableOpacity>
          <Image
            style={styles.iconInbox}
            source={require("../images/setting.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={styles.iconInbox}
            source={require("../images/cart.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={styles.iconInbox}
            source={require("../images/mess.png")}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.bgHeaderUser}>
        {user === null ? (
          <>
            <TouchableOpacity>
              <Image
                style={styles.iconUserLogin}
                source={require("../images/chualogin.png")}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btnDangNhap}
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
              <Text style={styles.textDangNhap}>Đăng nhập</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnDangKy}>
              <Text style={styles.textDangKy}>Đăng ký</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                style={styles.iconUserLogin}
                source={require("../images/chualogin.png")}
              />

              <View>
                <>
                  <Text style={styles.textNameUser}>{user.username}</Text>
                  <Text style={styles.textFollow}>
                    Đang theo dõi
                    <Text style={styles.textCountFollow}> 155</Text>
                  </Text>
                </>
              </View>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

const ContentComponent = ({ dispatch, navigation, user }) => {
  const logout = () => {
    dispatch({
      type: "logout",
    });
  };
  return (
    <View>
      <View>
        <View style={styles.brContent}></View>
        <TouchableOpacity style={styles.bgIconBill}>
          <Image
            source={require("../images/setting1.png")}
            style={styles.iconBill}
          ></Image>
          <Text style={styles.textIconBill}>Đơn mua</Text>
          <Image
            source={require("../images/settingnext.png")}
            style={styles.iconNext}
          ></Image>
        </TouchableOpacity>

        <View style={styles.brContent1}></View>
        <TouchableOpacity style={styles.bgIconBill}>
          <Image
            source={require("../images/setting2.png")}
            style={styles.iconLike}
          ></Image>
          <Text style={styles.textIconBill}>Đã thích</Text>
          <Image
            source={require("../images/settingnext.png")}
            style={styles.iconNext}
          ></Image>
        </TouchableOpacity>

        <View style={styles.brContent1}></View>
        <TouchableOpacity style={styles.bgIconBill}>
          <Image
            source={require("../images/setting3.png")}
            style={styles.iconFollow}
          ></Image>
          <Text style={styles.textIconBill}>Shop đang theo dõi</Text>
          <Image
            source={require("../images/settingnext.png")}
            style={styles.iconNext}
          ></Image>
        </TouchableOpacity>

        <View style={styles.brContent}></View>
        <TouchableOpacity style={styles.bgIconBill}>
          <Image
            source={require("../images/setting4.png")}
            style={styles.iconFollow}
          ></Image>
          <Text style={styles.textIconBill}>Đã xem gần đây</Text>
          <Image
            source={require("../images/settingnext.png")}
            style={styles.iconNext}
          ></Image>
        </TouchableOpacity>

        <View style={styles.brContent1}></View>
        <TouchableOpacity style={styles.bgIconBill}>
          <Image
            source={require("../images/setting5.png")}
            style={styles.iconFollow}
          ></Image>
          <Text style={styles.textIconBill}>Đánh giá của tôi</Text>
          <Image
            source={require("../images/settingnext.png")}
            style={styles.iconNext}
          ></Image>
        </TouchableOpacity>

        <View style={styles.brContent1}></View>
        <TouchableOpacity style={styles.bgIconBill}>
          <Image
            source={require("../images/setting6.png")}
            style={styles.iconFollow}
          ></Image>
          <Text style={styles.textIconBill}>Thiết lập tài khoản</Text>
          <Image
            source={require("../images/settingnext.png")}
            style={styles.iconNext}
          ></Image>
        </TouchableOpacity>

        <View style={styles.brContent}></View>
        <TouchableOpacity style={styles.bgIconBill}>
          <Image
            source={require("../images/setting7.png")}
            style={styles.iconHepl}
          ></Image>
          <Text style={styles.textIconBill}>Trung tâm trợ giúp</Text>
          <Image
            source={require("../images/settingnext.png")}
            style={styles.iconNext}
          ></Image>
        </TouchableOpacity>

        <View style={styles.brContent}></View>
        <TouchableOpacity style={styles.bgIconOpenStore}>
          <Image
            source={require("../images/openstore.png")}
            style={styles.iconOpenStore}
          ></Image>
          <Text style={styles.textOpenStore1}>Bắt đầu bán</Text>
          <Text style={styles.textOpenStore2}>Đăng ký miễn phí</Text>
          <Image
            source={require("../images/settingnext.png")}
            style={styles.iconNext1}
          ></Image>
        </TouchableOpacity>
        <View style={styles.brContent}></View>
      </View>

      <View style={styles.brContent1}></View>
      {user && (
        <>
          <TouchableOpacity style={styles.bgButtonLogin} onPress={logout}>
            <Text style={styles.textBtnLogin}>Đăng xuất</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const FooterComponent = () => {
  return;
};

const styles = StyleSheet.create({
  viewContainer: {
    backgroundColor: "white",
    flex: 1,
  },
  viewHeader: {
    width: "100%",
    flex: 23,
    backgroundColor: "#EE4D2D",
    // backgroundColor: "white",
    // borderWidth: 4,
  },
  viewContent: {
    width: "100%",
    flex: 77,
    // marginTop: 1,
    // alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "white",
    // borderWidth: 1,
  },
  viewFooter: {
    flex: 0,
    // borderWidth: 1,
    backgroundColor: "white",
    width: "100%",
    height: "0%",
  },
  bgHeader: {
    width: windownWidth - 30,
    marginLeft: 14,
  },
  bgIconHeader: {
    // borderWidth: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 65,
    marginBottom: 25,
  },

  iconInbox: {
    height: 25,
    width: 25,
    marginLeft: 15,
  },
  bgHeaderUser: {
    flexDirection: "row",
    // justifyContent: "",
    alignItems: "center",
    marginBottom: 20,
  },
  iconUserLogin: {
    height: 55,
    width: 55,
  },
  btnDangNhap: {
    marginLeft: 103,
    marginRight: 10,
    // width: 0,
    paddingLeft: 18,
    paddingRight: 18,
    borderWidth: 1,
    borderColor: "white",
    padding: 7,
    borderRadius: 2,
    backgroundColor: "white",
  },
  textDangNhap: {
    color: "#C20217",
    fontWeight: "500",
  },
  btnDangKy: {
    // width: 0,
    paddingLeft: 20,
    paddingRight: 20,
    // borderWidth: 1,
    padding: 7,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: "white",
    // backgroundColor: "white",
  },
  textDangKy: {
    color: "white",
    fontWeight: "500",
  },
  brContent: {
    // marginTop: 15,
    height: 7,
    width: "200%",
    backgroundColor: "#f0efef",
    // marginRight: 10,
  },
  brContent1: {
    height: 1,
    width: "200%",
    backgroundColor: "#f0efef",
    // marginRight: 10,
  },
  bgIconBill: {
    position: "relative",
    width: windownWidth - 30,
    marginLeft: 15,
    // borderWidth: 1,
    paddingBottom: 13,
    paddingTop: 13,
    // padding: 7,
    flexDirection: "row",
    alignItems: "center",
    // elevation: 5
    // justifyContent: 'flex-start'
  },
  bgIconOpenStore: {
    position: "relative",
    // width: windownWidth - 30,
    paddingLeft: 15,
    // paddingRight: 30,
    paddingBottom: 13,
    paddingTop: 13,
    backgroundColor: "#FFF0EE",
    flexDirection: "row",
    alignItems: "center",
  },
  iconBill: {
    height: 24,
    width: 24,
    marginRight: 12,
  },
  iconNext: {
    position: "absolute",
    height: 23,
    width: 23,
    right: 0,
  },
  iconNext1: {
    position: "absolute",
    height: 23,
    width: 23,
    right: 0,
    marginRight: 15,
  },
  iconLike: {
    height: 21,
    width: 22,
    marginRight: 14,
  },
  iconFollow: {
    height: 22,
    width: 22,
    marginRight: 13.5,
  },
  iconHepl: {
    height: 23,
    width: 23,
    marginRight: 13,
  },
  textIconBill: {
    color: "#202020",
    fontSize: 15,
    fontWeight: "400",
  },
  bgButtonLogin: {
    height: 45,
    borderRadius: 5,
    width: windownWidth - 80,
    marginLeft: 40,
    marginTop: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EE4D2D",
    marginBottom: 20,
  },
  textBtnLogin: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  textNameUser: {
    fontSize: 22,
    marginLeft: 15,
    color: "white",
    fontWeight: "500",
  },
  textFollow: {
    // marginRight: 15,
    fontSize: 14,
    marginLeft: 15,
    color: "white",
  },
  textCountFollow: {
    fontSize: 14,
    fontWeight: "600",
    color: "white",
  },
  iconOpenStore: {
    height: 21,
    width: 21,
    marginRight: 12,
  },
  textOpenStore2: {
    position: "absolute",
    right: 43,
    color: "#575757",
    paddingBottom: 1,
  },
  textOpenStore1: {
    color: "#EE4D2D",
    fontWeight: "500",
    marginLeft: 2  
  },
});
