import { CompositeNavigationProp } from "@react-navigation/core";
import React, { FC, useState } from "react";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import {
  AppCanvas,
  ImgField,
  TextField,
  Gap,
  FormContainer,
  TouchableText,
  StaticBottomSheet,
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
  const [visible, setVisible] = useState<boolean>(false);
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
      <ImgField onPress={() => setVisible(true)} />
      <FormContainer vertical={48}>
        <TextField
          placeholder={"Barcode Barang (Opsional)"}
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
          buttonStyle={{ height: 50 }}
          type="positiveLabel"
          onPress={() => console.log(dataForm)}
        >
          {str.save}
        </TouchableText>
      </FormContainer>
      <StaticBottomSheet
        {...{
          setVisible,
          visible,
          leftLabel: "Kamera",
          mainTitle: "Ambil Foto Produk",
          rightLabel: "Galeri",
          subTitle: "Ambil foto dari kamera maupun galeri.",
          onPressLeft: () =>
            launchCamera(
              {
                mediaType: "photo",
              },
              (response) => {
                console.log(response);
              }
            ),
          onPressRight: () =>
            launchImageLibrary(
              {
                mediaType: "photo",
              },
              (response) => {
                console.log(response);
              }
            ),
        }}
      />
    </AppCanvas>
  );
};

export default Editing;
