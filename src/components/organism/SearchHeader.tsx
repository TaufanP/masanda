import { CompositeNavigationProp } from "@react-navigation/core";
import React, { FC, memo, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { CloseX, Scan } from "../../../assets";
import {
  colorsPalette as cp,
  routesName as r,
  spacing as sp,
  strings as str,
} from "../../constants";
import { MainProduct } from "../../constants/types";
import { myMemo } from "../../hooks";
import { Button, TextField } from "../atom/";
import { TouchableText, SorterButton } from "../molecules";

interface SearchHeader {
  navigation: CompositeNavigationProp<any, any>;
  searchData: MainProduct[];
  submitAction: any;
  setter: any;
  extraAction: any;
  keyword: string;
  sortAction: any;
  currentSort: any;
  sortData: any;
  selectedField?: number;
  settingField?: any;
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
  sortData,
  selectedField,
  settingField,
}) => {
  const s = styles();
  const [taps, setTaps] = useState<any>(0);
  const styleInput = myMemo({ marginRight: sp.s });

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
      </View>
      <ScrollView
        contentContainerStyle={[
          s.section,
          {
            marginTop: sp.xxxs,
          },
        ]}
      >
        {sortData.map((item: any) => (
          <SorterButton
            label={item.label}
            key={item.id}
            bg={item.id == selectedField}
            onPress={() => settingField({ id: item.id, value: item.value })}
          />
        ))}
      </ScrollView>
      {/* <View style={s.section}>
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
      </View> */}
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
