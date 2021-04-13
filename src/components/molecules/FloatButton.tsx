import React, { FC, memo, PropsWithChildren } from "react";
import {
  Alert,
  GestureResponderEvent,
  StyleSheet,
  TouchableNativeFeedbackProps,
  View,
} from "react-native";
import { fontFamily as ff, colorsPalette as cp } from "../../constants";
import { Touchable } from "../atom";

interface FloatButtonProps {
  touchableProps?: TouchableNativeFeedbackProps;
  buttonStyle?: Object;
  size?: number;
  onPress: any;
}

interface StylesProps {
  size?: number;
}

const FloatButton: FC<PropsWithChildren<FloatButtonProps>> = ({
  children,
  touchableProps,
  buttonStyle,
  size = 56,
  onPress,
}) => {
  const s = styles({ size });
  return (
    <View style={s.floatCont}>
      <Touchable
        onPress={onPress}
        {...touchableProps}
        style={[buttonStyle, s.container]}
        width={size}
        height={size}
      >
        {children}
      </Touchable>
    </View>
  );
};

const styles = ({ size }: StylesProps) =>
  StyleSheet.create({
    floatCont: {
      width: size,
      height: size,
      borderRadius: size,
      position: "absolute",
      bottom: 24,
      right: 24,
      backgroundColor: cp.purple2,
      justifyContent: "center",
      alignItems: "center",
    },
    textStyle: { fontFamily: ff.quicksandMedium },
    container: {
      backgroundColor: "transparent",
    },
  });

export default memo(FloatButton);
