import type { ExtractPropTypes } from "vue";
import { infoProps } from "../van-info/props";
import { commonProps } from "../../utils";

export const iconProps = {
  ...commonProps,
  dot: infoProps.dot,
  info: infoProps.info,
  size: [String, Number],
  color: String,
  classPrefix: {
    type: String,
    default: "van-icon",
  },
  name: String,
  infoClass: commonProps.customClass,
};

export type IconProps = ExtractPropTypes<typeof iconProps>;
