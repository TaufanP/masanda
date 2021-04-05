import React, { FC, PropsWithChildren, memo } from "react";
import { View, StyleSheet } from "react-native";

interface GapProps {
  vertical?: number;
  horizontal?: number;
  custom?: any;
  only?: string;
}

const Gap: FC<PropsWithChildren<GapProps>> = ({
  vertical = 0,
  horizontal = 0,
  only = "container",
  custom,
  children,
}) => {
  const s: { [key: string]: any } = styles({
    vertical,
    horizontal,
  });
  return <View style={[s[only], custom]}>{children}</View>;
};

const styles = ({ vertical = 0, horizontal = 0 }: GapProps) =>
  StyleSheet.create({
    container: {
      paddingRight: horizontal / 2,
      paddingLeft: horizontal / 2,
      paddingTop: vertical / 2,
      paddingBottom: vertical / 2,
    },
    top: {
      paddingTop: vertical / 2,
      paddingRight: 0,
      paddingLeft: 0,
      paddingBottom: 0,
    },
    bottom: {
      paddingBottom: vertical / 2,
      paddingRight: 0,
      paddingLeft: 0,
      paddingTop: 0,
    },
    left: {
      paddingLeft: horizontal / 2,
      paddingRight: 0,
      paddingTop: 0,
      paddingBottom: 0,
    },
    right: {
      paddingRight: horizontal / 2,
      paddingLeft: 0,
      paddingTop: 0,
      paddingBottom: 0,
    },
  });

export default memo(Gap);
