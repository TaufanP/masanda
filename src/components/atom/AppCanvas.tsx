import { CompositeNavigationProp } from "@react-navigation/core";
import React, { FC, PropsWithChildren } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { colorsPalette as cp } from "../../constants";
import { FancyTypes } from "../../constants/fancy-states";
import FancyBar from "./FancyBar";

interface AppCanvas {
  navigation?: CompositeNavigationProp<any, any>;
  fancyBarState?: FancyTypes;
  setFancyBarState?: any;
}

const AppCanvas: FC<PropsWithChildren<AppCanvas>> = ({
  children,
  fancyBarState,
  setFancyBarState,
}) => {
  const s = styles();
  return (
    <View style={s.container}>
      <StatusBar backgroundColor={cp.white} barStyle="dark-content" />
      {children}
      <FancyBar {...{ fancyBarState, setFancyBarState }} />
    </View>
  );
};

const styles = () =>
  StyleSheet.create({
    container: { backgroundColor: cp.white0, flex: 1 },
  });

export default AppCanvas;
