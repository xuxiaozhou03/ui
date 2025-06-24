import type { ExtractPropTypes, PropType } from "vue";

export type CheckboxShape = "round" | "square";
export type CheckboxLabelPosition = "left" | "right";

export const checkboxProps = {
  modelValue: Boolean,
  disabled: Boolean,
  useIconSlot: Boolean,
  checkedColor: String,
  labelPosition: {
    type: String as PropType<CheckboxLabelPosition>,
    default: "right",
  },
  labelDisabled: Boolean,
  shape: {
    type: String as PropType<CheckboxShape>,
    default: "round",
  },
  iconSize: {
    type: [String, Number],
    default: 20,
  },
};

export type CheckboxProps = ExtractPropTypes<typeof checkboxProps>;
