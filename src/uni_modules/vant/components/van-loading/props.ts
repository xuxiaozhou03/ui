import { commonProps } from "../../utils";
import type { PropType, ExtractPropTypes } from "vue";

export type LoadingType = "circular" | "spinner";

export const loadingProps = {
  ...commonProps,
  color: String,
  vertical: Boolean,
  type: { type: String as PropType<LoadingType>, default: "circular" },
  size: String,
  textSize: String,
};

export type LoadingProps = ExtractPropTypes<typeof loadingProps>;
