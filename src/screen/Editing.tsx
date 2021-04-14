import { CompositeNavigationProp } from "@react-navigation/core";
import axios from "axios";
import React, { FC, useState, useRef } from "react";
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
import api from "../api";
interface EditingProps {
  navigation?: CompositeNavigationProp<any, any>;
}

interface DataFormProps {
  [key: string]: string | number;
}

const Editing: FC<EditingProps> = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imgFile, setImgFile] = useState<any>({ uri: "" });
  const [dataForm, setDataForm] = useState<DataFormProps>({
    barcode: "",
    product_name: "",
    price: "",
  });

  const _setter = (e: string, type: string) => {
    setDataForm((currValue) => {
      let tempData = { ...currValue };
      tempData[type] = e;
      return tempData;
    });
  };

  const _addProduct = async () => {
    setIsLoading(true);
    const dataSend = new FormData();
    const { barcode, product_name, price } = dataForm;
    dataSend.append("product_name", product_name);
    dataSend.append("price", price);
    dataSend.append("barcode", barcode);
    dataSend.append("product_image", imgFile);
    try {
      const {
        data: { data },
      } = await axios.post(`${api.product.postProduct}`, dataSend, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      console.log(data);
      setDataForm({
        barcode: "",
        product_name: "",
        price: "",
      });
      setImgFile({ uri: "" });
      setIsLoading(false);
    } catch (error) {
      console.log("Editing, _addProduct(),", error);
      setIsLoading(false);
    }
  };

  return (
    <AppCanvas>
      <ImgField onPress={() => setVisible(true)} uri={imgFile.uri} />
      <FormContainer vertical={48}>
        <TextField
          placeholder={"Barcode Barang (Opsional)"}
          keyboardType="numeric"
          setter={_setter}
          optKey="barcode"
          maxLength={15}
          defaultValue={dataForm.barcode.toString()}
        />
        <TextField
          placeholder={"Nama Barang"}
          setter={_setter}
          optKey="product_name"
          maxLength={150}
          defaultValue={dataForm.product_name.toString()}
        />
        <TextField
          placeholder={"Harga Barang"}
          keyboardType="numeric"
          setter={_setter}
          optKey="price"
          defaultValue={dataForm.price.toString()}
        />
        <TouchableText
          buttonStyle={{ height: 50 }}
          type="positiveLabel"
          onPress={() => _addProduct()}
          isLoading={isLoading}
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
                setVisible(false);
                setImgFile({
                  name: response.fileName,
                  type: response.type,
                  uri: response.uri,
                });
              }
            ),
          onPressRight: () =>
            launchImageLibrary(
              {
                mediaType: "photo",
              },
              (response) => {
                setVisible(false);
                setImgFile({
                  name: response.fileName,
                  type: response.type,
                  uri: response.uri,
                });
              }
            ),
        }}
      />
    </AppCanvas>
  );
};

export default Editing;
