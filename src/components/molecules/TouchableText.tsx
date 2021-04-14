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
  textStyle,
  onPress,
  isAuto,
  type,
}) => {
  const s = styles({ bg });
  return (
    <Touchable
      {...touchableProps}
      style={[buttonStyle, s.container]}
      width={isAuto ? "auto" : "100%"}
      height={isAuto ? "auto" : "100%"}
      onPress={onPress}
      isFlex={isAuto}
    >
      <TextItem {...textProps} style={[s.text, textStyle]} type={type}>
        {children}
      </TextItem>
    </Touchable>
  );
};

const styles = ({ bg }: StyleProps) =>
  StyleSheet.create({
    text: {
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
