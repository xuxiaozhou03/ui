import type { ExtractPropTypes } from "vue";

export const collapseItemProps = {
  size: String,
  name: [String, Number],
  title: [String, Number],
  value: [String, Number],
  icon: String,
  label: String,
  disabled: Boolean,
  clickable: Boolean,
  border: {
    type: Boolean,
    default: true,
  },
  isLink: {
    type: Boolean,
    default: true,
  },
};

export type CollapseItemProps = ExtractPropTypes<typeof collapseItemProps>;
