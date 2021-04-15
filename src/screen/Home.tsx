import { CompositeNavigationProp } from "@react-navigation/core";
import axios from "axios";
import React, { FC, useEffect, useState, useRef, useCallback } from "react";
import { FlatList, StyleSheet, View, RefreshControl } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import SkeletonContent from "react-native-skeleton-content-nonexpo";
import { Plus } from "../../assets";
import api from "../api";
import {
  AppCanvas,
  EmptyState,
  FloatButton,
  ProductTile,
  SearchHeader,
} from "../components";
import {
  routesName as r,
  skeletonLayout as sl,
  spacing as sp,
} from "../constants";
import { MainProduct } from "../constants/types";
import { myCallback, myMemo } from "../hooks";

interface HomeProps {
  navigation: CompositeNavigationProp<any, any>;
}

const Home: FC<HomeProps> = ({ navigation }) => {
  const s = styles();
  const [products, setProducts] = useState<MainProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const addPress = myCallback(() => navigation.navigate(r.EDITING));
  const bottomSheet = myCallback(() => handleSnapPress(1));
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = myMemo(["0%", "50%", "90%"]);
  const handleSheetChange = useCallback((index) => {
    console.log("handleSheetChange", index);
  }, []);
  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapTo(index);
  }, []);
  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  const _getProducts = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const {
          data: { data },
        } = await axios.get(`${api.product.getProducts}`);
        resolve({ is_success: true });
        setProducts(data);
        setIsLoading(false);
      } catch (error) {
        console.log("Home, _getProducts():", error);
        reject({ is_success: false });
        setIsLoading(false);
      }
    });
  };

  const onRefresh = async () => {
    setRefreshing(true);
    const { is_success }: any = await _getProducts();
    if (is_success) setRefreshing(false);
  };

  const refreshControl = <RefreshControl {...{ refreshing, onRefresh }} />;

  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed) {
      _getProducts();
    }
    return () => {
      isSubscribed = false;
    };
  }, []);

  return (
    <AppCanvas>
      <SearchHeader navigation={navigation} />
      <SkeletonContent
        containerStyle={{ flex: 1 }}
        isLoading={isLoading}
        layout={sl.home}
      >
        <FlatList
          columnWrapperStyle={{ justifyContent: "space-between" }}
          numColumns={2}
          keyExtractor={(item) => `${item.barcode}`}
          contentContainerStyle={{
            paddingHorizontal: sp.xxxm,
            paddingVertical: sp.xm,
          }}
          data={products}
          renderItem={({ item }) => <ProductTile item={item} />}
          ListEmptyComponent={<EmptyState onPress={bottomSheet} />}
          refreshControl={refreshControl}
          initialNumToRender={4}
        />
      </SkeletonContent>
      {products.length !== 0 && (
        <FloatButton onPress={addPress}>
          <View style={s.float}>
            <Plus />
          </View>
        </FloatButton>
      )}
      <BottomSheet
        ref={sheetRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChange}
      >
        <BottomSheetView style={s.contentContainer}>
          <View style={{ flex: 1, backgroundColor: "red" }} />
        </BottomSheetView>
      </BottomSheet>
    </AppCanvas>
  );
};

const styles = () =>
  StyleSheet.create({
    contentContainer: {
      backgroundColor: "white",
    },
    float: {
      width: 56,
      height: 56,
      justifyContent: "center",
      alignItems: "center",
    },
  });

export default Home;
