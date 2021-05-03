import React, { FC, ReactNode, useEffect, useRef } from "react";
import {
  Alert,
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { EmptyIcon } from "../../../assets";
import {
  colorsPalette as cp,
  fontFamily as ff,
  spacing as sp,
  textSize as ts,
} from "../../constants";
import { TouchableText } from "../molecules";

const { width, height } = Dimensions.get("screen");
const { alert } = Alert;

interface StaticBottomSheetProps {
  onPressLeft?: any;
  onPressRight?: any;
  onPress?: any;
  visible: boolean;
  action?: boolean;
  leftLabel?: string;
  rightLabel?: string;
  mainLabel?: string;
  mainTitle?: string;
  subTitle?: string;
  setVisible?: Function;
  mainIcon?: ReactNode;
}

const StaticBottomSheet: FC<StaticBottomSheetProps> = ({
  onPressLeft = () => alert("tets"),
  onPressRight = () => alert("tets"),
  onPress = () => alert("tets"),
  visible = false,
  leftLabel = "Yes",
  rightLabel = "No",
  mainLabel = "Continue",
  mainTitle = "Change your mind?",
  subTitle = "Go ahead, we will help you to clear your current cart, is it okay?",
  action = false,
  setVisible = (e: boolean) => alert("test"),
  mainIcon = <EmptyIcon width={168} height={168} />,
}) => {
  const s = styles();

  const fadeAnim = useRef(new Animated.Value(height)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        useNativeDriver: false,
        duration: 400,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        useNativeDriver: false,
        duration: 200,
      }),
    ]).start();
  };

  const fadeOut = () => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 0,
        useNativeDriver: false,
        duration: 100,
      }),
      Animated.timing(fadeAnim, {
        toValue: height,
        useNativeDriver: false,
        duration: 400,
      }),
    ]).start();
  };

  useEffect(() => {
    if (visible) {
      fadeIn();
    } else {
      fadeOut();
    }
  }, [visible]);

  return (
    <Animated.View
      style={[s.emptyCont, { transform: [{ translateY: fadeAnim }] }]}
    >
      <Animated.View style={[s.blackBackground, { opacity }]}>
        <TouchableOpacity
          onPress={() => setVisible(false)}
          activeOpacity={1}
          style={s.touchArea}
        />
      </Animated.View>
      <View style={s.contentCont}>
        <View style={s.imageGroup}>
          {mainIcon}
          <Text style={s.titleText}>{mainTitle}</Text>
          <Text style={{ textAlign: "center", color: cp.text1 }}>
            {subTitle}
          </Text>
        </View>
        <View style={s.buttonsCont}>
          {action ? (
            <TouchableText onPress={onPress}>{mainLabel}</TouchableText>
          ) : (
            <>
              <View style={[s.buttonCont, s.leftButton]}>
                <TouchableText
                  onPress={onPressLeft}
                  buttonType="100"
                  type="positiveLabel"
                >
                  {leftLabel}
                </TouchableText>
              </View>
              <View style={[s.buttonCont, s.rightButton]}>
                <TouchableText
                  onPress={onPressRight}
                  buttonType="100"
                  bg={false}
                  buttonStyle={{ borderWidth: 1, borderColor: cp.purple1 }}
                  type="negativeLabel"
                >
                  {rightLabel}
                </TouchableText>
              </View>
            </>
          )}
        </View>
      </View>
    </Animated.View>
  );
};

const styles = () =>
  StyleSheet.create({
    touchArea: { width: "100%", height: "100%" },
    blackBackground: {
      width,
      height,
      backgroundColor: "#0008",
      position: "absolute",
    },
    bgScreen: { width, height, backgroundColor: "#000" },
    buttonsCont: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: sp.xxxm,
    },
    buttonText: {
      fontFamily: ff.quicksandBold,
      fontSize: ts.xxm,
      textAlign: "center",
    },
    rightButton: {
      marginLeft: sp.xxs,
    },
    leftButton: {
      borderColor: cp.purple2,
      marginRight: sp.xxs,
    },
    buttonCont: { flex: 1, height: 50 },
    titleText: {
      color: cp.text1,
      fontFamily: ff.quicksandBold,
      fontSize: ts.s,
      marginBottom: sp.xxs,
    },
    imageGroup: {
      alignItems: "center",
      paddingHorizontal: sp.xxxm,
      marginBottom: 32,
    },
    closeCont: {
      elevation: 1,
      width: 24,
      height: 24,
      backgroundColor: cp.white0,
      borderRadius: 24,
      marginBottom: sp.xxs,
      justifyContent: "center",
      alignItems: "center",
    },
    contentCont: {
      width,
      backgroundColor: cp.white,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      paddingTop: sp.xxxm,
      paddingHorizontal: sp.xxxm,
      paddingBottom: sp.xm,
    },
    emptyCont: {
      width,
      height,
      position: "absolute",
      justifyContent: "flex-end",
      bottom: 0,
    },
  });

export default StaticBottomSheet;
