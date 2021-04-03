import React, { FC, memo, PropsWithChildren } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacityProps,
  TextInputProps,
} from "react-native";
import { fontFamily as ff } from "../../constants";
import { Touchable } from "../atom";

interface TouchableTextProps {
  touchableProps?: TouchableOpacityProps;
  textProps?: TextInputProps;
  buttonStyle?: Object;
}

const TouchableText: FC<PropsWithChildren<TouchableTextProps>> = ({
  children,
  touchableProps,
  textProps,
  buttonStyle,
}) => {
  const s = styles();
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

const styles = () =>
  StyleSheet.create({
    textStyle: { fontFamily: ff.quicksandMedium },
    container: {
      backgroundColor: "transparent",
    },
  });

export default memo(TouchableText);
