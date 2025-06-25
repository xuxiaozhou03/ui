import type { ExtractPropTypes, PropType } from "vue";
import { commonProps } from "../../utils";

export type ImageFit =
  | "none"
  | "fill"
  | "cover"
  | "contain"
  | "widthFix"
  | "heightFix";

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
    type: String as PropType<ImageFit>,
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
};

export type ImageProps = ExtractPropTypes<typeof imageProps>;
