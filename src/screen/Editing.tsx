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

interface DataFormProps {
  [key: string]: string | number;
}

const Editing: FC<EditingProps> = () => {
  const [dataForm, setDataForm] = useState<DataFormProps>({
    barcode: "",
    product_name: "",
    price: 0,
  });

  const _setter = (e: string, type: string) => {
    setDataForm((currValue) => {
      let tempData = { ...currValue };
      tempData[type] = e;
      return tempData;
    });
  };

  return (
    <AppCanvas>
      <ImgField />
      <FormContainer vertical={48}>
        <TextField
          placeholder={"Barcode Barang (Optional)"}
          keyboardType="numeric"
          setter={_setter}
          optKey="barcode"
        />
        <TextField
          placeholder={"Nama Barang"}
          setter={_setter}
          optKey="product_name"
        />
        <TextField
          placeholder={"Harga Barang"}
          keyboardType="numeric"
          setter={_setter}
          optKey="price"
        />
        <TouchableText
          textStyle={{ fontSize: ts.xxxm, fontFamily: ff.quicksandBold }}
          onPress={() => console.log(dataForm)}
        >
          {str.save}
        </TouchableText>
      </FormContainer>
    </AppCanvas>
  );
};

export default Editing;
