import { commonProps } from "../../utils";

export const cellProps = {
  ...commonProps,
  title: null,
  value: null,
  icon: String,
  size: String,
  label: String,
  center: Boolean,
  isLink: Boolean,
  required: Boolean,
  clickable: Boolean,
  titleWidth: String,
  arrowDirection: String,
  useLabelSlot: Boolean,
  border: { type: Boolean, default: true },
  titleStyle: commonProps.customStyle,
  titleClass: commonProps.customClass,
  labelClass: commonProps.customClass,
  valueClass: commonProps.customClass,
  rightIconClass: commonProps.customClass,
  hoverClass: commonProps.customClass,
};
