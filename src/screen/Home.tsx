import { CompositeNavigationProp } from "@react-navigation/core";
import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { Plus } from "../../assets";
import api from "../api";
import {
  AppCanvas,
  EmptyState,
  FloatButton,
  ProductTile,
  SearchHeader,
} from "../components";
import { routesName as r, spacing as sp } from "../constants";
import { MainProduct } from "../constants/types";
import { myCallback } from "../hooks";

interface HomeProps {
  navigation: CompositeNavigationProp<any, any>;
}

const Home: FC<HomeProps> = ({ navigation }) => {
  const s = styles();
  const [products, setProducts] = useState([]);
  const addPress = myCallback(() => navigation.navigate(r.EDITING));
  const _getProducts = async () => {
    try {
      const {
        data: { data },
      } = await axios.get(`${api.product.getProducts}`);
      setProducts(data);
    } catch (error) {
      console.log(`${api.product.getProducts}`, error);
    }
  };

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
      <FlatList
        columnWrapperStyle={{ justifyContent: "space-between" }}
        numColumns={2}
        keyExtractor={(item: MainProduct) => `${item.barcode}`}
        contentContainerStyle={{
          flex: 1,
          paddingHorizontal: sp.xxxm,
          paddingTop: sp.xm,
        }}
        data={products}
        renderItem={({ item }) => <ProductTile item={item} />}
        ListEmptyComponent={<EmptyState onPress={addPress} />}
      />
      {products.length !== 0 && (
        <FloatButton onPress={addPress}>
          <View style={s.float}>
            <Plus />
          </View>
        </FloatButton>
      )}
    </AppCanvas>
  );
};

const styles = () =>
  StyleSheet.create({
    float: {
      width: 56,
      height: 56,
      justifyContent: "center",
      alignItems: "center",
    },
  });

export default Home;
