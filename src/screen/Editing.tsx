import { CompositeNavigationProp, useRoute } from "@react-navigation/core";
import { RouteProp } from "@react-navigation/native";
import React, { FC, ReactNode, useCallback, useEffect, useState } from "react";
import {
  Dimensions,
  Keyboard,
  StyleSheet,
  View,
  BackHandler,
} from "react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import {
  AppCanvas,
  FormContainer,
  Gap,
  ImgField,
  ScannerComp,
  StaticBottomSheet,
  TextField,
  TouchableText,
} from "../components";
import { requestCameraPermission } from "../config";
import {
  colorsPalette as cp,
  fancyState as fan,
  spacing as sp,
  strings as str,
} from "../constants";
import { FancyTypes } from "../constants/fancy-states";
import StackParamsList from "../constants/screen-params";
import {
  createProductApi,
  deleteProductApi,
  updateProductApi,
} from "../service";

const { width, height } = Dimensions.get("screen");
interface EditingProps {
  navigation?: CompositeNavigationProp<any, any>;
}

interface StyleProps {}
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

const Editing: FC<EditingProps> = ({ navigation }) => {
  const { defaultState, fancyType } = fan;
  const [fancyBarState, setFancyBarState] = useState<FancyTypes>(defaultState);
  const route = useRoute<RouteProp<StackParamsList, "EDITING">>();
  const detail = route?.params?.detail;
  const [isEditing, setIsEditing] = useState<boolean>(
    route?.params?.isEditing || false
  );
  const [isScanning, setIsScanning] = useState<boolean>(false);
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

  const s = styles();

  const onPressImageField = useCallback(() => {
    Keyboard.dismiss();
    setVisible(true);
    setStaticType("ImagePicker");
  }, []);

  const processScanned = ({ data }: any) => {
    setDataForm((current) => {
      return { ...current, barcode: data };
    });
  };

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
    if (imgFile.uri !== "") dataSend.append("product_image", imgFile);

    try {
      await createProductApi({
        dataSend,
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
    try {
      const { isSuccess } = await deleteProductApi({
        barcode: detail?.barcode,
      });
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
      await updateProductApi({ dataSend });
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

  const _onPressCamera = async () => {
    const isGranted = await requestCameraPermission();
    if (isGranted)
      launchCamera(
        {
          mediaType: "photo",
        },
        (response) => {
          setVisible(false);
          if (!response.didCancel) {
            setImgFile({
              name: response.fileName,
              type: response.type,
              uri: response.uri,
            });
          }
        }
      );
  };

  const _onPressLibrary = () =>
    launchImageLibrary(
      {
        mediaType: "photo",
      },
      (response) => {
        setVisible(false);
        if (!response.didCancel) {
          setImgFile({
            name: response.fileName,
            type: response.type,
            uri: response.uri,
          });
        }
      }
    );

  const _editing = () => {
    Keyboard.dismiss();
    isEditing ? _updateProduct() : _addProduct();
  };

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

  useEffect(() => {
    _checkingParams();
  }, []);

  useEffect(() => {
    const backAction = () => {
      if (isScanning) {
        setIsScanning(false);
        return true;
      }
      navigation?.goBack();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  });

  return (
    <AppCanvas {...{ fancyBarState, setFancyBarState }}>
      <ImgField onPress={onPressImageField} uri={imgFile.uri} />
      <FormContainer vertical={48}>
        <TextField
          placeholder={str.barcodePlaceholder}
          keyboardType="numeric"
          setter={_setter}
          optKey="barcode"
          maxLength={15}
          defaultValue={dataForm.barcode.toString()}
          isExtra={true}
          extraAction={() => {
            Keyboard.dismiss();
            setIsScanning(true);
          }}
        />
        <TextField
          placeholder={str.productName}
          setter={_setter}
          optKey="product_name"
          maxLength={150}
          defaultValue={dataForm.product_name.toString()}
        />
        <TextField
          placeholder={str.productPrice}
          keyboardType="numeric"
          setter={_setter}
          optKey="price"
          defaultValue={dataForm.price.toString()}
          maxLength={8}
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
      {isScanning && (
        <View style={s.scannerCont}>
          <ScannerComp
            result={(e: any) => {
              processScanned(e);
              setIsScanning(false);
            }}
          />
        </View>
      )}
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

const styles = () =>
  StyleSheet.create({
    scannerCont: {
      position: "absolute",
      width,
      height,
    },
  });

export default Editing;
