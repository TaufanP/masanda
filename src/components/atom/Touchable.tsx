import React, { FC, memo, PropsWithChildren } from "react";
import {
  StyleSheet,
  TouchableNativeFeedback,
  TouchableNativeFeedbackProps,
  TouchableOpacityProps,
  View,
} from "react-native";
import { colorsPalette as cp } from "../../constants";

interface TouchableProps {
  onPress?: any;
  width?: number | string;
  height?: number | string;
  vertical?: number;
  horizontal?: number;
  isFlex?: boolean;
}

interface StyleProps {
  width?: number | string;
  height?: number | string;
  vertical?: number;
  horizontal?: number;
  style?: Object;
  isFlex: boolean;
}

const Touchable: FC<
  // PropsWithChildren<TouchableProps & TouchableOpacityProps>
  PropsWithChildren<TouchableProps & TouchableNativeFeedbackProps>
> = ({
  children,
  width = 40,
  height = 40,
  isFlex = true,
  vertical,
  horizontal,
  style,
  onPress = () => console.log("test"),
  ...props
}) => {
  const s = styles({ width, height, vertical, horizontal, isFlex });
  // return (
  //   <TouchableOpacity
  //     activeOpacity={0.8}
  //     {...props}
  //     style={[s.container, style]}
  //     onPress={onPress}
  //   >
  //     {children}
  //   </TouchableOpacity>
  // );
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

const styles = ({ width, height, vertical, horizontal, isFlex }: StyleProps) =>
  StyleSheet.create({
    parent: { borderRadius: 8 },
    container: {
      width: isFlex ? "auto" : width,
      height: isFlex ? "auto" : height,
      backgroundColor: cp.purple2,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 8,
      paddingVertical: vertical,
      paddingHorizontal: horizontal,
    },
  });

export default memo(Touchable);
