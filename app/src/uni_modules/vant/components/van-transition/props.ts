import type { ExtractPropTypes } from "vue";
import { commonProps } from "../../utils";

const commonTransitionProps = {
  customStyle: commonProps.customStyle,
  show: {
    type: Boolean,
    value: false,
  },
  duration: {
    type: null,
    value: 300,
  },
  name: {
    type: String,
    value: "fade",
  },
};

export const transitionProps = {
  ...commonProps,
  ...commonTransitionProps,
  inited: Boolean,
  currentDuration: {
    type: Number,
    default: 300,
  },
  display: {
    type: Boolean,
    default: true,
  },
  enterClass: commonProps.customClass,
  enterActiveClass: commonProps.customClass,
  enterToClass: commonProps.customClass,
  leaveClass: commonProps.customClass,
  leaveActiveClass: commonProps.customClass,
  leaveToClass: commonProps.customClass,
};

export type TransitionProps = ExtractPropTypes<typeof transitionProps>;
