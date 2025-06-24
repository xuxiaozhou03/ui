import type { ExtractPropTypes } from "vue";

export const sidebarItemProps = {
  dot: Boolean,
  badge: null,
  info: null,
  title: String,
  disabled: Boolean,
};

export type SidebarItemProps = ExtractPropTypes<typeof sidebarItemProps>;
