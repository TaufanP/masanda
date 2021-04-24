interface FancyTypes {
  visible: boolean;
  type: string;
  msg: string;
}

const fancyType = {
  success: "success",
  warning: "warning",
  failed: "failed",
};

const defaultState = {
  visible: false,
  type: fancyType.success,
  msg: "Put your message here",
};

export type { FancyTypes };

export default { defaultState, fancyType };
