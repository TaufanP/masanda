import { CompositeNavigationProp } from "@react-navigation/core";
import React, { FC, useState } from "react";
import { FlatList } from "react-native";
import { Plus } from "../../assets";
import { myCallback } from "../hooks";
import { routesName as r } from "../constants";
import {
  AppCanvas,
  EmptyState,
  FloatButton,
  SearchHeader,
} from "../components";

interface HomeProps {
  navigation: CompositeNavigationProp<any, any>;
}

const Home: FC<HomeProps> = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const addPress = myCallback(() => navigation.navigate(r.EDITING));
  return (
    <AppCanvas>
      <SearchHeader navigation={navigation} />
      <FlatList
        contentContainerStyle={{ flex: 1 }}
        data={products}
        renderItem={() => <></>}
        ListEmptyComponent={<EmptyState onPress={addPress} />}
      />
      {products.length !== 0 && (
        <FloatButton>
          <Plus />
        </FloatButton>
      )}
    </AppCanvas>
  );
};

export default Home;
