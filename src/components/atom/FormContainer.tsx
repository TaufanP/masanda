import React, { FC, PropsWithChildren, memo } from "react";
import { View, StyleSheet } from "react-native";
import { spacing as sp } from "../../constants";
import { Gap } from "../../components";

interface FormProps {
  vertical?: number;
  horizontal?: number;
}

const FormContainer: FC<PropsWithChildren<FormProps>> = ({
  children,
  vertical,
}) => {
  const s = styles();
  return (
    <Gap vertical={vertical} only="top">
      <View style={s.container}>{children}</View>
    </Gap>
  );
};

const styles = () =>
  StyleSheet.create({
    container: {
      width: "100%",
      paddingHorizontal: sp.xxxm,
    },
  });

export default memo(FormContainer);
