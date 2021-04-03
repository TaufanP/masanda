import { useCallback } from "react";

const myCallback = (fn:()=>void, depends = []) => {
  const result = useCallback(() => {
    fn();
  }, depends);
  return result;
};

export default myCallback;
