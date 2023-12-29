import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, FlatList, Button } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import DateTimePicker from "@react-native-community/datetimepicker";

import {
  faLight,
  faUser,
  faLock,
  faEye,
  faEyeSlash,
  faUserPen,
  faEnvelopeCircleCheck,
  faPhone,
  faLocationDot,
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
import DropDown from "react-native-dropdown-picker";

const windownWidth = Dimensions.get("window").width;
const windownHeight = Dimensions.get("window").height;
const SIGN_IN = "SIGN_IN";

export default Register = ({ navigation }) => {
  const [page, setPage] = useState(SIGN_IN);
  const [avatar, setAvatar] = useState(null);

  return (
    <View style={styles.viewContainer}>
      <View style={styles.viewHeader}>
        <HeaderComponent page={page} setPage={setPage} />
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
            <Text style={styles.textSignIn}>Đăng ký</Text>
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

  const [isOpenRole, setIsOpenRole] = useState(false);
  const [isOpenGender, setIsOpenGender] = useState(false);
  const [roleOptions, setRoleOptions] = useState([]);
  const [selectedGender, setSelectedGender] = useState(null);
  const [avatar, setAvatar] = useState(null);
  // const [selectedImageUri, setSelectedImageUri] = useState(null);

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  //regisger
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [currentValue, setCurrentValue] = useState();

  //register
  const registerUser = async () => {
    try {
      const formData = new FormData();
      formData.append("full_name", fullName);
      formData.append("date_of_birth", dateOfBirth);
      formData.append("gender", selectedGender);
      formData.append("address", address);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("username", username);
      formData.append("password", password);

      if (avatar) {
        formData.append("avt", {
          uri: avatar.uri,
          name: avatar.fileName,
          type: avatar.type,
        });
      }

      formData.append("role", currentValue);

      const response = await fetch("http://10.0.2.2:8000/accounts/register/", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Đăng ký thành công:", data);
        navigation.navigate("Login");
      } else {
        console.log("Đăng ký không thành công:", data);
      }
    } catch (error) {
      console.error("Lỗi kết nối:", error);
      // console.log(fullName, avatar);
    }
  };

  //validated input

  //select gender
  const [genderOptions, setGenderOptions] = useState([
    { label: "Nam", value: true },
    { label: "Nữ", value: false },
  ]);

  //select dateOfbirth
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    setDateOfBirth(currentDate.toLocaleDateString());

    // Cập nhật giá trị cho date_of_birth
    const formattedDateOfBirth = currentDate.toISOString().split("T")[0];
    setDateOfBirth(formattedDateOfBirth);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  //upload avt
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Không được phép!");
    } else {
      const res = await ImagePicker.launchImageLibraryAsync();
      if (!res.canceled) {
        setAvatar(res.assets[0]);
      }
    }
  };

  const chaneIconPassHidden = () => {
    setPassHidden(!passHidden);
  };

  //select role
  const fetchRoles = async () => {
    try {
      const response = await fetch("http://10.0.2.2:8000/roles/");
      const data = await response.json();

      const filteredRoles = data.filter(
        (role) => role.name_role !== "Admin" && role.name_role !== "Manager"
      );

      const formattedRoles = filteredRoles.map((role) => ({
        label: role.name_role,
        value: role.id,
      }));

      setRoleOptions(formattedRoles);

      setCurrentValue(null);
    } catch (error) {
      console.error("Lỗi: ", error);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  //render item
  const renderItem = ({ item }) => {
    switch (item) {
      case 1:
        return (
          <View>
            <View style={styles.textInfo}>
              <Text style={styles.textInfoAC}>*Thông tin tài khoản</Text>
            </View>

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

            {/* confirm password */}
            <View style={styles.bgInputTK}>
              <Image
                source={require("../images/password.png")}
                style={styles.iconPass}
              ></Image>
              <TextInput
                style={styles.textInputTK}
                placeholder="Nhập lại mật khẩu"
                autoCapitalize="none"
                placeholderTextColor="#969696"
                secureTextEntry={passHidden ? true : false}
              />
              <TouchableOpacity onPress={chaneIconPassHidden}>
                <FontAwesomeIcon
                  icon={passHidden ? faEyeSlash : faEye}
                  size={18}
                  style={[styles.iconUser, { marginRight: 20, marginLeft: 0 }]}
                />
              </TouchableOpacity>
            </View>

            {/* role selection */}
            <View style={styles.bgOption}>
              <DropDown
                style={styles.inputBgOption}
                items={roleOptions}
                open={isOpenRole}
                setOpen={() => setIsOpenRole(!isOpenRole)}
                value={currentValue}
                setValue={(val) => setCurrentValue(val)}
                maxHeight={100}
                placeholder="Chọn vai trò người dùng"
              />
              {/* <Text style={styles.textBgOption}>
                Vai trò đã chọn: {currentValue}
              </Text> */}
            </View>

            <View style={styles.textInfoPerson}>
              <Text style={styles.textInfoAC}>*Thông tin cá nhân</Text>
            </View>

            {/* full name */}
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <View style={[styles.bgInputTK, { width: 200 }]}>
                <Image
                  source={require("../images/fullname.png")}
                  style={styles.iconFullname}
                ></Image>
                <TextInput
                  style={styles.textInputTK}
                  placeholder="Họ và tên"
                  autoCapitalize="none"
                  placeholderTextColor="#969696"
                  onChangeText={(text) => setFullName(text)}
                />
              </View>

              {/* gender */}
              <View>
                <DropDown
                  style={[styles.inputBgOptionGender, { width: 110 }]}
                  items={genderOptions}
                  open={isOpenGender}
                  setOpen={() => setIsOpenGender(!isOpenGender)}
                  value={selectedGender}
                  setValue={(val) => setSelectedGender(val)}
                  maxHeight={80}
                  placeholder="Giới tính"
                  dropDownContainerStyle={{
                    width: 110,
                    marginLeft: 25,
                    height: 100,
                  }}
                />
              </View>
            </View>

            {/* birthday */}
            <View style={styles.bgInputTK}>
              <Image
                source={require("../images/birthday.png")}
                style={styles.iconBirth}
              />
              <TextInput
                style={styles.textInputTK}
                placeholder={dateOfBirth || "Ngày sinh"}
                editable={false}
                placeholderTextColor={dateOfBirth ? "black" : "gray"}
              />
              <View>
                <TouchableOpacity
                  style={styles.btnDateOfBirth}
                  onPress={showDatepicker}
                >
                  <Image
                    source={require("../images/drop.png")}
                    style={styles.iconBirthChoose}
                  />
                </TouchableOpacity>
                {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                  />
                )}
              </View>
            </View>

            {/* email */}
            <View style={styles.bgInputTK}>
              <Image
                source={require("../images/mail.png")}
                style={styles.iconMail}
              ></Image>
              <TextInput
                style={styles.textInputTK}
                placeholder="E-mail"
                autoCapitalize="none"
                placeholderTextColor="#969696"
                onChangeText={(text) => setEmail(text)}
              />
            </View>

            {/* phone */}
            <View style={styles.bgInputTK}>
              <Image
                source={require("../images/phone.png")}
                style={styles.iconPass}
              ></Image>
              <TextInput
                style={styles.textInputTK}
                placeholder="Số điện thoại"
                autoCapitalize="none"
                placeholderTextColor="#969696"
                onChangeText={(text) => setPhone(text)}
              />
            </View>

            {/* address */}
            <View style={styles.bgInputTK}>
              <Image
                source={require("../images/address.png")}
                style={styles.iconAddress}
              ></Image>
              <TextInput
                style={styles.textInputTK}
                placeholder="Địa chỉ"
                autoCapitalize="none"
                placeholderTextColor="#969696"
                onChangeText={(text) => setAddress(text)}
              />
            </View>

            {/* avt */}
            <TouchableOpacity style={styles.bgInputAVT} onPress={pickImage}>
              {avatar ? (
                <Image
                  source={{ uri: avatar.uri }}
                  style={{
                    width: 250,
                    height: 150,
                    resizeMode: "contain",
                    // marginTop: 30,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                />
              ) : (
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <Image
                    source={require("../images/upload.png")}
                    style={{ width: 30, height: 30 }}
                  />
                  <Text style={styles.textInputAVT}>Tải ảnh đại diện</Text>
                </View>
              )}
            </TouchableOpacity>

            {/* button register */}
            <TouchableOpacity
              style={styles.bgButtonLogin}
              onPress={registerUser}
            >
              <Text style={styles.textBtnLogin}>Đăng ký</Text>
            </TouchableOpacity>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <FlatList
      style={styles.containerContent}
      data={[1]}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem}
    />
  );
};

const FooterComponent = ({ navigation }) => {
  return (
    <View style={styles.viewFooter}>
      <View style={styles.bgTextSignInFooter}>
        <Text style={styles.textSignInFooter}>Bạn đã có tài khoản?</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text style={styles.clickTextSignIn}>Đăng nhập</Text>
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
    height: "70%",
    // marginTop: 1,
    paddingBottom: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    // borderWidth: 1,
  },
  viewFooter: {
    flex: 1,
    // borderWidth: 1,
    width: "100%",
    height: "10%",
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
    marginBottom: 30,
  },
  textInfo: {
    width: windownWidth - 60,
    marginLeft: 30,
    marginTop: 35,
    marginBottom: 10,
    // borderWidth: 1,
  },
  textInfoPerson: {
    width: windownWidth - 60,
    marginLeft: 30,
    marginTop: 30,
    marginBottom: 10,
    // borderWidth: 1,
  },
  textInfoAC: {
    color: "#EE4D2D",
    fontSize: 15,
    fontWeight: "500",
  },
  signIn: {
    height: 55,
    flexDirection: "row",
    backgroundColor: "#FEFEFE",
    // borderWidth: 1
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
    // justifyContent: "center",
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
  textInputAVT: {
    color: "#969696",
    marginTop: 5,
    fontWeight: "400",
    fontSize: 14.5,
  },
  bgInputAVT: {
    width: windownWidth - 60,
    marginLeft: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  bgOption: {
    width: windownWidth - 60,
    marginLeft: 30,
    marginTop: 10,
    // backgroundColor: "red",
    // height: 53,
  },
  textBgOption: {
    marginTop: 10,
    fontSize: 15,
    color: "#4b4b4b",
    fontWeight: "500",
    marginBottom: 0,
  },
  inputBgOption: {
    borderWidth: 0,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
    zIndex: 2,
    borderBottomWidth: 1,
    borderColor: "#dddddd",
  },
  inputBgOptionGender: {
    marginLeft: 25,
    borderWidth: 0,
    borderRadius: 5,
    marginTop: 13.2,
    marginBottom: 10,
    borderBottomWidth: 1.2,
    borderColor: "#dddddd",
  },
  iconFullname: {
    height: 25,
    width: 25,
    marginLeft: 9,
  },
  btnDateOfBirth: {
    backgroundColor: "white",
    color: "white",
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  iconBirthChoose: {
    marginTop: 10,
    height: 13,
    width: 13,
    marginLeft: 10,
  },
  iconBirth: {
    height: 24,
    width: 24,
    marginLeft: 9,
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
  iconAddress: {
    height: 27,
    width: 27,
    marginLeft: 9,
  },
  iconAvt: {
    height: 24,
    width: 24,
    marginLeft: 10,
  },
  iconMail: {
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
    // color: 'red'
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
    marginTop: 20,
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
