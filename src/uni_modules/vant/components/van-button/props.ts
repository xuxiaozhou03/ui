import {
  type CommonButtonEmits,
  commonButtonProps,
} from "../../composables/useButton";
import { commonProps } from "../../utils";
import type { PropType, ExtractPropTypes } from "vue";

export type ButtonType = "default" | "primary" | "info" | "warning" | "danger";
export type ButtonSize = "large" | "normal" | "small" | "mini";
export type LoadingType = "circular" | "spinner";

export const buttonProps = {
  ...commonProps,
  ...commonButtonProps,
  formType: String,
  icon: String,
  classPrefix: { type: String, default: "van-icon" },
  plain: Boolean,
  block: Boolean,
  round: Boolean,
  square: Boolean,
  loading: Boolean,
  hairline: Boolean,
  disabled: Boolean,
  loadingText: String,
  loadingType: { type: String as PropType<LoadingType>, default: "circular" },
  type: { type: String as PropType<ButtonType>, default: "default" },
  dataset: null as any,
  size: { type: String as PropType<ButtonSize>, default: "normal" },
  loadingSize: { type: String, default: "20px" },
  color: String,
};

export type ButtonProps = ExtractPropTypes<typeof buttonProps>;
export type ButtonEmits = CommonButtonEmits & {
  (e: "click", event: MouseEvent): void;
};
