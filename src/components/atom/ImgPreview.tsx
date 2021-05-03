import React, { FC, memo } from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import { PlusImgField } from "../../../assets";
import {
  colorsPalette as cp,
  spacing as sp,
  strings as str,
} from "../../constants";
import TextItem from "./TextItem";

const { width, height } = Dimensions.get("screen");

interface ImgPreview {
  type?: string;
  uri?: string;
}

const ImgPreview: FC<ImgPreview> = ({ uri }) => {
  const s = styles();
  return (
    <View style={s.container}>
      {uri ? (
        <Image source={{ uri }} style={s.img} />
      ) : (
        <View style={s.placeholderBg} />
      )}
      {!uri && (
        <View style={s.detailCont}>
          <PlusImgField style={s.iconStyle} />
          <TextItem>{str.addImg}</TextItem>
        </View>
      )}
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
