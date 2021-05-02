import React, { FC, memo } from "react";
import { StyleSheet, View } from "react-native";
import { spacing as sp } from "../../constants";
import TouchableText from "./TouchableText";

interface SorterButtonProps {
  label: string;
  bg: boolean;
  onPress: any;
}

const SorterButton: FC<SorterButtonProps> = ({
  label = "A-Z",
  onPress,
  bg,
}) => {
  const s = styles();
  return (
    <View style={s.container}>
      <TouchableText
        buttonType="Padding"
        horizontal={sp.xxs}
        vertical={2}
        borderRadius={4}
        bg={bg}
        onPress={onPress}
      >
        {label}
      </TouchableText>
    </View>
  );
};

const styles = () => StyleSheet.create({ container: { marginRight: sp.xxs } });

export default memo(SorterButton);
