import type { ExtractPropTypes } from "vue";

export const toastProps = {
  show: Boolean,
  mask: Boolean,
  message: String,
  forbidClick: Boolean,
  zIndex: {
    type: Number,
    default: 1000,
  },
  type: {
    type: String,
    default: "text",
  },
  loadingType: {
    type: String,
    default: "circular",
  },
  position: {
    type: String,
    default: "middle",
  },
};

export type ToastProps = ExtractPropTypes<typeof toastProps>;
