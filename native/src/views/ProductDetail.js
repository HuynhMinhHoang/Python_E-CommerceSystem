import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Image, ScrollView } from "react-native";
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Swiper from "react-native-swiper";
import { AirbnbRating, Rating } from "react-native-ratings";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { useCart } from "../context/CartContext";

const { width } = Dimensions.get("window");
const windownWidth = Dimensions.get("window").width;
const windownHeight = Dimensions.get("window").height;

export default ProductDetail = ({ navigation }) => {
  const route = useRoute();
  const { productInfo } = route.params;
  return (
    <View style={styles.viewContainer}>
      <View style={styles.viewHeader}>
        <HeaderComponent />
      </View>

      <View style={styles.viewContent}>
        <ContentComponent navigation={navigation} productInfo={productInfo} />
      </View>

      <View style={styles.viewFooter}>
        <FooterComponent navigation={navigation} productInfo={productInfo} />
      </View>
    </View>
  );
};

const HeaderComponent = () => {
  return (
    <View style={styles.containerHeader}>
      <View style={styles.signIn}>
        <TouchableOpacity style={styles.backgroundSignIn}>
          <Image
            source={require("../images/111.png")}
            style={styles.iconSearch}
          ></Image>
        </TouchableOpacity>

        <TouchableOpacity style={styles.backgroundCart}>
          <Image
            source={require("../images/222.png")}
            style={styles.iconFB}
          ></Image>
        </TouchableOpacity>

        <TouchableOpacity style={styles.backgroundMess}>
          <Image
            source={require("../images/333.png")}
            style={styles.iconGG}
          ></Image>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ContentComponent = ({ productInfo }) => {
  const [raTing, setRaTing] = useState(4.5);
  const [sold, setSold] = useState(255);
  const [isLiked, setIsLiked] = useState(false);
  const [ship, setShip] = useState(25000);
  const [totalProduct, setTotalProduct] = useState(215);
  const [raTingStore, setRaTingStore] = useState(4.7);

  //product more
  const [products, setProducts] = useState([]);

  const getProductsAPI = () => {
    fetch("http://10.0.2.2:8000/products/")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getProductsAPI();
  }, []);

  const [expanded, setExpanded] = useState(false);

  const handleToggleExpansion = () => {
    setExpanded(!expanded);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  //img product
  const renderPagination = (index, total, context) => {
    return (
      <View style={styles.paginationStyle}>
        <Text style={{ color: "#3d3d3d", fontWeight: "500", fontSize: 14.5 }}>
          <Text style={styles.paginationText}>{index + 1}</Text>/{total}
        </Text>
      </View>
    );
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.slideW}>
        <Swiper
          renderPagination={renderPagination}
          loop={false}
          style={styles.slideWW}
        >
          {productInfo.images && productInfo.images.length > 0 ? (
            productInfo.images.map((image, index) => (
              <Image
                key={index}
                style={styles.image}
                source={{ uri: image.thumbnail }}
                resizeMode="contain"
              />
            ))
          ) : (
            <Text>Không có ảnh</Text>
          )}
        </Swiper>
      </View>

      {/* <View style={styles.slideW}> */}

      {/* </View> */}

      <View style={styles.otherContent}>
        <View style={styles.bgContent}>
          <View style={styles.bgTextNamePr}>
            <Text style={styles.textNamePr}>{productInfo.name_product}</Text>
          </View>

          <View style={styles.bgTextPriceNamePr}>
            <Text style={styles.textPricePr}>{productInfo.price}</Text>
          </View>

          <View style={styles.bgRating}>
            {/* <AirbnbRating
          reviews={[
            "Tệ",
            "Không hài lòng",
            "Bình thường",
            "Hài lòng",
            "Tuyệt vời",
          ]}
          count={5}
          defaultRating={1}
          selectedColor="#FABB1A"
          unSelectedColor="#FABB1A"
          reviewColor="#FABB1A"
          size={18}
          reviewSize={18}
          showRating={true}
          // isDisabled
          // starContainerStyle={{ backgroundColor:"red" }}
          // ratingContainerStyle={{ marginVertical: 20 }}
          starImage={require("../images/star.png")}
          // onFinishRating={(rating) => alert(rating)}
        /> */}
            <Rating
              type="star"
              ratingCount={5}
              // showRating={true}
              // ratingTextColor="black"
              fractions={1}
              jumpValue={1}
              startingValue={raTing}
              imageSize={15}
              readonly={true}
            />
            <Text style={styles.textRating}>{raTing}</Text>
            <View style={styles.brIconLoginFB}></View>
            <Text style={styles.textRating}>Đã bán {sold}</Text>

            <View style={styles.bgIconProduct}>
              <TouchableOpacity onPress={handleLike}>
                <Image
                  style={styles.iconMess}
                  source={
                    isLiked
                      ? require("../images/heart2.png")
                      : require("../images/heart1.png")
                  }
                />
              </TouchableOpacity>

              <TouchableOpacity>
                <Image
                  style={styles.iconInbox}
                  source={require("../images/inbox.png")}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.brContent}></View>
        <View style={styles.bgShip}>
          <Image
            style={styles.iconShip}
            source={require("../images/ship.png")}
          />
          <Text style={styles.textIconShip}> Phí vận chuyển: đ{ship}</Text>
        </View>
        <View style={styles.brContent1}></View>
        <View style={styles.bgStore}>
          <TouchableOpacity>
            <Image
              style={styles.avtShop}
              source={require("../images/logostore.png")}
            />
          </TouchableOpacity>
          <View>
            <Text style={styles.textStore}>{productInfo.store_info.name_store}</Text>
            <View style={styles.bgLocationSt}>
              <Image
                style={styles.locationShop}
                source={require("../images/location.png")}
              />
              <Text style={styles.textLocation}>Hồ chí minh</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.viewShop}>
            <Text style={styles.textViewShop}>Xem Shop</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bgInfoShop}>
          <Text style={styles.textArStore}>{totalProduct}</Text>
          <Text style={styles.textInfoShop}> Sản phẩm</Text>

          <Text style={styles.textArStore}>{raTingStore}</Text>
          <Text style={styles.textInfoShop}> Đánh giá</Text>
        </View>
        <View style={styles.brContent1}></View>
        <View style={styles.bgTextInfoPr}>
          <Text style={styles.textInfoPr}>Chi tiết sản phẩm</Text>
          <Text>{productInfo.category_info.name_category}</Text>
        </View>
        <View style={styles.brContent2}></View>
        <View style={styles.bgTextInfoPr}>
          <Text style={styles.textInfoPr}>Mô tả sản phẩm</Text>
        </View>
        <View style={styles.bgTextDetailPr}>
          <Text
            style={styles.textDetailPr}
            numberOfLines={expanded ? undefined : 5}
          >
            {productInfo.description}
          </Text>

          {/* <View style={styles.brContent2}></View> */}
          {!expanded && (
            <TouchableOpacity
              onPress={handleToggleExpansion}
              style={styles.bgReadMore}
            >
              <Text style={styles.readMore}>Xem thêm</Text>
              <Image
                style={styles.iconReadMore}
                source={require("../images/readmore.png")}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.brContent1}></View>

        <View style={styles.bgTextInfoPr}>
          <View>
            <Text style={styles.textInfoPr}>Đánh Giá Sản Phẩm</Text>

            <View style={styles.bgRating1}>
              <Rating
                type="star"
                ratingCount={5}
                fractions={1}
                jumpValue={1}
                startingValue={raTing}
                imageSize={15}
                readonly={true}
              />
              <Text style={styles.textReviewPr}>{raTing}/5</Text>
              <Text style={styles.textReviewPr1}>(98 đánh giá)</Text>
            </View>
          </View>
        </View>

        <View style={styles.brContent3}>
          <View style={styles.bgFooter}>
            <View style={styles.brFooter}></View>
            <Text style={styles.textOR}> Có thể bạn cũng thích </Text>
            <View style={styles.brFooter}></View>
          </View>
        </View>

        <View style={styles.containerContent}>
          <View style={styles.productRowContainer}>
            {products && products.length > 0 ? (
              products.map((product) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("ProductDetail");
                    }}
                    key={product.id}
                    style={styles.productContainer}
                  >
                    {product.images.length > 0 && (
                      <Image
                        style={{ width: "100%", height: 170 }}
                        source={{ uri: product.images[0].thumbnail }}
                        resizeMode="cover"
                      />
                    )}
                    <Text style={styles.nameProduct}>
                      {product.name_product}
                    </Text>
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
      </View>
    </ScrollView>
  );
};

