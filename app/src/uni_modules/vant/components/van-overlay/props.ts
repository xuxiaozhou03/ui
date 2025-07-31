import type { ExtractPropTypes } from "vue";
import { commonProps } from "../../utils";

export const overlayProps = {
  ...commonProps,
  show: Boolean,
  duration: {
    type: [Number, Object],
    default: 300,
  },
  zIndex: {
    type: Number,
    default: 1,
  },
  lockScroll: {
    type: Boolean,
    default: true,
  },
  rootPortal: {
    type: Boolean,
    default: false,
  },
};

export type OverlayProps = ExtractPropTypes<typeof overlayProps>;
