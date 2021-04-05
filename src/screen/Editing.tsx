import { CompositeNavigationProp } from "@react-navigation/core";
import React, { FC, useState } from "react";
import {
  AppCanvas,
  ImgField,
  TextField,
  Gap,
  FormContainer,
  TouchableText,
} from "../components";
import {
  spacing as sp,
  strings as str,
  textSize as ts,
  fontFamily as ff,
} from "../constants";

interface EditingProps {
  navigation?: CompositeNavigationProp<any, any>;
}

const Editing: FC<EditingProps> = () => {
  const [products, setProducts] = useState("");
  return (
    <AppCanvas>
      <ImgField />
      <FormContainer vertical={48}>
        <TextField placeholder={"Nama Barang"} />
        <TextField placeholder={"Harga Barang"} keyboardType="numeric" />
        <TouchableText
          textStyle={{ fontSize: ts.xxxm, fontFamily: ff.quicksandBold }}
        >
          {str.save}
        </TouchableText>
      </FormContainer>
    </AppCanvas>
  );
};

export default Editing;
