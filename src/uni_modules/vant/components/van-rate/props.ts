import type { ExtractPropTypes, PropType } from "vue";
import { commonProps } from "../../utils";

export const rateProps = {
  ...commonProps,
  value: Number,
  readonly: Boolean,
  disabled: Boolean,
  allowHalf: Boolean,
  size: [Number, String],
  icon: {
    type: String,
    default: "star",
  },
  voidIcon: {
    type: String,
    default: "star-o",
  },
  color: String,
  voidColor: String,
  disabledColor: String,
  count: {
    type: Number,
    default: 5,
  },
  gutter: [Number, String],
};

export type RateProps = ExtractPropTypes<typeof rateProps>;
