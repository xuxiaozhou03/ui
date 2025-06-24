import type { ExtractPropTypes } from "vue";

export const switchProps = {
  checked: {
    type: [Boolean, String, Number],
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  activeColor: {
    type: String,
    default: "",
  },
  inactiveColor: {
    type: String,
    default: "",
  },
  size: {
    type: String,
    default: "30",
  },
  activeValue: {
    type: [Boolean, String, Number],
    default: true,
  },
  inactiveValue: {
    type: [Boolean, String, Number],
    default: false,
  },
};

export type SwitchProps = ExtractPropTypes<typeof switchProps>;
