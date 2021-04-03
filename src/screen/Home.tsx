import { CompositeNavigationProp } from "@react-navigation/core";
import React, { FC } from "react";
import { AppCanvas, SearchHeader, FloatButton } from "../components";
import { Plus } from "../../assets";
import { FlatList } from "react-native";

interface HomeProps {
  navigation: CompositeNavigationProp<any, any>;
}

const Home: FC<HomeProps> = () => {
  return (
    <AppCanvas>
      <SearchHeader />
      {/* <FlatList/> */}
      <FloatButton>
        <Plus />
      </FloatButton>
    </AppCanvas>
  );
};

export default Home;
