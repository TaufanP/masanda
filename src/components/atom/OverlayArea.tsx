import React, { FC } from "react";
import { Dimensions, StyleSheet, TouchableOpacity } from "react-native";

const { width, height } = Dimensions.get("screen");

interface OverlayAreaProps {
  onPress: any;
}

const OverlayArea: FC<OverlayAreaProps> = ({ onPress }) => {
  const s = styles();
  return <TouchableOpacity style={s.container} onPress={onPress} />;
};

const styles = () =>
  StyleSheet.create({
    container: {
      backgroundColor: "#0005",
      width,
      height,
      position: "absolute",
    },
  });

export default OverlayArea;
