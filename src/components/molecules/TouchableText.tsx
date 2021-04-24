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
import { Touchable, TextItem } from "../atom";

interface TouchableTextProps {
  touchableProps?: TouchableOpacityProps;
  textProps?: TextInputProps;
  buttonStyle?: Object;
  bg?: boolean;
  onPress?: () => void;
  textStyle?: any;
  isAuto?: boolean;
  type?: string;
  isLoading?: boolean;
  loadingColor?: string;
  width?: number | string;
  height?: number | string;
  rippleColor?: string;
  backgroundColor?: string;
  isCenter?: boolean;
}

interface StyleProps {
  bg: boolean;
  backgroundColor?: string;
  isCenter?: boolean;
}

const TouchableText: FC<PropsWithChildren<TouchableTextProps>> = ({
  children,
  touchableProps,
  textProps,
  buttonStyle,
  bg = true,
  textStyle,
  onPress,
  isAuto,
  type,
  isLoading,
  loadingColor,
  width = null,
  height = null,
  rippleColor,
  backgroundColor,
  isCenter = false,
}) => {
  const s = styles({ bg, backgroundColor, isCenter });
  return (
    <Touchable
      {...touchableProps}
      style={[buttonStyle, s.container]}
      width={isAuto ? "auto" : width || "100%"}
      height={isAuto ? "auto" : height || "100%"}
      onPress={onPress}
      isFlex={isAuto}
      isLoading={isLoading}
      loadingColor={loadingColor}
      rippleColor={rippleColor}
    >
      <TextItem {...textProps} style={[s.text, textStyle]} type={type}>
        {children}
      </TextItem>
    </Touchable>
  );
};

const styles = ({ bg, backgroundColor, isCenter }: StyleProps) =>
  StyleSheet.create({
    text: {
      fontFamily: ff.quicksandMedium,
      paddingVertical: bg ? sp.xxs : 0,
      paddingHorizontal: bg ? sp.s : 0,
      color: bg ? cp.white : cp.text1,
      justifyContent: bg ? "center" : isCenter ? "center" : "flex-start",
      alignItems: bg ? "center" : isCenter ? "center" : "flex-start",
      flexDirection: "row",
    },
    container: {
      backgroundColor: bg ? backgroundColor || cp.purple2 : "transparent",
    },
  });

export default memo(TouchableText);
