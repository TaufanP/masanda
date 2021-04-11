import React, { FC, memo, PropsWithChildren } from "react";
import {
  Dimensions,
  StyleSheet,
  TouchableOpacityProps,
  View,
} from "react-native";
import { EmptyIcon, Plus } from "../../../assets";
import { spacing as sp, strings as str } from "../../constants";
import { Gap, TextItem, Touchable } from "../atom";
const { width, height } = Dimensions.get("screen");

interface EmptyStateProps {
  touchableProps?: TouchableOpacityProps;
  buttonStyle?: Object;
  size?: number;
  onPress: () => void;
}

const EmptyState: FC<PropsWithChildren<EmptyStateProps>> = ({ onPress }) => {
  const s = styles();
  return (
    <View style={s.container}>
      <EmptyIcon width={168} height={168} />
      <TextItem type="semiHeaderC">{str.notAddingYet}</TextItem>
      <TextItem type="defaultC">{str.addingNow}</TextItem>
      <Gap vertical={sp.xxxm} />
      <Touchable vertical={sp.s} horizontal={sp.xxxm} onPress={onPress}>
        <View style={s.rowCont}>
          <TextItem type="defaultW">{str.adding}</TextItem>
          <Gap horizontal={sp.s} />
          <Plus />
        </View>
      </Touchable>
    </View>
  );
};

const styles = () =>
  StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
      width,
      height: height / 1.5,
      paddingHorizontal: 24,
    },
    rowCont: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
  });

export default memo(EmptyState);
