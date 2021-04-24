import { CompositeNavigationProp, useRoute } from "@react-navigation/core";
import { RouteProp } from "@react-navigation/native";
import axios from "axios";
import React, { FC, useState, ReactNode, useEffect } from "react";
import StackParamsList from "../constants/screen-params";
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
  colorsPalette as cp,
  fancyState as fan,
} from "../constants";
import api from "../api";
import mockApi from "../api/mockApi";
import { FancyTypes } from "../constants/fancy-states";
interface EditingProps {
  navigation?: CompositeNavigationProp<any, any>;
}

interface DataFormProps {
  [key: string]: string | number;
}
interface StaticBottomSheetProps {
  onPressLeft?: any;
  onPressRight?: any;
  onPress?: any;
  action?: boolean;
  leftLabel?: string;
  rightLabel?: string;
  mainLabel?: string;
  mainTitle?: string;
  subTitle?: string;
  mainIcon?: ReactNode;
}

interface StaticTypeProps {
  [key: string]: StaticBottomSheetProps;
}

const Editing: FC<EditingProps> = () => {
  const { defaultState, fancyType } = fan;
  const [fancyBarState, setFancyBarState] = useState<FancyTypes>(defaultState);
  const route = useRoute<RouteProp<StackParamsList, "EDITING">>();
  const detail = route?.params?.detail;
  const [isEditing, setIsEditing] = useState<boolean>(
    route?.params?.isEditing || false
  );
  const [visible, setVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDeleteLoading, setisDeleteLoading] = useState<boolean>(false);
  const [imgFile, setImgFile] = useState<any>({ uri: "" });
  const [dataForm, setDataForm] = useState<DataFormProps>({
    barcode: "",
    product_name: "",
    price: "",
  });
  const [staticType, setStaticType] = useState<string>("");

  const _setter = (e: string, type: string) => {
    setDataForm((currValue) => {
      let tempData = { ...currValue };
      tempData[type] = e;
      return tempData;
    });
  };

  const _cleaningForm = () => {
    setDataForm({
      barcode: "",
      product_name: "",
      price: "",
    });
    setImgFile({ uri: "" });
    setIsEditing(false);
    return;
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
      await axios.post(`${api.product.postProduct}`, dataSend, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      setFancyBarState({
        visible: true,
        type: fancyType.success,
        msg: "Produk berhasil ditambahkan.",
      });

      _cleaningForm();
      setIsLoading(false);
    } catch (error) {
      setFancyBarState({
        visible: true,
        type: fancyType.failed,
        msg: `Produk gagal ditambahkan`,
      });
      console.log("Editing, _addProduct(),", error);
      setIsLoading(false);
    }
  };

  const _deleteProduct = async () => {
    setisDeleteLoading(true);
    const dataSend = {
      barcode: detail?.barcode,
    };
    try {
      // const {
      //   data: { isSuccess },
      // } = await axios.post(`${api.product.deleteProduct}`, dataSend);
      const { isSuccess } = await mockApi(true);
      setisDeleteLoading(false);
      if (isSuccess) {
        setFancyBarState({
          visible: true,
          type: fancyType.success,
          msg: "Produk berhasil dihapus.",
        });
        _cleaningForm();
        return;
      }
      setFancyBarState({
        visible: true,
        type: fancyType.failed,
        msg: "Produk gagal dihapus.",
      });
    } catch (error) {
      setFancyBarState({
        visible: true,
        type: fancyType.failed,
        msg: "Produk gagal dihapus.",
      });
      console.log("Editing, _deleteProduct(), ", error);
      setisDeleteLoading(false);
    }
  };

  const _updateProduct = async () => {
    setIsLoading(true);
    const { barcode, product_name, price, id } = dataForm;
    const dataSend = new FormData();
    dataSend.append("id", id);
    dataSend.append("barcode", barcode);
    dataSend.append("product_name", product_name);
    dataSend.append("price", price);
    if (imgFile.hasOwnProperty("type"))
      dataSend.append("product_image", imgFile);
    try {
      await axios.post(`${api.product.updateProduct}`, dataSend, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      setFancyBarState({
        visible: true,
        type: fancyType.success,
        msg: "Produk berhasil diperbarui.",
      });
      _cleaningForm();
      setIsLoading(false);
    } catch (error) {
      setFancyBarState({
        visible: true,
        type: fancyType.failed,
        msg: "Produk gagal diperbarui.",
      });
      console.log("Editing, _updateProduct(),", error);
      setIsLoading(false);
    }
  };

  const _onPressDelete = () => {
    setVisible(false);
    _deleteProduct();
  };

  const _checkingParams = () => {
    if (detail) {
      setDataForm({
        barcode: detail.barcode,
        product_name: detail.product_name,
        price: detail.price,
        id: detail._id,
      });
      setImgFile({ uri: detail.product_image });
    }
  };

  const _onPressCamera = () =>
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
    );

  const _onPressLibrary = () =>
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
    );

  const staticSwitch: StaticTypeProps = {
    ImagePicker: {
      leftLabel: "Kamera",
      mainTitle: "Ambil Foto Produk",
      rightLabel: "Galeri",
      subTitle: "Ambil foto dari kamera maupun galeri.",
      onPressLeft: _onPressCamera,
      onPressRight: _onPressLibrary,
    },
    deleting: {
      leftLabel: str.cancel,
      mainTitle: `Menghapus produk`,
      rightLabel: str.delete,
      subTitle: `Apakah anda yakin ingin menghapus ${detail?.product_name}?`,
      onPressLeft: () => setVisible(false),
      onPressRight: () => _onPressDelete(),
    },
  };

  const _editing = () => {
    isEditing ? _updateProduct() : _addProduct();
  };

  useEffect(() => {
    _checkingParams();
  }, []);

  return (
    <AppCanvas {...{ fancyBarState, setFancyBarState }}>
      <ImgField
        onPress={() => {
          setVisible(true);
          setStaticType("ImagePicker");
        }}
        uri={imgFile.uri}
      />
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
          onPress={() => _editing()}
          isLoading={isLoading}
        >
          {str.save}
        </TouchableText>
        <Gap vertical={sp.xxxm} />
        {isEditing && (
          <TouchableText
            buttonStyle={{ height: 50 }}
            type="positiveLabel"
            onPress={() => {
              setVisible(true);
              setStaticType("deleting");
            }}
            isLoading={isDeleteLoading}
            backgroundColor={cp.red1}
            bordered={true}
          >
            {str.delete}
          </TouchableText>
        )}
      </FormContainer>
      <StaticBottomSheet
        {...{
          setVisible,
          visible,
          ...staticSwitch[staticType],
        }}
      />
    </AppCanvas>
  );
};

export default Editing;
