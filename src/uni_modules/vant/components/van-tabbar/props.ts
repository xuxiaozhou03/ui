import type { ExtractPropTypes } from "vue";

export const tabbarProps = {
  active: null,
  activeColor: String,
  inactiveColor: String,
  fixed: {
    type: Boolean,
    default: true,
  },
  placeholder: Boolean,
  border: {
    type: Boolean,
    default: true,
  },
  zIndex: {
    type: Number,
    default: 1,
  },
  safeAreaInsetBottom: {
    type: Boolean,
    default: true,
  },
};

export type TabbarProps = ExtractPropTypes<typeof tabbarProps>;
