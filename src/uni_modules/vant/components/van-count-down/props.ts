import type { ExtractPropTypes } from "vue";

export const countDownProps = {
  useSlot: Boolean,
  millisecond: Boolean,
  time: Number,
  format: {
    type: String,
    default: "HH:mm:ss",
  },
  autoStart: {
    type: Boolean,
    default: true,
  },
};

export type CountDownProps = ExtractPropTypes<typeof countDownProps>;
