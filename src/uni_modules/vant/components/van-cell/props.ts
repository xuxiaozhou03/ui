import { commonProps } from "../../utils";
import type { PropType, ExtractPropTypes } from "vue";

export type CellSize = "large" | "normal";

export const cellProps = {
  ...commonProps,
  icon: String,
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
  titleStyle: [String, Object, Array],
  titleClass: [String, Object, Array],
  valueClass: [String, Object, Array],
  labelClass: [String, Object, Array],
  url: String,
  to: [String, Object],
  replace: Boolean,
  openType: String,
  linkType: { type: String, default: "navigateTo" },
  appParameter: String,
  useLabelSlot: Boolean,
  useIconSlot: Boolean,
  useRightIconSlot: Boolean,
  clickableClass: [String, Object, Array],
};

export type CellProps = ExtractPropTypes<typeof cellProps>;
