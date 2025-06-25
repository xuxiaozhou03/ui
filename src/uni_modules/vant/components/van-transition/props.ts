import type { ExtractPropTypes } from "vue";
import { commonProps } from "../../utils";

export const baseTransitionProps = {
  ...commonProps,
  show: {
    type: Boolean,
    default: false,
  },
  duration: {
    type: [Number, Object],
    default: 300,
  },
  name: {
    type: String,
    default: "fade",
  },
};

export type TransitionProps = ExtractPropTypes<typeof baseTransitionProps>;

export const transitionProps = {
  ...baseTransitionProps,
  enterClass: String,
  enterActiveClass: String,
  enterToClass: String,
  leaveClass: String,
  leaveActiveClass: String,
  leaveToClass: String,
};
