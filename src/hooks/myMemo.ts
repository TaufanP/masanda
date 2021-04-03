import { useMemo } from "react";

const myMemo = (value: any, depends = [], fromFn = false) => {
  if (fromFn) {
    const result = useMemo(() => value(), depends);
    return result;
  }
  const result = useMemo(() => {
    return value;
  }, depends);
  return result;
};

export default myMemo;
