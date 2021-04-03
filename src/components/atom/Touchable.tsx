import React, { FC, memo, PropsWithChildren } from "react";
import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
} from "react-native";
import { colorsPalette as cp } from "../../constants";

interface TouchableProps {
  onPress?: any;
  width?: number | string;
  height?: number | string;
}

interface StyleProps {
  width?: number | string;
  height?: number | string;
  style?: Object;
}

const Touchable: FC<
  PropsWithChildren<TouchableProps & TouchableOpacityProps>
> = ({ children, width = 40, height = 40, style, ...props }) => {
  const s = styles({ width, height });
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      {...props}
      style={[s.container, style]}
    >
      {children}
    </TouchableOpacity>
  );
};

const styles = ({ width, height }: StyleProps) =>
  StyleSheet.create({
    container: {
      width,
      height,
      backgroundColor: cp.purple2,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 8,
    },
  });

export default memo(Touchable);
