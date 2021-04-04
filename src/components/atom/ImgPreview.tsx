import React, { FC, memo } from "react";
import { Dimensions, Image, StyleSheet, View, Text } from "react-native";
import { DummyProduct, PlusImgField } from "../../../assets";
import {
  colorsPalette as cp,
  fontFamily as ff,
  textSize as ts,
  strings as str,
  spacing as sp,
} from "../../constants";
import TextItem from "./TextItem";

const { width, height } = Dimensions.get("screen");

interface ImgPreview {
  type?: string;
}

const ImgPreview: FC<ImgPreview> = ({ ...props }) => {
  const s = styles();
  return (
    <View style={s.container}>
      {false ? (
        <Image source={DummyProduct} style={s.img} />
      ) : (
        <View style={s.placeholderBg} />
      )}
      <View style={s.detailCont}>
        <PlusImgField style={s.iconStyle} />
        <TextItem>{str.addImg}</TextItem>
      </View>
    </View>
  );
};

const styles = () =>
  StyleSheet.create({
    iconStyle: { marginBottom: sp.xxs },
    detailCont: {
      justifyContent: "center",
      alignItems: "center",
    },
    placeholderBg: {
      width: "100%",
      height: "100%",
      position: "absolute",
      backgroundColor: cp.white2,
    },
    img: {
      resizeMode: "cover",
      width: "100%",
      height: "100%",
      position: "absolute",
    },
    container: {
      width,
      height: width * 0.526,
      overflow: "hidden",
      justifyContent: "center",
      alignItems: "center",
    },
  });

export default memo(ImgPreview);
