import type { ExtractPropTypes } from "vue";
import { commonProps } from "../../utils";
import { iconProps } from "../van-icon/props";

export const gridItemProps = {
  icon: iconProps.name,
  iconColor: iconProps.color,
  iconPrefix: iconProps.classPrefix,
  dot: iconProps.dot,
  info: iconProps.info,

  text: String,
  disabled: Boolean,
  square: Boolean,
  customClass: commonProps.customClass,
  contentClass: commonProps.customClass,
  iconClass: commonProps.customClass,
  textClass: commonProps.customClass,

  badge: null,
  useSlot: Boolean,
};

export type GridItemProps = ExtractPropTypes<typeof gridItemProps>;
