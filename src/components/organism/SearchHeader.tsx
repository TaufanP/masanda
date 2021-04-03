import { CompositeNavigationProp } from "@react-navigation/core";
import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { DArrow, Scan } from "../../../assets";
import { myMemo } from "../../hooks";
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
  const styleScan = myMemo({ marginLeft: sp.s });
  const namaProps = myMemo({ onPress: () => console.log("test") });
  const hargaProps = myMemo({ onPress: () => console.log("test") });

  return (
    <View style={s.container}>
      <View style={[s.section, s.scan]}>
        <TextField placeholder={str.findGoods} />
        <Touchable width={40} height={40} style={styleScan} isFlex={false}>
          <Scan width={24} height={24} fill={"#FFF"} />
        </Touchable>
      </View>
      <View style={s.section}>
        <TouchableText
          touchableProps={namaProps}
          buttonStyle={{ marginRight: sp.xm }}
          bg={false}
        >
          Nama <DArrow />
        </TouchableText>
        <TouchableText touchableProps={hargaProps} bg={false}>
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
