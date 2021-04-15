import React, { FC, memo } from "react";
import {
  Alert,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { DummyProduct } from "../../../assets";
import { colorsPalette as cp, spacing as sp } from "../../constants";
import { TextItem } from "../atom";

const { width, height } = Dimensions.get("screen");

const tileWidth = width * 0.44;
const tileHeight = width * 0.65;

interface ItemProps {
  product_image: string;
  price: number;
  product_name: string;
}

interface ProductTileProps {
  type?: string;
  item: ItemProps;
  setter: any;
}

const ProductTile: FC<ProductTileProps> = ({
  item: { product_image, price, product_name },
  setter,
}) => {
  const s = styles();
  return (
    <TouchableOpacity
      style={s.container}
      onPress={() => setter({ product_image, price, product_name })}
      activeOpacity={0.6}
    >
      <View style={s.image}>
        {product_image ? (
          <Image
            source={{ uri: product_image }}
            resizeMode="cover"
            style={s.imageSource}
          />
        ) : (
          <Image
            source={DummyProduct}
            resizeMode="cover"
            style={s.imageSource}
          />
        )}
      </View>
      <View style={s.info}>
        <View style={s.nameStyle}>
          <TextItem numberOfLines={2} type="productName">
            {product_name}
          </TextItem>
        </View>

        <TextItem numberOfLines={1} isNumber={true} type="productPrice">
          {price}
        </TextItem>
      </View>
    </TouchableOpacity>
  );
};

const styles = () =>
  StyleSheet.create({
    nameStyle: { flex: 1 },
    imageSource: { width: "100%", height: "100%" },
    info: {
      paddingHorizontal: sp.xxs,
      paddingBottom: sp.xxs,
      justifyContent: "space-between",
      flex: 1,
    },
    image: {
      height: "65%",
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
      overflow: "hidden",
    },
    container: {
      width: tileWidth,
      height: tileHeight,
      backgroundColor: cp.white,
      borderRadius: 8,
      marginBottom: sp.xxxm,
    },
  });

export default memo(ProductTile);
