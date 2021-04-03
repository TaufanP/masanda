import { CompositeNavigationProp } from "@react-navigation/core";
import React, { FC } from "react";
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
  return (
    <AppCanvas>
      <SearchHeader />
      <FlatList
        contentContainerStyle={{ flex: 1 }}
        data={[]}
        renderItem={() => <></>}
        ListEmptyComponent={<EmptyState />}
      />
      <FloatButton>
        <Plus />
      </FloatButton>
    </AppCanvas>
  );
};

export default Home;
