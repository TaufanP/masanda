import React, { FC, memo, useEffect } from "react";
import { Animated, Dimensions, StyleSheet, Text } from "react-native";
import { colorsPalette as cp, spacing as sp } from "../../constants";
import { TouchableText } from "../molecules";

const { width, height } = Dimensions.get("screen");

const fancyButtonFormula = width * 0.18;
const fancyButtonWidth = fancyButtonFormula < 50 ? 50 : fancyButtonFormula;

interface FancyBarProps {
  fancyBarState: boolean;
  setFancyBarState: any;
}

interface StyleProps {
  bottomContainer: any;
}

const FancyBar: FC<FancyBarProps> = ({ fancyBarState, setFancyBarState }) => {
  const bottomContainer = new Animated.Value(0);

  const onCalled = () => {
    if (fancyBarState) {
      Animated.sequence([
        Animated.timing(bottomContainer, {
          toValue: -74,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(bottomContainer, {
          delay: 2000,
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => setFancyBarState(false));
      return;
    }
  };
  const s: { [key: string]: any } = styles({ bottomContainer });

  useEffect(() => {
    onCalled();
  }, [fancyBarState]);

  return (
    <Animated.View style={s.container}>
      <Text style={s.fancyMsg}>Berhasil memperbarui produk.</Text>
      <TouchableText
        bg={false}
        type="bold14"
        isAuto={false}
        width={fancyButtonWidth}
        height="100%"
        isCenter={true}
        onPress={() => setFancyBarState(false)}
      >
        OK
      </TouchableText>
    </Animated.View>
  );
};

const styles = ({ bottomContainer }: StyleProps) =>
  StyleSheet.create({
    fancyButton: {
      borderWidth: 1,
      borderColor: "red",
      height: "100%",
    },
    fancyMsg: { fontWeight: "bold", color: "#FFF", paddingLeft: sp.xxxm },
    container: {
      width: width - 32,
      left: 16,
      height: 50,
      bottom: -50,
      position: "absolute",
      backgroundColor: cp.green1,
      borderRadius: 8,
      transform: [{ translateY: bottomContainer }],
      justifyContent: "space-between",
      alignItems: "center",
      flexDirection: "row",
    },
  });

export default memo(FancyBar);
