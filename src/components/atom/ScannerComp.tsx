import React, { FC, PropsWithChildren, memo, useState } from "react";
import { Dimensions, View, StyleSheet } from "react-native";
import { colorsPalette as cp } from "../../constants";
import { BarCodeScanner } from "expo-barcode-scanner";
const { width, height } = Dimensions.get("screen");

interface ScannerProps {
  result: any;
  setIsUse?: any;
}

interface StyleProps {}

const ScannerComp: FC<PropsWithChildren<ScannerProps>> = ({
  result,
  setIsUse,
}) => {
  const [scanned, setScanned] = useState<boolean>(false);
  const s = styles();
  const handleBarCodeScanned = ({ type, data }: any) => {
    if (!scanned) {
      result({ type, data, scanned: true });
    }
    setScanned(true);
  };
  return (
    <View style={s.container}>
      <View style={s.scanCamera}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
        <View style={s.guider} />
      </View>
    </View>
  );
};

const styles = () =>
  StyleSheet.create({
    container: {
      width,
      height,
      justifyContent: "center",
      alignItems: "center",
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
      height: "80%",
      top: -width * 0.05,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: cp.red1,
    },
  });

export default memo(ScannerComp);
