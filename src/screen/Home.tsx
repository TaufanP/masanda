import { CompositeNavigationProp } from "@react-navigation/core";
import React, { FC, useState } from "react";
import { FlatList } from "react-native";
import { Plus } from "../../assets";
import {
  AppCanvas,
  EmptyState,
  FloatButton,
  SearchHeader,
} from "../components";

interface HomeProps {
  navigation: CompositeNavigationProp<any, any>;
}

const Home: FC<HomeProps> = () => {
  const [products, setProducts] = useState([]);
  return (
    <AppCanvas>
      <SearchHeader />
      <FlatList
        contentContainerStyle={{ flex: 1 }}
        data={products}
        renderItem={() => <></>}
        ListEmptyComponent={<EmptyState />}
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
