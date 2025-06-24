import { commonProps } from "../../utils";
import type { PropType, ExtractPropTypes } from "vue";

export const cardProps = {
  ...commonProps,
  tag: String,
  num: String,
  desc: String,
  thumb: String,
  title: String,
  price: String,
  centered: Boolean,
  lazyLoad: Boolean,
  thumbLink: String,
  originPrice: String,
  thumbMode: { type: String, default: "aspectFit" },
  currency: { type: String, default: "¥" },
};

export type CardProps = ExtractPropTypes<typeof cardProps>;
