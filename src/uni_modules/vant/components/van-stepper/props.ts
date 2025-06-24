import type { ExtractPropTypes, PropType } from "vue";

export const stepperProps = {
  value: null,
  integer: Boolean,
  disabled: Boolean,
  inputWidth: String,
  // ...可根据实际补充更多属性
};

export type StepperProps = ExtractPropTypes<typeof stepperProps>;
