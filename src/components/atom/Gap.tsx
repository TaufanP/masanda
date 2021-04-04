import React, { FC, PropsWithChildren, memo } from "react";
import { View } from "react-native";

interface GapProps {
  vertical?: number;
  horizontal?: number;
}

const Gap: FC<PropsWithChildren<GapProps>> = ({
  vertical,
  horizontal,
  children,
}) => {
  return (
    <View
      style={[
        vertical !== undefined && {
          paddingTop: vertical / 2,
          paddingBottom: vertical / 2,
        },
        horizontal !== undefined && {
          paddingRight: horizontal / 2,
          paddingLeft: horizontal / 2,
        },
      ]}
    >
      {children}
    </View>
  );
};

export default memo(Gap);
