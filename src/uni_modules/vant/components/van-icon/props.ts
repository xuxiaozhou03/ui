import type { ExtractPropTypes } from "vue";

export const iconProps = {
  dot: Boolean,
  info: [String, Number],
  size: [String, Number],
  color: String,
  customStyle: String,
  classPrefix: {
    type: String,
    default: "van-icon",
  },
  name: String,
};

export type IconProps = ExtractPropTypes<typeof iconProps>;
