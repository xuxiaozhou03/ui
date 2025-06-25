import { commonProps, presetProps } from "../../utils";
import type { PropType, ExtractPropTypes } from "vue";
import { iconProps } from "../van-icon/props";

export type CellSize = "large" | "normal";

export const cellProps = {
  ...commonProps,
  icon: iconProps.name,
  size: String as PropType<CellSize>,
  title: [String, Number],
  value: [String, Number],
  label: String,
  center: Boolean,
  isLink: Boolean,
  required: Boolean,
  clickable: Boolean,
  arrowDirection: String as PropType<"up" | "down" | "left" | "right">,
  border: { type: Boolean, default: true },
  titleStyle: commonProps.customStyle,
  titleWidth: [String, Number],
  titleClass: commonProps.customClass,
  valueClass: commonProps.customClass,
  labelClass: commonProps.customClass,
  url: presetProps.url,
  linkType: presetProps.linkType,
  useLabelSlot: Boolean,
  useIconSlot: Boolean,
  useRightIconSlot: Boolean,
};

export type CellProps = ExtractPropTypes<typeof cellProps>;
