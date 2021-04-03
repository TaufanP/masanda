import { CompositeNavigationProp } from "@react-navigation/core";
import React, { FC } from "react";
import { Alert, StyleSheet, View } from "react-native";
import {
  colorsPalette as cp,
  strings as str,
  spacing as sp,
} from "../../constants";
import { TextField, Touchable } from "../atom/";
import { TouchableText } from "../molecules";
import { Scan, DArrow } from "../../../assets";

interface SearchHeader {
  navigation?: CompositeNavigationProp<any, any>;
}

const SearchHeader: FC<SearchHeader> = () => {
  const s = styles();
  return (
    <View style={s.container}>
      <View style={[s.section, s.scan]}>
        <TextField placeholder={str.findGoods} />
        <Touchable width={40} height={40} style={{ marginLeft: sp.s }}>
          <Scan width={24} height={24} fill={"#FFF"} />
        </Touchable>
      </View>
      <View style={s.section}>
        <TouchableText
          touchableProps={{ onPress: () => console.log("test") }}
          buttonStyle={{ marginRight: sp.xm }}
        >
          Nama <DArrow />
        </TouchableText>
        <TouchableText touchableProps={{ onPress: () => console.log("test") }}>
          Harga <DArrow />
        </TouchableText>
      </View>
    </View>
  );
};

const styles = () =>
  StyleSheet.create({
    scan: { marginBottom: sp.xxs, justifyContent: "space-between" },
    section: {
      flexDirection: "row",
    },
    container: {
      backgroundColor: cp.white,
      paddingVertical: sp.s,
      elevation: 8,
      paddingHorizontal: sp.xxxm,
    },
  });

export default SearchHeader;
