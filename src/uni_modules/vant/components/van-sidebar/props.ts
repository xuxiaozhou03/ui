import type { ExtractPropTypes } from "vue";

export const sidebarProps = {
  activeKey: {
    type: Number,
    default: 0,
  },
};

export type SidebarProps = ExtractPropTypes<typeof sidebarProps>;
