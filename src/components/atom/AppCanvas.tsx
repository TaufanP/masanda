import { CompositeNavigationProp } from "@react-navigation/core";
import React, { FC, PropsWithChildren } from "react";
import { View, StyleSheet } from "react-native";
import { colorsPalette as cp } from "../../constants";

interface AppCanvas {
  navigation?: CompositeNavigationProp<any, any>;
}

const AppCanvas: FC<PropsWithChildren<AppCanvas>> = ({ children }) => {
  const s = styles();
  return <View style={s.container}>{children}</View>;
};

const styles = () =>
  StyleSheet.create({
    container: { backgroundColor: cp.white0, flex: 1 },
  });

export default AppCanvas;
