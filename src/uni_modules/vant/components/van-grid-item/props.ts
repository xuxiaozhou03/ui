import type { ExtractPropTypes, PropType } from "vue";

export const gridItemProps = {
  icon: String,
  iconColor: String,
  iconPrefix: {
    type: String,
    default: "van-icon",
  },
  dot: Boolean,
  info: [String, Number],
  badge: [String, Number],
  text: String,
  useSlot: Boolean,
};

export type GridItemProps = ExtractPropTypes<typeof gridItemProps>;
