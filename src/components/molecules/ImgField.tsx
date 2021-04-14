import React, { FC, memo } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { ImgPreview, Touchable } from "../atom";

const { width, height } = Dimensions.get("screen");

interface ImgField {
  type?: string;
  onPress?: any;
}

const ImgField: FC<ImgField> = ({ onPress }) => {
  const s = styles();
  return (
    <View>
      <View style={{ position: "absolute" }}>
        <ImgPreview />
      </View>
      <Touchable backgroundColor="transparent" onPress={onPress}>
        <View style={s.container} />
      </Touchable>
    </View>
  );
};

const styles = () =>
  StyleSheet.create({
    container: {
      width,
      height: width * 0.526,
    },
  });

export default memo(ImgField);
