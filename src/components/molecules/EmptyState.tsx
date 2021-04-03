import React, { FC, memo, PropsWithChildren } from "react";
import {
  Dimensions,
  StyleSheet,
  TouchableOpacityProps,
  View,
} from "react-native";
import { EmptyIcon, Plus } from "../../../assets";
import { spacing as sp } from "../../constants";
import { TextItem, Gap, Touchable } from "../atom";
import { TouchableText } from "../molecules";
const { width, height } = Dimensions.get("screen");

interface EmptyStateProps {
  touchableProps?: TouchableOpacityProps;
  buttonStyle?: Object;
  size?: number;
}

const EmptyState: FC<PropsWithChildren<EmptyStateProps>> = () => {
  const s = styles();
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        width,
        height: height / 1.5,
        paddingHorizontal: 24,
      }}
    >
      <EmptyIcon width={168} height={168} />
      <TextItem type="semiHeaderC">Anda belum menambahkan produk.</TextItem>
      <TextItem type="defaultC">Tambah produk sekarang.</TextItem>
      <Gap vertical={sp.xxxm} />
      <Touchable vertical={sp.s} horizontal={sp.xxxm}>
        <View style={s.rowCont}>
          <TextItem type="defaultW">TAMBAH</TextItem>
          <Gap horizontal={sp.s} />
          <Plus />
        </View>
      </Touchable>
    </View>
  );
};

const styles = () =>
  StyleSheet.create({
    rowCont: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
  });

export default memo(EmptyState);
