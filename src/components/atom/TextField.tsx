import React, { FC, ReactNode, useState } from "react";
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
import { Scan } from "../../../assets";
import {
  colorsPalette as cp,
  fontFamily as ff,
  spacing as sp,
} from "../../constants";

interface TextFieldProps {
  isError?: boolean;
  style?: any;
  setter?: any;
  isRow?: boolean;
  useGap?: boolean;
  optKey?: string;
  ref?: any;
  isExtra?: boolean;
  extraAction?: any;
  extraComp?: ReactNode;
}

const TextField: FC<TextFieldProps & TextInputProps> = ({
  isError = false,
  secureTextEntry,
  style,
  setter = (e: string) => console.log(e),
  isRow = false,
  useGap = true,
  optKey = "none",
  ref,
  isExtra = false,
  extraComp = <Scan width={24} height={24} fill={cp.purple2} />,
  extraAction = () => console.log("extraAction"),
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(secureTextEntry);
  return (
    <View
      style={[
        isError ? styles.formErr : styles.form,
        style,
        {
          flex: isRow ? 1 : 0,
          marginBottom: useGap ? sp.xxxm : 0,
          paddingRight: isExtra ? 0 : sp.xxxm,
        },
      ]}
    >
      <TextInput
        style={isError ? styles.textInputErr : styles.textInput}
        {...props}
        onChangeText={(e) => setter(e, optKey)}
        secureTextEntry={isVisible}
        placeholderTextColor={cp.text2}
        ref={ref}
      />
      {isExtra && (
        <TouchableOpacity style={styles.extraAction} onPress={extraAction}>
          {extraComp}
        </TouchableOpacity>
      )}
      {/* {secureTextEntry && (
        <IconEye
          fill={isVisible ? colors.gray1 : colors.blue1}
          width={20}
          onPress={() => setIsVisible(!isVisible)}
        />
      )} */}
    </View>
  );
};

const globalStyle = StyleSheet.create({
  formStyle: {
    borderWidth: 1,
    backgroundColor: cp.white1,
    borderRadius: 8,
    paddingLeft: sp.xxxm,
    flexDirection: "row",
    height: 40,
  },
  textInputStyle: {
    fontFamily: ff.quicksand,
    color: cp.text1,
    flex: 1,
    width: 40,
  },
});

const styles = StyleSheet.create({
  // here
  extraAction: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: sp.xxxm,
  },
  form: { ...globalStyle.formStyle, borderColor: cp.white1 },
  formErr: { ...globalStyle.formStyle, borderColor: cp.red1 },
  textInput: { ...globalStyle.textInputStyle, color: cp.text1 },
  textInputErr: { ...globalStyle.textInputStyle, color: cp.text1 },
});

export default TextField;
