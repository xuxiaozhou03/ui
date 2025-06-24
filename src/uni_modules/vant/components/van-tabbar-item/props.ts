import type { ExtractPropTypes } from "vue";

export const tabbarItemProps = {
  info: null,
  name: null,
  icon: String,
  dot: Boolean,
  url: {
    type: String,
    default: "",
  },
  linkType: {
    type: String,
    default: "redirectTo",
  },
  iconPrefix: {
    type: String,
    default: "van-icon",
  },
};

export type TabbarItemProps = ExtractPropTypes<typeof tabbarItemProps>;
