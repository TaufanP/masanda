import React, { FC, memo, PropsWithChildren } from "react";
import { StyleSheet, TouchableNativeFeedbackProps, View } from "react-native";
import { colorsPalette as cp, fontFamily as ff } from "../../constants";
import { Button } from "../atom";

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
      <Button
        onPress={onPress}
        {...touchableProps}
        style={[buttonStyle, s.container]}
        width={size}
        height={size}
        isRound={true}
      >
        {children}
      </Button>
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
