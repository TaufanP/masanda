import { CompositeNavigationProp } from "@react-navigation/core";
import React, { FC, useState, memo } from "react";
import { StyleSheet, View, Text } from "react-native";
import { CloseX, Scan } from "../../../assets";
import {
  colorsPalette as cp,
  routesName as r,
  spacing as sp,
  strings as str,
} from "../../constants";
import { MainProduct } from "../../constants/types";
import { myMemo } from "../../hooks";
import { TextField, Touchable, Button } from "../atom/";
import { TouchableText } from "../molecules";

interface SearchHeader {
  navigation: CompositeNavigationProp<any, any>;
  searchData: MainProduct[];
  submitAction: any;
  setter: any;
  extraAction: any;
  keyword: string;
  sortAction: any;
  currentSort: any;
}

const SearchHeader: FC<SearchHeader> = ({
  navigation,
  searchData,
  submitAction,
  setter,
  extraAction,
  keyword,
  sortAction,
  currentSort,
}) => {
  const s = styles();
  const [taps, setTaps] = useState<any>(0);
  const styleInput = myMemo({ marginRight: sp.s });

  const textColorName =
    currentSort.field == "product_name" ? "primeColor" : "defaultColor";
  const textColorPrice =
    currentSort.field == "price" ? "primeColor" : "defaultColor";

  const arrowPrice =
    currentSort.field == "price" && currentSort.order == 1
      ? "Terendah "
      : currentSort.field == "price" && currentSort.order == -1
      ? "Tertinggi "
      : "Harga ";
  const arrowName =
    currentSort.field == "product_name" && currentSort.order == 1
      ? "A-Z "
      : currentSort.field == "product_name" && currentSort.order == -1
      ? "Z-A "
      : "Nama ";

  const onPressSort = (type: string) => {
    if (taps == 0) {
      sortAction({ type: "", order: 1 });
      setTaps(1);
      return;
    }
    if (taps == 1) {
      sortAction({ type, order: 1 });
      setTaps(2);
      return;
    }
    if (taps == 2) {
      sortAction({ type, order: -1 });
      setTaps(0);
      return;
    }
  };

  return (
    <View style={s.container}>
      <View style={[s.section, s.scan]}>
        <TextField
          placeholder={str.findGoods}
          style={styleInput}
          isRow={true}
          useGap={false}
          onSubmitEditing={submitAction}
          setter={setter}
          isExtra={keyword.length !== 0}
          extraComp={<CloseX fill={cp.white2} width={16} height={16} />}
          extraAction={extraAction}
          defaultValue={keyword}
        />
        <Button
          width={40}
          height={40}
          type="Fixed"
          onPress={() =>
            navigation.navigate(r.SCANNER, { products: searchData })
          }
        >
          <Scan width={24} height={24} fill={"#FFF"} />
        </Button>
        {/* <Touchable
          width={40}
          height={40}
          isFlex={false}
          onPress={() =>
            navigation.navigate(r.SCANNER, { products: searchData })
          }
        >
          <Scan width={24} height={24} fill={"#FFF"} />
        </Touchable> */}
      </View>
      <View style={s.section}>
        <TouchableText
          onPress={() => onPressSort("product_name")}
          buttonStyle={{ marginRight: sp.xm }}
          bg={false}
          isRound={true}
          type={textColorName}
        >
          {arrowName}
        </TouchableText>
        <TouchableText
          onPress={() => onPressSort("price")}
          bg={false}
          isRound={true}
          type={textColorPrice}
        >
          {arrowPrice}
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

export default memo(SearchHeader);
