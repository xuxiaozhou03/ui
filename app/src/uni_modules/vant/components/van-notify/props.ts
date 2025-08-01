import type { ExtractPropTypes } from "vue";

export const notifyProps = {
  message: String,
  background: String,
  type: {
    type: String,
    default: "danger",
  },
  color: {
    type: String,
    default: "#fff",
  },
  duration: {
    type: Number,
    default: 3000,
  },
  zIndex: {
    type: Number,
    default: 110,
  },
  safeAreaInsetTop: {
    type: Boolean,
    default: false,
  },
  top: {
    type: [Number, String],
    default: 0,
  },
};

export type NotifyProps = ExtractPropTypes<typeof notifyProps>;
