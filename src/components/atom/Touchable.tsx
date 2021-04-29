import React, { FC, memo, PropsWithChildren } from "react";
import {
  ActivityIndicator,
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
interface TouchableProps {
  onPress?: Function;
  width?: number | string;
  height?: number | string;
  vertical?: number;
  horizontal?: number;
  isFlex?: boolean;
  backgroundColor?: string;
  hitslop?: HitSlopProps;
  isLoading?: boolean;
  loadingColor?: string;
  rippleColor?: string;
  bordered?: boolean;
  isRound?: boolean;
}

interface StyleProps {
  width?: number | string;
  height?: number | string;
  vertical?: number;
  horizontal?: number;
  style?: Object;
  isFlex: boolean;
  backgroundColor?: string;
  bordered?: boolean;
  isRound?: boolean;
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
  hitslop = { top: 0, bottom: 0, left: 0, right: 0 },
  isLoading,
  loadingColor = "#FFF",
  rippleColor = "#fff9",
  bordered = false,
  isRound = false,
  ...props
}) => {
  const s = styles({
    width,
    height,
    vertical,
    horizontal,
    isFlex,
    backgroundColor,
    bordered,
    isRound,
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
        <View style={[s.container, style]}>
          {isLoading ? (
            <LoadingButton color={bordered ? backgroundColor : loadingColor} />
          ) : (
            // <ActivityIndicator
            //   color={bordered ? backgroundColor : loadingColor}
            // />
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
  isFlex,
  backgroundColor = cp.purple2,
  bordered,
  isRound,
}: StyleProps) =>
  StyleSheet.create({
    parent: { borderRadius: 8, overflow: "hidden" },
    container: {
      width: isFlex ? "auto" : width,
      height: isFlex ? "auto" : height,
      backgroundColor: bordered ? "transparent" : backgroundColor,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 8,
      paddingVertical: vertical,
      paddingHorizontal: horizontal,
      borderWidth: isRound ? 0 : 1,
      borderColor: backgroundColor,
    },
  });

export default Touchable;
