import React, { FC, memo, PropsWithChildren } from "react";
import {
  StyleSheet,
  TextInputProps,
  TouchableOpacityProps,
} from "react-native";
import {
  colorsPalette as cp,
  fontFamily as ff,
  spacing as sp,
} from "../../constants";
import { Button, TextItem } from "../atom";

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
  bordered?: boolean;
  isRound?: boolean;
  buttonType?: string;
  vertical?: number;
  horizontal?: number;
  borderRadius?: number;
}

interface StyleProps {
  bg: boolean;
  backgroundColor?: string;
  isCenter?: boolean;
  bordered?: boolean;
  isRound?: boolean;
  vertical?: number;
  horizontal?: number;
}

const TouchableText: FC<PropsWithChildren<TouchableTextProps>> = ({
  children,
  touchableProps,
  textProps,
  buttonStyle,
  bg = true,
  textStyle,
  onPress,
  type,
  isLoading,
  loadingColor,
  width = 40,
  height = 40,
  rippleColor,
  backgroundColor,
  isCenter = false,
  bordered = false,
  isRound = false,
  buttonType = "Padding",
  vertical,
  horizontal,
  borderRadius,
}) => {
  const s = styles({
    bg,
    backgroundColor,
    isCenter,
    bordered,
    isRound,
    vertical,
    horizontal,
  });
  return (
    <Button
      {...touchableProps}
      style={[buttonStyle, s.container]}
      onPress={onPress}
      isLoading={isLoading}
      loadingColor={loadingColor}
      rippleColor={rippleColor}
      backgroundColor={backgroundColor}
      type={buttonType}
      vertical={vertical}
      horizontal={horizontal}
      width={width}
      height={height}
      borderRadius={borderRadius}
    >
      <TextItem {...textProps} style={[s.text, textStyle]} type={type}>
        {children}
      </TextItem>
    </Button>
  );
};

const styles = ({
  bg,
  backgroundColor,
  isCenter,
  bordered,
  isRound,
  vertical,
  horizontal,
}: StyleProps) =>
  StyleSheet.create({
    text: {
      fontFamily: ff.quicksandMedium,
      paddingVertical: vertical !== undefined ? vertical : bg ? sp.xxs : 0,
      paddingHorizontal: horizontal !== undefined ? horizontal : bg ? sp.s : 0,
      color: bordered ? backgroundColor : bg ? cp.white : cp.text1,
      justifyContent: bg ? "center" : isCenter ? "center" : "flex-start",
      alignItems: bg ? "center" : isCenter ? "center" : "flex-start",
      flexDirection: "row",
    },
    container: {
      borderWidth: isRound ? 0 : 1,
      borderColor: backgroundColor || cp.purple2,
      backgroundColor: bordered
        ? "transparent"
        : bg
        ? backgroundColor || cp.purple2
        : "transparent",
    },
  });

export default memo(TouchableText);
