import type { ExtractPropTypes } from "vue";
import { commonProps } from "../../utils";
import { transitionProps } from "../van-transition/props";

export const overlayProps = {
  ...commonProps,
  show: transitionProps.show,
  duration: transitionProps.duration,
  zIndex: {
    type: Number,
    default: 1,
  },
  lockScroll: {
    type: Boolean,
    default: true,
  },
};

export type OverlayProps = ExtractPropTypes<typeof overlayProps>;
