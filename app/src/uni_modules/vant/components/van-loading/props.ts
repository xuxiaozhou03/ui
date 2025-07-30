import type { ExtractPropTypes } from "vue";
import { commonProps } from "../../utils";

export const loadingProps = {
  color: { type: String },
  vertical: { type: Boolean, default: false },
  type: { type: String as () => "circular" | "spinner", default: "circular" },
  size: { type: String },
  textSize: { type: String },
  customClass: commonProps.customClass,
};

export type LoadingProps = ExtractPropTypes<typeof loadingProps>;
