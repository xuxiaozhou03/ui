import { commonProps } from "../../utils";

export const stepperProps = {
  modelValue: [Number, String],
  integer: Boolean,
  disabled: Boolean,
  inputWidth: String,
  buttonSize: String,
  asyncChange: Boolean,
  disableInput: Boolean,
  decimalLength: Number,
  min: {
    type: [Number, String],
    default: 1,
  },
  max: {
    type: [Number, String],
    default: Number.MAX_SAFE_INTEGER,
  },
  step: {
    type: [Number, String],
    default: 1,
  },
  showPlus: {
    type: Boolean,
    default: true,
  },
  showMinus: {
    type: Boolean,
    default: true,
  },
  disablePlus: Boolean,
  disableMinus: Boolean,
  longPress: {
    type: Boolean,
    default: true,
  },
  theme: String,
  alwaysEmbed: Boolean,
  customClass: commonProps.customClass,
  minusClass: commonProps.customClass,
  plusClass: commonProps.customClass,
  inputClass: commonProps.customClass,
};
