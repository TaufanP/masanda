import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("screen");

const tileWidthHome = width * 0.44;
const tileHeightHome = width * 0.65;

const skeletonLayout: any = {
  home: [
    {
      key: "item1",
      width: tileWidthHome,
      height: tileHeightHome,
      left: 16,
      marginTop: 24,
    },
    {
      key: "item2",
      width: tileWidthHome,
      height: tileHeightHome,
      right: 16,
      position: "absolute",
      marginTop: 24,
    },
  ],
};

export default skeletonLayout;
