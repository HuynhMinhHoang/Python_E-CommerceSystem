import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useRef } from "react";
// import {StyleSheet, TextInput, TouchableOpacity, View } from "react-native";import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
// import {
//   faLight,
//   faUser,
//   faLock,
//   faEye,
//   faEyeSlash,
//   faMagnifyingGlass,
// } from "@fortawesome/free-solid-svg-icons";
// import {
//   faComments,
//   faCartShopping,
// } from "@fortawesome/free-regular-svg-icons";
import LinearGradient from "react-native-linear-gradient";
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from "react-native";

const imageBanner = [
  // require("../images/banner1.png"),
  require("../images/banner2.png"),
  require("../images/banner3.png"),
  // require("../images/banner4.png"),
  // require("../images/banner5.png"),
  require("../images/banner6.png"),
  // require("../images/banner7.png"),
  // require("../images/banner8.png"),
  // require("../images/banner9.png"),
];

const windownWidth = Dimensions.get("window").width;
const windownHeight = Dimensions.get("window").height;

export default Home = ({ navigation }) => {
  return (
    // stickyHeaderIndices={[0]}
    <View style={styles.viewContainer}>
      <View style={styles.viewHeader}>
        <HeaderComponent />
      </View>

      <View style={styles.viewContent}>
        <ContentComponent navigation={navigation} />
      </View>

      <View style={styles.viewFooter}>
        <FooterComponent />
      </View>
    </View>
  );
};

const HeaderComponent = () => {
  return (
    // <View style={{ flex: 1 }}>
    // <StatusBar barStyle="light-content" />
    <View style={styles.containerHeader}>
      <View style={styles.signIn}>
        <TouchableOpacity style={styles.backgroundSignIn}>
          <Image
            source={require("../images/search.png")}
            style={styles.iconSearch}
          ></Image>
          <TextInput
            style={styles.textInputTK}
            placeholder="Nhập sản phẩm cần tìm..."
            autoCapitalize="none"
            placeholderTextColor="gray"
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.backgroundCart}>
          <Image
            source={require("../images/cart.png")}
            style={styles.iconFB}
          ></Image>
        </TouchableOpacity>

        <TouchableOpacity style={styles.backgroundMess}>
          <Image
            source={require("../images/mess.png")}
            style={styles.iconGG}
          ></Image>
        </TouchableOpacity>
      </View>
    </View>
    // </View>
  );
};

