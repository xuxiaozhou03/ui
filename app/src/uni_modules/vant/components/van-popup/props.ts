import type { ExtractPropTypes } from "vue";
import { commonProps } from "../../utils";

export const popupProps = {
  ...commonProps,
  show: Boolean,
  round: Boolean,
  closeable: Boolean,
  overlayStyle: commonProps.customStyle,
  transition: { type: String, default: "center" },
  zIndex: { type: Number, default: 100 },
  overlay: { type: Boolean, default: true },
  closeIcon: { type: String, default: "cross" },
  closeIconPosition: {
    type: String as () =>
      | "top-left"
      | "top-right"
      | "bottom-left"
      | "bottom-right",
    default: "top-right",
  },
  closeOnClickOverlay: { type: Boolean, default: true },
  position: {
    type: String as () => "center" | "top" | "bottom" | "left" | "right",
    default: "center",
  },
  safeAreaInsetBottom: { type: Boolean, default: true },
  safeAreaInsetTop: { type: Boolean, default: false },
  safeAreaTabBar: { type: Boolean, default: false },
  lockScroll: { type: Boolean, default: true },
  duration: { type: Number, default: 300 },
  closeIconClass: commonProps.customClass,
};

export type PopupProps = ExtractPropTypes<typeof popupProps>;
