import React, { FC, memo, useEffect } from "react";
import { Animated, Dimensions, StyleSheet, Text } from "react-native";
import { TextItem } from ".";
import {
  colorsPalette as cp,
  spacing as sp,
  fancyState as fan,
} from "../../constants";
import { FancyTypes } from "../../constants/fancy-states";
import { TouchableText } from "../molecules";

const { width, height } = Dimensions.get("screen");
const { fancyType, defaultState } = fan;

const fancyButtonFormula = width * 0.18;
const fancyButtonWidth = fancyButtonFormula < 50 ? 50 : fancyButtonFormula;

interface FancyBarProps {
  fancyBarState?: FancyTypes;
  setFancyBarState?: any;
}

interface StyleProps {
  bottomContainer: any;
  state: string;
}

const FancyBar: FC<FancyBarProps> = ({
  fancyBarState = defaultState,
  setFancyBarState,
}) => {
  const bottomContainer = new Animated.Value(0);

  const onCalled = () => {
    if (fancyBarState.visible) {
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
      ]).start(() => setFancyBarState(defaultState));
      return;
    }
  };
  const s: { [key: string]: any } = styles({
    bottomContainer,
    state: fancyBarState.type,
  });

  useEffect(() => {
    onCalled();
  }, [fancyBarState]);

  return (
    <Animated.View style={s.container}>
      <TextItem type="semibold14" style={{ paddingLeft: sp.xxxm }}>
        {fancyBarState.msg}
      </TextItem>
      <TouchableText
        bg={false}
        type="bold14"
        isAuto={false}
        width={fancyButtonWidth}
        height="100%"
        isCenter={true}
        onPress={() => setFancyBarState(false)}
        isRound={true}
      >
        OK
      </TouchableText>
    </Animated.View>
  );
};

const styles = ({ bottomContainer, state }: StyleProps) =>
  StyleSheet.create({
    fancyButton: {
      borderWidth: 1,
      borderColor: "red",
      height: "100%",
    },
    container: {
      width: width - 32,
      left: 16,
      height: 50,
      bottom: -50,
      position: "absolute",
      backgroundColor:
        state == fancyType.success
          ? cp.green1
          : state == fancyType.warning
          ? "yellow"
          : cp.red1,
      borderRadius: 8,
      transform: [{ translateY: bottomContainer }],
      justifyContent: "space-between",
      alignItems: "center",
      flexDirection: "row",
    },
  });

export default memo(FancyBar);
