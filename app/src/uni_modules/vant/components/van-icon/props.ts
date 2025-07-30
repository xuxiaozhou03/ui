import type { ExtractPropTypes } from "vue";
import { commonProps } from "../../utils";
import { infoProps } from "../van-info/props";

export const iconProps = {
  ...commonProps,
  ...infoProps,
  size: { type: String },
  color: { type: String },
  classPrefix: { type: String, default: "van-icon" },
  name: { type: String, required: true },
  infoClass: { type: String },
};
export type IconProps = ExtractPropTypes<typeof iconProps>;
