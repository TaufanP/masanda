import { CompositeNavigationProp } from "@react-navigation/core";
import React, { FC, useEffect } from "react";
import { StatusBar, View, Text, StyleSheet } from "react-native";
// import { TouchableOpacity } from "react-native-gesture-handler";

import { routesName as r, colorsPalette as cp } from "../constants";

interface SplashProps {
  navigation: CompositeNavigationProp<any, any>;
}

const Splash: FC<SplashProps> = ({ navigation }) => {
  const s = styles();
  const changeScreen = () => {
    setTimeout(() => {
      return navigation.replace(r.HOME);
    }, 1000);
  };

  useEffect(() => {
    changeScreen();
  }, []);

  return (
    <View style={s.container}>
      <StatusBar backgroundColor={cp.purple1} />
      <View>
        <Text style={s.tokoText}>Toko</Text>
        <Text style={s.masandaText}>Masanda</Text>
      </View>
    </View>
  );
};

const styles = () =>
  StyleSheet.create({
    masandaText: {
      color: "#FFF",
      fontSize: 56,
      fontFamily: "Quicksand-Bold",
      textTransform: "uppercase",
      top: -16,
    },
    tokoText: { color: "#FFF", fontSize: 32 },
    container: {
      backgroundColor: cp.purple1,
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
  });

export default Splash;
