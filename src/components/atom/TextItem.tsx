import React, { FC, memo, PropsWithChildren } from "react";
import { StyleSheet, Text, TextProps, View } from "react-native";
import {
  fontFamily as ff,
  textSize as ts,
  colorsPalette as cp,
  spacing as sp,
} from "../../constants";

interface TextItemProps {
  type?: string;
  isNumber?: boolean;
  unit?: string;
}

const TextItem: FC<PropsWithChildren<TextItemProps & TextProps>> = ({
  isNumber = false,
  children,
  style,
  type = "default",
  unit = "Rp",
  ...props
}) => {
  const s: { [key: string]: any } = styles();

  return (
    <View style={s.container}>
      {isNumber && <Text style={s.unitText}>{unit} </Text>}
      <Text {...props} style={[s.default, style, s[type]]}>
        {isNumber && children
          ? `${children.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}`
          : children}
      </Text>
    </View>
  );
};

const styles = () =>
  StyleSheet.create({
    unitText: {
      color: cp.purple1,
    },
    container: { flexDirection: "row", alignItems: "flex-end" },
    productPrice: {
      fontSize: ts.xxm,
      color: cp.purple1,
      fontFamily: ff.quicksandBold,
    },
    productName: {
      marginTop: sp.xxs,
      marginBottom: sp.xxxs,
      color: cp.text1,
      fontFamily: ff.quicksandMedium,
    },
    default: {
      fontFamily: ff.quicksand,
    },
    defaultC: {
      fontFamily: ff.quicksand,
      textAlign: "center",
    },
    defaultW: {
      fontFamily: ff.quicksand,
      color: cp.white,
    },
    semiHeader: {
      fontFamily: ff.quicksandBold,
      fontSize: ts.s,
    },
    semiHeaderC: {
      fontFamily: ff.quicksandBold,
      fontSize: ts.s,
      textAlign: "center",
    },
    custom: { color: "red" },
  });

export default memo(TextItem);
