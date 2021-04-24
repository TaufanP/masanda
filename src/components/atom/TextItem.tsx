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
  unitType?: string;
  withUnit?: boolean;
}

const TextItem: FC<PropsWithChildren<TextItemProps & TextProps>> = ({
  isNumber = false,
  children,
  style,
  type = "default",
  unit = "Rp",
  unitType = "none",
  withUnit = true,
  ...props
}) => {
  const s: { [key: string]: any } = styles();

  return (
    <View style={s.container}>
      {isNumber && withUnit && (
        <Text style={[s.unitText, s[unitType]]}>{unit} </Text>
      )}
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
    // UNIT
    detail80: { top: -16, left: -8 },
    // TEXT
    bold80: {
      fontSize: 80,
      // color: cp.text1,
      color: cp.purple1,
      fontFamily: ff.quicksandBold,
    },
    bold24: {
      fontSize: ts.xxm,
      color: cp.text1,
      fontFamily: ff.quicksandBold,
    },
    bold14: {
      fontSize: ts.xs,
      color: cp.white0,
      fontFamily: ff.quicksandBold,
      fontWeight: "800",
    },
    semibold14: {
      fontSize: ts.xs,
      color: cp.white0,
      fontFamily: ff.quicksandMedium,
    },
    positiveLabel: {
      fontFamily: ff.quicksandBold,
      textTransform: "uppercase",
      fontSize: ts.s,
    },
    negativeLabel: {
      color: cp.purple1,
      fontFamily: ff.quicksandBold,
      textTransform: "uppercase",
      fontSize: ts.s,
    },
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
