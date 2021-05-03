import React, { FC, PropsWithChildren } from "react";
import {
  StyleSheet,
  TouchableNativeFeedback,
  TouchableNativeFeedbackProps,
  View,
} from "react-native";
import { colorsPalette as cp } from "../../constants";
import LoadingButton from "./LoadingButton";

interface HitSlopProps {
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
}
interface ButtonProps {
  onPress?: Function;
  width?: number | string;
  height?: number | string;
  vertical?: number;
  horizontal?: number;
  backgroundColor?: string;
  hitslop?: HitSlopProps;
  isLoading?: boolean;
  loadingColor?: string;
  rippleColor?: string;
  bordered?: boolean;
  isRound?: boolean;
  type?: string;
  borderRadius?: number;
}

interface StyleProps {
  width?: number | string;
  height?: number | string;
  vertical?: number;
  horizontal?: number;
  style?: Object;
  backgroundColor?: string;
  bordered?: boolean;
  isRound?: boolean;
  borderRadius?: number;
}

const Button: FC<
  PropsWithChildren<ButtonProps & TouchableNativeFeedbackProps>
> = ({
  children,
  width = 40,
  height = 40,
  vertical = 0,
  horizontal = 0,
  style,
  backgroundColor,
  onPress = () => console.log("test"),
  hitslop = { top: 0, bottom: 0, left: 0, right: 0 },
  isLoading,
  loadingColor = "#FFF",
  rippleColor = "#fff9",
  bordered = false,
  isRound = false,
  type = "100",
  borderRadius = 8,
  ...props
}) => {
  const s: { [key: string]: any } = styles({
    width,
    height,
    vertical,
    horizontal,
    backgroundColor,
    bordered,
    isRound,
    borderRadius,
  });

  return (
    <View style={s.parent}>
      <TouchableNativeFeedback
        {...props}
        onPress={onPress}
        background={TouchableNativeFeedback.Ripple(rippleColor, true)}
        hitSlop={hitslop}
        disabled={isLoading}
      >
        <View style={[s.container, style, s[`containerSize${type}`]]}>
          {isLoading ? (
            <LoadingButton color={bordered ? backgroundColor : loadingColor} />
          ) : (
            children
          )}
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = ({
  width,
  height,
  vertical,
  horizontal,
  backgroundColor = cp.purple2,
  bordered,
  isRound,
  borderRadius,
}: StyleProps) =>
  StyleSheet.create({
    containerSize100: {
      width: "100%",
      height: "100%",
    },
    containerSizeFlex: { flex: 1 },
    containerSizeFixed: {
      width,
      height,
    },
    containerSizePadding: {
      paddingVertical: vertical,
      paddingHorizontal: horizontal,
    },
    containerSizeAuto: {
      width: "auto",
      height: "auto",
    },
    parent: { borderRadius, overflow: "hidden" },
    container: {
      backgroundColor: bordered ? "transparent" : backgroundColor,
      justifyContent: "center",
      alignItems: "center",
      borderRadius,
      borderWidth: isRound ? 0 : 1,
      borderColor: backgroundColor,
    },
  });

export default Button;
