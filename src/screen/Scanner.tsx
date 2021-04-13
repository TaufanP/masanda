import { BarCodeScanner } from "expo-barcode-scanner";
import React, { FC, useState } from "react";
import { Alert, StyleSheet, TouchableOpacity } from "react-native";
import { AppCanvas } from "../components";

const Scanner: FC = () => {
  const [scanned, setScanned] = useState(false);
  const { alert } = Alert;

  const handleBarCodeScanned = ({ type, data }: any) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  return (
    <AppCanvas>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <TouchableOpacity
          style={{ width: "100%", height: 50, backgroundColor: "blue" }}
          onPress={() => setScanned(false)}
        />
      )}
    </AppCanvas>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  cameraIcon: {
    margin: 5,
    height: 40,
    width: 40,
  },
  bottomOverlay: {
    position: "absolute",
    width: "100%",
    flex: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default Scanner;
