import { CompositeNavigationProp } from "@react-navigation/core";
import React, { FC, useState } from "react";
import { AppCanvas, ImgPreview } from "../components";

interface EditingProps {
  navigation?: CompositeNavigationProp<any, any>;
}

const Editing: FC<EditingProps> = () => {
  const [products, setProducts] = useState("");
  return (
    <AppCanvas>
      <ImgPreview />
    </AppCanvas>
  );
};

export default Editing;
