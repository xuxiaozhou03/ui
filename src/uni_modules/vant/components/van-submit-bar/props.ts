import type { ExtractPropTypes, PropType } from "vue";

export const submitBarProps = {
  tip: {
    type: [String, Number],
    default: "",
  },
  tipIcon: {
    type: String,
    default: "",
  },
  type: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    default: undefined,
  },
  label: {
    type: String,
    default: "",
  },
  loading: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  buttonText: {
    type: String,
    default: "",
  },
  currency: {
    type: String,
    default: "¥",
  },
  buttonType: {
    type: String,
    default: "danger",
  },
  decimalLength: {
    type: Number,
    default: 2,
  },
  suffixLabel: {
    type: String,
    default: "",
  },
  safeAreaInsetBottom: {
    type: Boolean,
    default: true,
  },
};

export type SubmitBarProps = ExtractPropTypes<typeof submitBarProps>;
