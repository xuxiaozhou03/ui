import type { ExtractPropTypes, PropType } from "vue";

export const overlayProps = {
  show: Boolean,
  customStyle: String,
  duration: {
    type: [Number, String],
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
