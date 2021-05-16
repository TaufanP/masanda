import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import {
  CompositeNavigationProp,
  RouteProp,
  useRoute,
} from "@react-navigation/core";
import { BarCodeScanner } from "expo-barcode-scanner";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { Dimensions, StyleSheet, View, PermissionsAndroid } from "react-native";
import {
  AppCanvas,
  DetailSheet,
  OverlayArea,
  StaticBottomSheet,
  TouchableText,
} from "../components";
import {
  colorsPalette as cp,
  routesName as r,
  strings as str,
} from "../constants";
import StackParamsList from "../constants/screen-params";
import { MainProduct } from "../constants/types";
import { myCallback, myMemo } from "../hooks";
import { requestCameraPermission } from "../config";

const { width, height } = Dimensions.get("screen");

interface ScannerProps {
  navigation?: CompositeNavigationProp<any, any>;
}

const Scanner: FC<ScannerProps> = ({ navigation }) => {
  const route = useRoute<RouteProp<StackParamsList, "SCANNER">>();
  const { products } = route.params;

  const [scanned, setScanned] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [isSheet, setIsSheet] = useState<boolean>(false);
  const [detail, setDetail] = useState<MainProduct>({
    product_name: "",
    image_name: "",
    price: 0,
    _id: "",
    barcode: "",
    product_image: "",
  });
  const [scannedCode, setScannedCode] = useState<string>("");

  const s = styles;
  const sheetRef = useRef<BottomSheet>(null);

  const snapPoints = myMemo(["0%", "60%", "100%"]);

  const bottomSheet = myCallback(() => handleSnapPress(1));

  const handleSheetChange = useCallback((index) => {
    if (index == 0) {
      setIsSheet(false);
    }
  }, []);

  const handleSnapPress = useCallback((index) => {
    setIsSheet(true);
    sheetRef.current?.snapTo(index);
  }, []);

  const handleClosePress = useCallback(() => {
    setIsSheet(false);
    sheetRef.current?.close();
  }, []);

  const onPressRightStatic = useCallback(() => {
    setScanned(false);
    setVisible(false);
  }, []);

  const onPressLeftStatic = useCallback(() => {
    setVisible(false);
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
    setScannedCode("");
  }, [scannedCode]);

  const onPressLeft = useCallback(() => {
    handleClosePress();
    navigation?.navigate(r.EDITING, { detail, isEditing: true });
  }, [detail]);

  const handleBarCodeScanned = ({ type, data }: any) => {
    setScanned(true);
    try {
      const detailProduct =
        products[products.findIndex((item) => item.barcode == data)];
      if (detailProduct == undefined) {
        setScannedCode(data);
        throw `Produk dengan barcode ${data} tidak ditemukan`;
      }
      setDetail(detailProduct);
      bottomSheet();
    } catch (error) {
      console.log(error);
      setVisible(true);
    }
  };

  useEffect(() => {
    requestCameraPermission();
  }, []);

  return (
    <>
      <AppCanvas>
        {scanned ? (
          <View style={s.scanAgain}>
            {!visible && (
              <TouchableText
                onPress={() => setScanned(false)}
                type="bold24White"
              >
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
            leftLabel: str.adding,
            rightLabel: str.rescan,
            mainTitle: `Produk ${scannedCode} tidak ditemukan.`,
            subTitle: str.addToStore,
            onPressRight: onPressRightStatic,
            onPressLeft: onPressLeftStatic,
          }}
        />
      </AppCanvas>
      {isSheet && <OverlayArea onPress={handleClosePress} />}
      <BottomSheet
        ref={sheetRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChange}
      >
        <BottomSheetView style={s.contentContainer}>
          <DetailSheet
            {...{
              onPressRight: handleClosePress,
              detail,
              onPressLeft,
            }}
          />
        </BottomSheetView>
      </BottomSheet>
    </>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: cp.white,
  },
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
