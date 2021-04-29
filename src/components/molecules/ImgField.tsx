import React, { FC, memo } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { ImgPreview, Touchable, Button } from "../atom";

const { width, height } = Dimensions.get("screen");

interface ImgField {
  type?: string;
  onPress?: any;
  uri?: string;
}

const ImgField: FC<ImgField> = ({ onPress, uri }) => {
  const s = styles();
  return (
    <View style={s.container}>
      <View style={{ position: "absolute" }}>
        <ImgPreview uri={uri} />
      </View>
      <Button backgroundColor="transparent" onPress={onPress} type="fixed">
        <View style={s.container} />
      </Button>
      {/* <Touchable backgroundColor="transparent" onPress={onPress}>
        <View style={s.container} />
      </Touchable> */}
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
