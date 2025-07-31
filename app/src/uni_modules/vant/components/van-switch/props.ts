import type { ExtractPropTypes } from "vue";
import { commonProps } from "../../utils";

export const switchProps = {
  checked: { type: null, default: false },
  loading: Boolean,
  disabled: Boolean,
  activeColor: String,
  inactiveColor: String,
  size: { type: [String, Number], default: "30" },
  activeValue: { type: null, default: true },
  inactiveValue: { type: null, default: false },
  customClass: commonProps.customClass,
  nodeClass: commonProps.customClass,
};

export type SwitchProps = ExtractPropTypes<typeof switchProps>;
