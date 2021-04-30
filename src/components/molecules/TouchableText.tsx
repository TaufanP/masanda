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
}

interface StyleProps {
  bg: boolean;
  backgroundColor?: string;
  isCenter?: boolean;
  bordered?: boolean;
  isRound?: boolean;
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
}) => {
  const s = styles({ bg, backgroundColor, isCenter, bordered, isRound });
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
      vertical={4}
      horizontal={8}
      width={width}
      height={height}
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
}: StyleProps) =>
  StyleSheet.create({
    text: {
      fontFamily: ff.quicksandMedium,
      paddingVertical: bg ? sp.xxs : 0,
      paddingHorizontal: bg ? sp.s : 0,
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
