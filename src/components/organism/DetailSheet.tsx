import React, { FC } from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import { DummyProduct } from "../../../assets";
import {
  colorsPalette as cp,
  spacing as sp,
  strings as str,
} from "../../constants";
import { MainProduct } from "../../constants/types";
import { TextItem } from "../atom";
import { TouchableText } from "../molecules";

const { width, height } = Dimensions.get("screen");

interface DetailSheetProps {
  onPressRight?: any;
  onPressLeft?: any;
  detail: MainProduct;
}

const DetailSheet: FC<DetailSheetProps> = ({
  onPressLeft = () => console.log("test"),
  onPressRight = () => console.log("test"),
  detail: { product_image, price, product_name },
}) => {
  const s = styles();
  return (
    <View style={[s.emptyCont]}>
      <View style={s.imageCont}>
        {product_image ? (
          <Image
            source={{ uri: product_image }}
            style={s.img}
            resizeMode="contain"
          />
        ) : (
          <Image source={DummyProduct} style={s.img} resizeMode="center" />
        )}
      </View>
      <View style={s.detailCont}>
        <TextItem type="bold24" numberOfLines={2}>
          {product_name || "Sania Goreng 1L"}
        </TextItem>
        <View style={s.priceCont}>
          <TextItem isNumber={true} type="bold80" unitType={"detail80"}>
            {price || 35000}
          </TextItem>
        </View>
        <View style={s.buttonsCont}>
          <View style={[s.buttonCont, s.leftButton]}>
            <TouchableText
              onPress={onPressLeft}
              type="negativeLabel"
              buttonType="100"
              bg={false}
              buttonStyle={{ borderWidth: 1, borderColor: cp.purple1 }}
              rippleColor={cp.purple3}
            >
              {str.edit}
            </TouchableText>
          </View>
          <View style={[s.buttonCont, s.rightButton]}>
            <TouchableText
              onPress={onPressRight}
              buttonType="100"
              type="positiveLabel"
            >
              {str.ok}
            </TouchableText>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = () =>
  StyleSheet.create({
    rightButton: {
      marginLeft: sp.xxs,
    },
    leftButton: {
      borderColor: cp.purple2,
      marginRight: sp.xxs,
    },
    buttonCont: { flex: 1, height: 50 },
    buttonsCont: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
      marginTop: sp.xm,
    },
    img: { width: "100%", height: "100%" },
    priceCont: { alignItems: "center" },
    detailCont: { paddingHorizontal: sp.xm, marginTop: sp.xxxm },
    imageCont: { height: height * 0.3, backgroundColor: cp.white1 },
    emptyCont: {
      width,
      height,
    },
  });

export default DetailSheet;
