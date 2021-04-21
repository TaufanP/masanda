import React, { FC, memo, PropsWithChildren } from "react";
import {
  Dimensions,
  StyleSheet,
  TouchableOpacityProps,
  View,
} from "react-native";
import { EmptyIcon, Plus } from "../../../assets";
import { spacing as sp, strings as str } from "../../constants";
import { Gap, TextItem, Touchable } from "../atom";
const { width, height } = Dimensions.get("screen");

interface EmptyStateProps {
  touchableProps?: TouchableOpacityProps;
  buttonStyle?: Object;
  size?: number;
  onPress: () => void;
  title?: string;
  subtitle?: string;
  buttonText?: string;
  addIcon?: any;
  withIcon?: boolean;
}

const EmptyState: FC<PropsWithChildren<EmptyStateProps>> = ({
  onPress,
  subtitle = str.addingNow,
  title = str.notAddingYet,
  buttonText = str.adding,
  addIcon = <Plus />,
  withIcon = true,
}) => {
  const s = styles();
  return (
    <View style={s.container}>
      <EmptyIcon width={168} height={168} />
      <TextItem type="semiHeaderC">{title}</TextItem>
      <TextItem type="defaultC">{subtitle}</TextItem>
      <Gap vertical={sp.xxxm} />
      <Touchable vertical={sp.s} horizontal={sp.xxxm} onPress={onPress}>
        <View style={s.rowCont}>
          <TextItem type="defaultW">{buttonText}</TextItem>

          {withIcon && (
            <>
              <Gap horizontal={sp.s} />
              {addIcon}
            </>
          )}
        </View>
      </Touchable>
    </View>
  );
};

const styles = () =>
  StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
      width,
      height: height / 1.5,
      paddingHorizontal: width * 0.1,
    },
    rowCont: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
  });

export default memo(EmptyState);
