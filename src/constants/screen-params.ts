import { MainProduct } from "./types";

type StackParamsList = {
  EDITING: {
    detail: MainProduct | undefined;
    isEditing: boolean | undefined;
  };
  SCANNER: {
    products: MainProduct[];
  };
};

export default StackParamsList;
