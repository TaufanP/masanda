import React, { FC, useState } from "react";
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";
import {
  colorsPalette as cp,
  fontFamily as ff,
  spacing as sp,
} from "../../constants";

interface TextFieldProps {
  isError?: boolean;
}

const TextField: FC<TextFieldProps & TextInputProps> = (props) => {
  const { isError = false, secureTextEntry } = props;
  const [isVisible, setIsVisible] = useState(secureTextEntry);
  return (
    <View style={isError ? styles.formErr : styles.form}>
      <TextInput
        style={isError ? styles.textInputErr : styles.textInput}
        {...props}
        secureTextEntry={isVisible}
        placeholderTextColor={cp.text2}
      />
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
    paddingHorizontal: sp.xxxm,
    flex: 1,
    flexDirection: "row",
  },
  textInputStyle: {
    fontFamily: ff.quicksand,
    color: cp.text1,
    flex: 1,
    width: 40,
    height: 40,
  },
});

const styles = StyleSheet.create({
  // here
  form: { ...globalStyle.formStyle, borderColor: cp.white1 },
  formErr: { ...globalStyle.formStyle, borderColor: cp.red1 },
  textInput: { ...globalStyle.textInputStyle, color: cp.text1 },
  textInputErr: { ...globalStyle.textInputStyle, color: cp.text1 },
});

export default TextField;