const ContentComponent = ({ navigation }) => {
  //banner
  const [imgActive, setImgActive] = useState(0);

  const onChange = (event) => {
    const slideWidth = Dimensions.get("window").width;
    const offset = event.nativeEvent.contentOffset.x;
    const activeImage = Math.floor(offset / slideWidth);
    setImgActive(activeImage);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const nextImage = (imgActive + 1) % imageBanner.length;
      setImgActive(nextImage);
      scrollViewRef.current.scrollTo({
        x: nextImage * windownWidth,
        animated: true,
      });
    }, 1500);

    return () => clearInterval(intervalId);
  }, [imgActive]);

  const scrollViewRef = useRef();

  const [products, setProducts] = useState([]);
  const [images, setImages] = useState([]);

  //product
  const getProductsAPI = () => {
    fetch("http://10.0.2.2:8000/products/")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  };

  const getImagesAPI = () => {
    fetch("http://10.0.2.2:8000/images/")
      .then((response) => response.json())
      .then((data) => setImages(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getProductsAPI();
    getImagesAPI();
  }, []);

  //category
  const categories = [
    { name: "Điện thoại", image: require("../images/dienthoai.png") },
    { name: "Laptop", image: require("../images/laptop.png") },
    { name: "Thời trang", image: require("../images/thoitrang.png") },
    { name: "Giày dép", image: require("../images/giaydep.png") },
    { name: "Trang sức", image: require("../images/trangsuc.png") },
    { name: "Laptop", image: require("../images/laptop.png") },
    { name: "Thời trang", image: require("../images/thoitrang.png") },
    { name: "Giày dép", image: require("../images/giaydep.png") },
    { name: "Trang sức", image: require("../images/trangsuc.png") },
  ];

  return (
    <ScrollView style={styles.wrap}>
      <ScrollView
        ref={scrollViewRef}
        onScroll={(event) => onChange(event)}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        horizontal
        style={styles.wrap}
      >
        {imageBanner.map((e, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image
              resizeMode="stretch"
              style={styles.imageInScrollView}
              source={e}
            />
          </View>
        ))}
      </ScrollView>

      <View style={styles.containerContent}>
        {/* <View style={styles.bgTextTitle}>
          <Text style={styles.textContent}>DANH MỤC</Text>
          <View style={styles.brButton}></View>
        </View> */}

        {/* category1 */}
        <View style={styles.bgViewCategory}>
          <ScrollView
            horizontal
            contentContainerStyle={styles.containerCategory}
            showsHorizontalScrollIndicator={false}
          >
            {categories.map((category, index) => (
              <TouchableOpacity key={index}>
                <View
                  style={[
                    styles.bgCategory,
                    index === categories.length - 1
                      ? { marginRight: 10 }
                      : { marginRight: 36, marginLeft: 10 },
                  ]}
                >
                  <View key={index} style={styles.categoryItem}>
                    <Image
                      source={category.image}
                      style={styles.categoryImage}
                    />
                  </View>
                  <Text style={styles.textCategoryItem}>{category.name}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* category2 */}
        <View style={styles.bgViewCategory}>
          <ScrollView
            horizontal
            contentContainerStyle={styles.containerCategory2}
            showsHorizontalScrollIndicator={false}
          >
            {categories.map((category, index) => (
              <TouchableOpacity key={index}>
                <View
                  style={[
                    styles.bgCategory,
                    index === categories.length - 1
                      ? { marginRight: 10 }
                      : { marginRight: 36, marginLeft: 10 },
                  ]}
                >
                  <View key={index} style={styles.categoryItem}>
                    <Image
                      source={category.image}
                      style={styles.categoryImage}
                    />
                  </View>
                  <Text style={styles.textCategoryItem}>{category.name}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* banner */}
        <View>
          <Image
            resizeMode="stretch"
            style={styles.ImgBanner2}
            source={require("../images/banner11.png")}
          />
        </View>

        {/* product */}
        <View style={styles.bgTextTitle}>
          <Text style={styles.textContent}>GỢI Ý HÔM NAY</Text>
          {/* <View style={styles.brButton}></View> */}
        </View>

        <View style={styles.productRowContainer}>
          {products && products.length > 0 ? (
            products.map((product) => {
              const image = images.find(
                (img) => img.product_info.id === product.id
              );
              // console.log(product);
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("ProductDetail", {
                      productInfo: product,
                      imageProduct: images.filter(
                        (img) => img.product_info.id === product.id
                      ),
                    });
                  }}
                  key={product.id}
                  style={styles.productContainer}
                >
                  {image && (
                    <Image
                      style={{ width: "100%", height: 170 }}
                      source={{ uri: image.thumbnail }}
                      resizeMode="cover"
                    />
                  )}
                  <Text style={styles.nameProduct}>{product.name_product}</Text>
                  <Text style={styles.priceProduct}>₫{product.price}</Text>
                  <Text style={styles.priceProductSold}>Đã bán 123</Text>
                </TouchableOpacity>
              );
            })
          ) : (
            <Text>Không tìm thấy sản phẩm nào!</Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const FooterComponent = () => {
  return;
};

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    // height: windownHeight * 10,
  },
  viewHeader: {
    width: "100%",
    height: "15%",
    backgroundColor: "#EE4D2D",
    // backgroundColor: "white",
    // borderWidth: 4,
  },
  viewContent: {
    width: "100%",
    height: "85%",
    // marginTop: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EE4D2D",
    // backgroundColor: "black",
    // paddingBottom: 10
    // borderWidth: 1,
  },
  viewFooter: {
    // borderWidth: 1,
    width: "100%",
    height: "0%",
    // backgroundColor: "red",
  },
  containerHeader: {
    marginTop: 50,
    // width: "100%",
    // height: "100%",
  },
  header: {
    width: "100%",
    flex: 1,
    // backgroundColor: "#EE4D2D",
    justifyContent: "center",
    alignItems: "center",
  },
  productRowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    width: windownWidth - 15,
    marginLeft: 8,
    marginBottom: "25%",
  },
  productContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    paddingLeft: 10,
    // borderWidth: 5,
    borderColor: "#ddd",
    padding: 5,
    // marginBottom: 0,
    marginTop: 5,
    // borderRadius: 9,
    height: "27%",
    width: "49%",
    backgroundColor: "white",
    // elevation: 2
    position: "relative",
    borderRadius: 5,
  },
  nameProduct: {
    color: "#444444",
    fontSize: 13,
    fontWeight: "500",
    paddingBottom: 8,
  },
  priceProduct: {
    color: "#EE4D2D",
    fontWeight: "400",
    fontSize: 14,
    // borderWidth: 5,
    position: "absolute",
    bottom: 7,
    left: 10,
  },
  priceProductSold: {
    color: "#252525",
    fontWeight: "400",
    fontSize: 12,
    // borderWidth: 5,
    position: "absolute",
    bottom: 8,
    right: 10,
  },
  iconShopee: {
    marginTop: 0,
    width: 75,
    height: 75,
  },
  signIn: {
    width: windownWidth - 15,
    marginLeft: 10,
    height: 55,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // marginTop: 10,
    // marginBottom: 10,
    // backgroundColor: "#FEFEFE",
    // borderWidth: 3,
  },
  backgroundSignIn: {
    flexDirection: "row",
    width: "75%",
    height: "70%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    backgroundColor: "white",
    // elevation: 10,
  },
  backgroundCart: {
    flexDirection: "row",
    width: "10%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundMess: {
    flexDirection: "row",
    width: "10%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  textSignIn: {
    fontSize: 20,
    color: "black",
    fontWeight: "400",
  },
  containerContent: {
    // borderWidth: 1,
    // height: "80%",
    // width: "100%",

    backgroundColor: "#eeeeee",
    justifyContent: "center",
  },
  brButton: {
    height: 6,
    // justifyContent: 'center',
    // alignItems: 'center',
    width: "110%",
    backgroundColor: "#F4F4F4",
    // #F4F4F4
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
  bgTextTitle: {
    width: windownWidth - 15,
    marginLeft: 8,
    marginTop: 5,
    padding: 10,
    paddingBottom: 10,
    backgroundColor: "white",
    borderRadius: 0,
    // borderWidth: 1
  },
  textContent: {
    fontSize: 15,
    // marginBottom: 6,
    fontWeight: "800",
    color: "#EE4D2D",
    // marginLeft: 10,
    // borderWidth: 1
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
  iconSearch: {
    height: 24,
    width: 24,
    marginLeft: 5,
  },
  textInputTK: {
    height: "100%",
    flex: 1,
    marginLeft: 15,
    fontSize: 15,
    marginRight: 15,
    color: "black",
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
    // marginBottom: 20,
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
    marginRight: 0,
    width: 25,
    height: 25,
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
    marginRight: 5,
    width: 26,
    height: 26,
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
  //banner
  wrap: {
    // borderWidth: 1,
    width: windownWidth,
    height: windownHeight * 0.2,
    paddingBottom: 5,
  },
  imageContainer: {
    borderRadius: 20,
    overflow: "visible",
    marginHorizontal: 5,
    width: windownWidth - 10,
    justifyContent: "center",
    alignItems: "center",
  },
  imageInScrollView: {
    width: "95%",
    height: "90%",
    // borderRadius: 10,
    // justifyContent: "center",
    // alignItems: "center",
  },
  containerCategory: {
    flexDirection: "row",
    // paddingLeft: 5,
    // paddingRight: 5,
    paddingTop: 15,
    paddingBottom: 5,
    alignItems: "center",
    backgroundColor: "white",

    // borderWidth: 19
  },
  containerCategory2: {
    flexDirection: "row",
    // paddingLeft: 5,
    // paddingRight: 5,
    paddingTop: 0,
    paddingBottom: 15,
    alignItems: "center",
    backgroundColor: "white",
  },
  categoryItem: {
    width: 50,
    padding: 5,
    // marginRight: 20,
    // marginLeft: 10,
    backgroundColor: "white",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    // elevation: 4,
    borderWidth: 1.5,
    borderColor: "#e9e7e7",
  },
  categoryImage: {
    // padding: 50,
    width: 33,
    height: 33,
    borderRadius: 25,
  },
  textCategoryItem: {
    fontWeight: "500",
    fontSize: 12,
    color: "black",
  },
  bgCategory: {
    marginRight: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  bgViewCategory: {
    // width: windownWidth - 15,
    // marginLeft: 8,
    // marginTop: 5,
    padding: 10,
    backgroundColor: "white",

    // elevation: 10
    // borderRadius: 10,
  },
  ImgBanner2: {
    width: "100%",
    height: 150,
    // marginBottom: 1
  },
});
