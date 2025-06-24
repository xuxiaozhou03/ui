import type { ExtractPropTypes, PropType } from "vue";

export const searchProps = {
  value: {
    type: String,
    default: "",
  },
  label: String,
  focus: Boolean,
  error: Boolean,
  disabled: Boolean,
  readonly: Boolean,
  inputAlign: String,
  showAction: Boolean,
  useActionSlot: Boolean,
  useLeftIconSlot: Boolean,
  useRightIconSlot: Boolean,
  leftIcon: String,
  rightIcon: String,
  clearable: Boolean,
  clearTrigger: String,
  clearIcon: String,
  maxlength: Number,
  inputClass: String,
  placeholder: String,
  placeholderStyle: String,
  cursorSpacing: Number,
  background: String,
  actionText: String,
};

export type SearchProps = ExtractPropTypes<typeof searchProps>;
