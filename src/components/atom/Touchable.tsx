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
  PropsWithChildren<TouchableProps & TouchableOpacityProps>
> = ({
  children,
  width = 40,
  height = 40,
  isFlex = true,
  vertical,
  horizontal,
  style,
  ...props
}) => {
  const s = styles({ width, height, vertical, horizontal, isFlex });
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

const styles = ({ width, height, vertical, horizontal, isFlex }: StyleProps) =>
  StyleSheet.create({
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
