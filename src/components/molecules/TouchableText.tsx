import React, { FC, memo, PropsWithChildren } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacityProps,
  TextInputProps,
} from "react-native";
import {
  fontFamily as ff,
  colorsPalette as cp,
  spacing as sp,
} from "../../constants";
import { Touchable } from "../atom";

interface TouchableTextProps {
  touchableProps?: TouchableOpacityProps;
  textProps?: TextInputProps;
  buttonStyle?: Object;
  bg?: boolean;
}

interface StyleProps {
  bg: boolean;
}

const TouchableText: FC<PropsWithChildren<TouchableTextProps>> = ({
  children,
  touchableProps,
  textProps,
  buttonStyle,
  bg = true,
}) => {
  const s = styles({ bg });
  return (
    <Touchable
      {...touchableProps}
      style={[buttonStyle, s.container]}
      width="auto"
      height="auto"
    >
      <Text {...textProps} style={s.textStyle}>
        {children}
      </Text>
    </Touchable>
  );
};

const styles = ({ bg }: StyleProps) =>
  StyleSheet.create({
    textStyle: {
      fontFamily: ff.quicksandMedium,
      paddingVertical: bg ? sp.xxs : 0,
      paddingHorizontal: bg ? sp.s : 0,
      color: bg ? cp.white : cp.text1,
      justifyContent: bg ? "center" : "flex-start",
      alignItems: bg ? "center" : "flex-start",
    },
    container: {
      backgroundColor: bg ? cp.purple2 : "transparent",
    },
  });

export default memo(TouchableText);
