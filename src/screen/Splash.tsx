import { CompositeNavigationProp } from "@react-navigation/core";
import React, { FC, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
// import { TouchableOpacity } from "react-native-gesture-handler";

import { routesName as r } from "../constants";

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
      backgroundColor: "purple",
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
  });

export default Splash;
