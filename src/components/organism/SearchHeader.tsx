import { CompositeNavigationProp } from "@react-navigation/core";
import React, { FC, memo } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { CloseX, Scan } from "../../../assets";
import { requestCameraPermission } from "../../config";
import {
  colorsPalette as cp,
  routesName as r,
  spacing as sp,
  strings as str,
} from "../../constants";
import { MainProduct } from "../../constants/types";
import { myMemo } from "../../hooks";
import { Button, TextField } from "../atom/";
import { SorterButton } from "../molecules";

interface SearchHeader {
  navigation: CompositeNavigationProp<any, any>;
  searchData: MainProduct[];
  submitAction: any;
  setter: any;
  extraAction: any;
  keyword: string;
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
  sortData,
  selectedField,
  settingField,
}) => {
  const s = styles();
  const styleInput = myMemo({ marginRight: sp.s });
  const scanPress = async () => {
    const isGranted = await requestCameraPermission();
    if (isGranted) navigation.navigate(r.SCANNER, { products: searchData });
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
        <Button width={40} height={40} type="Fixed" onPress={scanPress}>
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
