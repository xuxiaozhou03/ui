import type { ExtractPropTypes, PropType } from "vue";
import { commonProps } from "../../utils";

export const FIT_MODE_MAP = {
  none: "none",
  fill: "fill",
  cover: "cover",
  contain: "contain",
  widthFix: "cover",
  heightFix: "cover",
  "scale-down": "scale-down",
} as const;

export const imageProps = {
  ...commonProps,
  src: String,
  round: Boolean,
  width: [String, Number],
  height: [String, Number],
  radius: [String, Number],
  lazyLoad: Boolean,
  useErrorSlot: Boolean,
  useLoadingSlot: Boolean,
  showMenuByLongpress: Boolean,
  fit: {
    type: String as PropType<keyof typeof FIT_MODE_MAP>,
    default: "fill",
  },
  webp: {
    type: Boolean,
    default: false,
  },
  showError: {
    type: Boolean,
    default: true,
  },
  showLoading: {
    type: Boolean,
    default: true,
  },
  loadingClass: String,
  errorClass: String,
  imageClass: String,
};

export type ImageProps = ExtractPropTypes<typeof imageProps>;
