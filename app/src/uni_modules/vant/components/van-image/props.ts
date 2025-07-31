import type { ExtractPropTypes, PropType } from "vue";

export const imageProps = {
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
    type: String as PropType<
      | "contain"
      | "cover"
      | "fill"
      | "none"
      | "scale-down"
      | "widthFix"
      | "heightFix"
    >,
    default: "fill",
  },
  webp: { type: Boolean },
  showError: { type: Boolean, default: true },
  showLoading: { type: Boolean, default: true },
  customClass: { type: String },
  loadingClass: { type: String },
  errorClass: { type: String },
  imageClass: { type: String },
};

export type ImageProps = ExtractPropTypes<typeof imageProps>;
