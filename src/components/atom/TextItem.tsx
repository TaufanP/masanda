import React, { FC, memo, PropsWithChildren } from "react";
import { StyleSheet, Text, TextProps } from "react-native";
import {
  fontFamily as ff,
  textSize as ts,
  colorsPalette as cp,
} from "../../constants";

interface TextItemProps {
  type?: string;
}

const TextItem: FC<PropsWithChildren<TextItemProps & TextProps>> = ({
  children,
  style,
  type = "default",
  ...props
}) => {
  const s: { [key: string]: any } = styles();
  return (
    <Text {...props} style={[s.default, style, s[type]]}>
      {children}
    </Text>
  );
};

const styles = () =>
  StyleSheet.create({
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
