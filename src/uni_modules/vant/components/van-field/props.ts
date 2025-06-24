import type { ExtractPropTypes, PropType } from "vue";

export type FieldType =
  | "text"
  | "number"
  | "idcard"
  | "digit"
  | "textarea"
  | "password";

export const fieldProps = {
  modelValue: [String, Number],
  label: String,
  icon: String,
  leftIcon: String,
  rightIcon: String,
  size: String,
  center: Boolean,
  border: {
    type: Boolean,
    default: true,
  },
  isLink: Boolean,
  required: Boolean,
  clickable: Boolean,
  titleWidth: String,
  customStyle: String,
  arrowDirection: String,
  inputAlign: String,
  error: Boolean,
  errorMessage: String,
  errorMessageAlign: String,
  maxlength: Number,
  showWordLimit: Boolean,
  clearable: Boolean,
  clearIcon: {
    type: String,
    default: "clear",
  },
  disabled: Boolean,
  readonly: Boolean,
  name: String,
  type: {
    type: String as PropType<FieldType>,
    default: "text",
  },
  placeholder: String,
  autosize: [Boolean, Object],
  formatter: Function as PropType<(val: string) => string>,
  formatTrigger: String,
  inputClass: [String, Object, Array],
  inputStyle: [String, Object, Array],
  autofocus: Boolean,
  confirmType: String,
  showClear: Boolean,
};

export type FieldProps = ExtractPropTypes<typeof fieldProps>;
