import type { ExtractPropTypes, PropType } from "vue";

export type CheckboxGroupDirection = "horizontal" | "vertical";

export const checkboxGroupProps = {
  max: Number,
  modelValue: Array as PropType<any[]>,
  disabled: Boolean,
  direction: {
    type: String as PropType<CheckboxGroupDirection>,
    default: "vertical",
  },
};

export type CheckboxGroupProps = ExtractPropTypes<typeof checkboxGroupProps>;
