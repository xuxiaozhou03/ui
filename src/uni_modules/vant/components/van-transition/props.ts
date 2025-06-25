import type { ExtractPropTypes } from "vue";
import { commonProps } from "../../utils";

export const transitionProps = {
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
  enterClass: String,
  enterActiveClass: String,
  enterToClass: String,
  leaveClass: String,
  leaveActiveClass: String,
  leaveToClass: String,
};

export type TransitionProps = ExtractPropTypes<typeof transitionProps>;
