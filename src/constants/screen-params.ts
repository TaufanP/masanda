import { MainProduct } from "./types";

type StackParamsList = {
  EDITING: {
    detail: MainProduct | undefined;
    isEditing: boolean | undefined;
  };
};

export default StackParamsList;
