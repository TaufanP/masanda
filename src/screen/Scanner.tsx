import {
  CompositeNavigationProp,
  RouteProp,
  useRoute,
} from "@react-navigation/core";
import { BarCodeScanner } from "expo-barcode-scanner";
import React, { FC, useState } from "react";
import { Alert, Dimensions, StyleSheet, View } from "react-native";
import { AppCanvas, StaticBottomSheet, TouchableText } from "../components";
import { routesName as r } from "../constants";
import StackParamsList from "../constants/screen-params";

const { width, height } = Dimensions.get("screen");

interface ScannerProps {
  navigation?: CompositeNavigationProp<any, any>;
}

const Scanner: FC<ScannerProps> = ({ navigation }) => {
  const route = useRoute<RouteProp<StackParamsList, "SCANNER">>();
  const { products } = route.params;
  const [scanned, setScanned] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [scannedCode, setScannedCode] = useState<string>("");
  const { alert } = Alert;
  const s = styles;
  const handleBarCodeScanned = ({ type, data }: any) => {
    setScanned(true);
    try {
      const detailProduct =
        products[products.findIndex((item) => item.barcode == data)];
      if (detailProduct == undefined) {
        setScannedCode(data);
        throw "Produk tidak ditemukan";
      }
      alert(`Produk ditemukan : ${detailProduct.product_name}`);
      console.log(detailProduct);
    } catch (error) {
      console.log(error);
      setVisible(true);
    }
  };

  return (
    <AppCanvas>
      {scanned ? (
        <View style={s.scanAgain}>
          {!visible && (
            <TouchableText onPress={() => setScanned(false)} type="bold24White">
              SCAN ULANG
            </TouchableText>
          )}
        </View>
      ) : (
        <View style={s.scanCamera}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
          <View style={s.guider} />
        </View>
      )}
      <StaticBottomSheet
        {...{
          visible,
          setVisible,
          leftLabel: "TAMBAH",
          rightLabel: "SCAN ULANG",
          mainTitle: "Produk tidak ditemukan",
          subTitle: `Tambahkan produk ke toko?`,
          onPressRight: () => {
            setScanned(false);
            setVisible(false);
          },
          onPressLeft: () => {
            setVisible(false);
            setScannedCode("");
            navigation?.navigate(r.EDITING, {
              isEditing: false,
              detail: {
                _id: "",
                barcode: scannedCode,
                price: "",
                product_name: "",
                product_image: "",
                image_name: "",
              },
            });
          },
        }}
      />
    </AppCanvas>
  );
};

const styles = StyleSheet.create({
  guider: {
    position: "absolute",
    width: width * 0.8,
    height: width * 0.8,
    borderWidth: 5,
    borderColor: "#FFF",
    borderStyle: "dashed",
    borderRadius: 8,
  },
  scanCamera: {
    width,
    height: height * 0.8,
    marginTop: height * 0.07,
    justifyContent: "center",
    alignItems: "center",
  },
  scanAgain: {
    width,
    height: height * 0.8,
    marginTop: height * 0.1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Scanner;
