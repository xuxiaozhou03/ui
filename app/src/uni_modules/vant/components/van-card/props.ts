import type { ExtractPropTypes, PropType } from "vue";
import { commonProps, presetProps } from "../../utils";

export const cardProps = {
  tag: String,
  num: [String, Number],
  desc: String,
  thumb: String,
  title: String,
  price: [String, Number],
  centered: Boolean,
  lazyLoad: Boolean,
  thumbLink: String,
  originPrice: [String, Number],
  thumbMode: {
    type: String as PropType<"aspectFit" | "aspectFill">,
    default: "aspectFit",
  },
  currency: { type: String, default: "¥" },
  titleClass: commonProps.customClass,
  descClass: commonProps.customClass,
  thumbClass: commonProps.customClass,
  priceClass: commonProps.customClass,
  originPriceClass: commonProps.customClass,
  numClass: commonProps.customClass,
  url: presetProps.url,
  linkType: presetProps.linkType,
};

export type CardProps = ExtractPropTypes<typeof cardProps>;
