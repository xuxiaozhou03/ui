import type { ExtractPropTypes } from "vue";

export const radioGroupProps = {
  value: null,
  direction: String,
  disabled: Boolean,
};

export type RadioGroupProps = ExtractPropTypes<typeof radioGroupProps>;
