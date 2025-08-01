import type { ExtractPropTypes } from "vue";
import { commonProps } from "../../utils";

export const rateProps = {
  customClass: commonProps.customClass,
  modelValue: {
    type: Number,
    default: 0,
  },
  readonly: Boolean,
  disabled: Boolean,
  allowHalf: Boolean,
  size: {
    type: [Number, String],
    default: 20,
  },
  icon: {
    type: String,
    default: "star",
  },
  voidIcon: {
    type: String,
    default: "star-o",
  },
  color: {
    type: String,
    default: "#ee0a24",
  },
  voidColor: {
    type: String,
    default: "#c8c9cc",
  },
  disabledColor: {
    type: String,
    default: "#c8c9cc",
  },
  count: {
    type: Number,
    default: 5,
  },
  gutter: {
    type: [Number, String],
    default: 4,
  },
  touchable: {
    type: Boolean,
    default: true,
  },
  iconClass: commonProps.customClass,
};

export type RateProps = ExtractPropTypes<typeof rateProps>;
