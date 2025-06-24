import type { ExtractPropTypes, PropType } from "vue";

export const popupProps = {
  round: Boolean,
  closeable: Boolean,
  customStyle: String,
  overlayStyle: String,
  transition: String,
  zIndex: {
    type: Number,
    default: 100,
  },
  overlay: {
    type: Boolean,
    default: true,
  },
  closeIcon: {
    type: String,
    default: "cross",
  },
  closeIconPosition: {
    type: String,
    default: "top-right",
  },
  closeOnClickOverlay: {
    type: Boolean,
    default: true,
  },
  position: {
    type: String,
    default: "center",
  },
  safeAreaInsetBottom: {
    type: Boolean,
    default: true,
  },
  show: Boolean,
  duration: [Number, String],
  lockScroll: Boolean,
  rootPortal: Boolean,
};

export type PopupProps = ExtractPropTypes<typeof popupProps>;
