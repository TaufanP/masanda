import React, { FC, memo, PropsWithChildren } from "react";
import {
  StyleSheet,
  TouchableNativeFeedback,
  TouchableNativeFeedbackProps,
  View,
} from "react-native";
import { colorsPalette as cp } from "../../constants";

interface TouchableProps {
  onPress?: () => void;
  width?: number | string;
  height?: number | string;
  vertical?: number;
  horizontal?: number;
  isFlex?: boolean;
  backgroundColor?: string;
}

interface StyleProps {
  width?: number | string;
  height?: number | string;
  vertical?: number;
  horizontal?: number;
  style?: Object;
  isFlex: boolean;
  backgroundColor?: string;
}

const Touchable: FC<
  PropsWithChildren<TouchableProps & TouchableNativeFeedbackProps>
> = ({
  children,
  width = 40,
  height = 40,
  isFlex = true,
  vertical,
  horizontal,
  style,
  backgroundColor,
  onPress = () => console.log("test"),
  ...props
}) => {
  const s = styles({
    width,
    height,
    vertical,
    horizontal,
    isFlex,
    backgroundColor,
  });
  return (
    <View style={s.parent}>
      <TouchableNativeFeedback
        {...props}
        onPress={onPress}
        background={TouchableNativeFeedback.Ripple("#fff9", true)}
      >
        <View style={[s.container, style]}>{children}</View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = ({
  width,
  height,
  vertical,
  horizontal,
  isFlex,
  backgroundColor = cp.purple2,
}: StyleProps) =>
  StyleSheet.create({
    parent: { borderRadius: 8, overflow: "hidden" },
    container: {
      width: isFlex ? "auto" : width,
      height: isFlex ? "auto" : height,
      backgroundColor,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 8,
      paddingVertical: vertical,
      paddingHorizontal: horizontal,
    },
  });

export default Touchable;
