import type { ExtractPropTypes } from "vue";

export const transitionProps = {
  // 仅保留必要属性，具体可根据 mixins/transition 细化
};

export type TransitionProps = ExtractPropTypes<typeof transitionProps>;
