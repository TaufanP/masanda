import { CompositeNavigationProp } from "@react-navigation/core";
import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { DArrow, Scan } from "../../../assets";
import { myMemo, myCallback } from "../../hooks";
import {
  colorsPalette as cp,
  spacing as sp,
  strings as str,
} from "../../constants";
import { TextField, Touchable } from "../atom/";
import { TouchableText } from "../molecules";

interface SearchHeader {
  navigation?: CompositeNavigationProp<any, any>;
}

const SearchHeader: FC<SearchHeader> = () => {
  const s = styles();
  const styleInput = myMemo({ marginRight: sp.s });
  const namePress = myCallback(() => console.log("hasil"));
  const pricepress = myCallback(() => console.log("hasil"));

  return (
    <View style={s.container}>
      <View style={[s.section, s.scan]}>
        <TextField
          placeholder={str.findGoods}
          style={styleInput}
          isRow={true}
          useGap={false}
        />
        <Touchable width={40} height={40} isFlex={false}>
          <Scan width={24} height={24} fill={"#FFF"} />
        </Touchable>
      </View>
      <View style={s.section}>
        <TouchableText
          onPress={namePress}
          buttonStyle={{ marginRight: sp.xm }}
          bg={false}
        >
          Nama <DArrow />
        </TouchableText>
        <TouchableText onPress={pricepress} bg={false}>
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