const FooterComponent = ({ productInfo }) => {
  //add to cart
  const [{ cartItems }, dispatchCart] = useCart();

  const handleAddToCart = () => {
    dispatchCart({ type: "ADD_TO_CART", payload: productInfo });
  };
  // console.log(productInfo);

  return (
    <View style={styles.bgPayProduct}>
      <TouchableOpacity style={styles.bgIconChat}>
        <Image
          source={require("../images/mess.png")}
          style={styles.iconChat}
        ></Image>
        <Text style={styles.textIconChat}>Chat ngay</Text>
      </TouchableOpacity>

      <View style={styles.brFooterPay}></View>

      <TouchableOpacity style={styles.bgIconChat} onPress={handleAddToCart}>
        <Image
          source={require("../images/addcart.png")}
          style={styles.iconChat}
        ></Image>
        <Text style={styles.textIconChat}>Thêm giỏ hàng</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.bgPayProduct1}>
        <Text style={styles.textPayProduct}>Mua ngay</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
  },
  viewHeader: {
    flex: 11.5,
    backgroundColor: "white",
    // borderWidth: 1,
  },
  viewContent: {
    flex: 82.5,
    backgroundColor: "white",

    // borderWidth: 2,
  },
  viewFooter: {
    // flex: 1,
    // // borderWidth: 1,
    // width: "100%",
    // height: "8%",
    // backgroundColor: "gray",

    flex: 6,
    // backgroundColor: "#EE4D2D",
  },
  slideWW: {
    height: 350,
    // backgroundColor: "gray",
    // width: '100%'
  },
  slideW: {
    // position: "relative",
    width: "100%",
    flex: 20,
    borderBottomWidth: 8,
    borderBottomColor: "#f0efef",
  },
  slide: {
    justifyContent: "center",
    width: "100%",
    backgroundColor: "transparent",
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
  image: {
    maxWidth: "100%",
    height: "100%",
    // flex: 1,
  },
  paginationStyle: {
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: "white",
    borderRadius: 10,
    position: "absolute",
    top: 320,
    right: 10,
    // borderWidth: 0.5,
    // borderColor: "gray",
  },
  paginationText: {
    color: "#3d3d3d",
    fontSize: 14.5,
    fontWeight: "500",
  },

  bgContent: {
    width: windownWidth - 20,
    marginLeft: 10,
    marginTop: 10,
    // borderWidth: 1,
  },
  textNamePr: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 10,
    color: "#111111",
  },
  textPricePr: {
    fontSize: 17,
    fontWeight: "500",
    color: "#EE4D2D",
    // marginBottom: 15
  },
  customFont: {
    fontSize: 20,
  },
  bgTextNamePr: {
    marginTop: 3,
  },
  bgTextPriceNamePr: {
    marginTop: 0,
  },
  bgRating: {
    // borderWidth: 1,
    marginTop: 15,
    alignItems: "center",
    flexDirection: "row",
  },
  bgRating1: {
    marginTop: 5,
    alignItems: "center",
    flexDirection: "row",
  },
  textRating: {
    marginLeft: 10,
    fontWeight: "400",
  },
  brIconLoginFB: {
    height: "100%",
    width: 1,
    backgroundColor: "#ebebeb",
    // marginRight: 10,
    marginLeft: 10,
  },
  bgIconProduct: {
    flexDirection: "row",
    marginLeft: 98,
  },
  iconMess: {
    height: 24,
    width: 24,
    marginLeft: 15,
  },
  iconInbox: {
    height: 23,
    width: 23,
    marginLeft: 15,
  },
  brContent: {
    marginTop: 15,
    height: 7,
    width: "100%",
    backgroundColor: "#f0efef",
    // marginRight: 10,
  },
  brContent1: {
    height: 7,
    width: "100%",
    backgroundColor: "#f0efef",
    // marginRight: 10,
  },
  bgShip: {
    width: windownWidth - 20,
    marginLeft: 10,
    flexDirection: "row",
    // justifyContent: 'center',
    alignItems: "center",
    // borderWidth: 1,
    margin: 10,
  },
  iconShip: {
    height: 30,
    width: 30,
    marginRight: 10,
  },
  textIconShip: {
    fontSize: 14,
    fontWeight: "400",
  },
  bgStore: {
    width: windownWidth - 20,
    marginLeft: 10,
    flexDirection: "row",
    // justifyContent: 'center',
    alignItems: "center",
    // borderWidth: 1,
    margin: 10,
  },
  avtShop: {
    height: 55,
    width: 55,
    marginRight: 10,
    borderRadius: 100,
  },
  locationShop: {
    height: 15,
    width: 15,
    marginRight: 5,
  },
  textStore: {
    fontSize: 14,
    fontWeight: "500",
    color: "#2c2c2c",
  },
  bgLocationSt: {
    marginTop: 8,
    // borderWidth:1,
    flexDirection: "row",
    alignItems: "center",
  },
  textLocation: {
    fontSize: 13,
    color: "#575757",
  },
  viewShop: {
    borderWidth: 1,
    borderColor: "#EE4D2D",
    padding: 5,
    width: 100,
    borderRadius: 5,
    marginLeft: 105,
  },
  textViewShop: {
    color: "#EE4D2D",
    textAlign: "center",
  },
  bgInfoShop: {
    width: windownWidth - 20,
    marginLeft: 10,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  textInfoShop: {
    marginRight: 20,
    fontSize: 13,
  },
  textArStore: {
    color: "#EE4D2D",
    fontSize: 13,
  },
  bgTextInfoPr: {
    width: windownWidth - 20,
    marginLeft: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 12,
    paddingBottom: 12,
  },
  textInfoPr: {
    fontWeight: "500",
    fontSize: 14,
  },
  brContent2: {
    height: 2,
    width: "100%",
    backgroundColor: "#f0efef",
  },
  bgTextDetailPr: {
    width: windownWidth - 20,
    marginLeft: 10,
    marginBottom: 10,
  },
  textDetailPr: {
    lineHeight: 22,
    color: "#4b4b4b",
    textAlign: "justify",
  },
  bgReadMore: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  iconReadMore: {
    marginTop: 10,
    height: 14,
    width: 14,
  },
  readMore: {
    marginTop: 10,
    padding: 10,
    color: "#EE4D2D",
  },

  // ádads
  containerHeader: {
    marginTop: 40,
    // borderWidth: 1,
    width: windownWidth - 20,
    marginLeft: 10,
    // width: "100%",
    // height: "100%",
    backgroundColor: "white",
  },
  signIn: {
    height: 55,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  backgroundSignIn: {
    flexDirection: "row",
    width: "10%",
    height: "60%",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#BCBCBC",
    borderRadius: 100,
    marginRight: 250,
    // elevation: 10,
  },

  iconSearch: {
    width: 26,
    height: 26,
  },
  textInputTK: {
    height: "100%",
    flex: 1,
    marginLeft: 15,
    fontSize: 15,
    marginRight: 15,
    color: "black",
  },
  backgroundCart: {
    flexDirection: "row",
    width: "10%",
    height: "60%",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "black",
    borderRadius: 100,
    marginRight: 10,
  },
  backgroundMess: {
    flexDirection: "row",
    width: "10%",
    height: "60%",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#BCBCBC",
    borderRadius: 50,
  },
  iconFB: {
    marginLeft: 10,
    width: 29,
    height: 29,
  },
  iconGG: {
    width: 26,
    height: 26,
  },
  otherContent: {
    flex: 80,
  },
  textReviewPr: {
    color: "#EE4D2D",
    marginLeft: 10,
    fontWeight: "400",
  },
  textReviewPr1: {
    color: "#575757",
    marginLeft: 10,
    fontWeight: "400",
    fontSize: 13,
  },
  brContent3: {
    height: 50,
    width: "100%",
    backgroundColor: "#f0efef",
    justifyContent: "center",
    alignItems: "center",
  },
  bgFooter: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 20,
  },
  brFooter: {
    height: 1,
    width: "15%",
    backgroundColor: "#999999",
  },
  textOR: {
    marginLeft: 15,
    marginRight: 15,
    fontWeight: "500",
    fontSize: 14,
    color: "#888888",
  },
  containerContent: {
    // borderWidth: 1,
    // height: "80%",
    // width: "100%",
    backgroundColor: "#eeeeee",
    justifyContent: "center",
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
  bgPayProduct: {
    flex: 1,
    // borderWidth: 2,
    flexDirection: "row",
  },
  bgIconChat: {
    width: "28%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#29A898",
  },

  iconChat: {
    marginTop: 5,
    width: 21,
    height: 21,
  },
  textIconChat: {
    marginTop: 2,
    color: "white",
    fontSize: 11,
  },
  bgPayProduct1: {
    width: "44%",
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
