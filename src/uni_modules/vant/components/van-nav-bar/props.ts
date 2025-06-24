import type { ExtractPropTypes, PropType } from "vue";

export const navBarProps = {
  title: String,
  fixed: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: Boolean,
    default: false,
  },
  leftText: String,
  rightText: String,
  customStyle: String,
  leftArrow: Boolean,
  border: {
    type: Boolean,
    default: true,
  },
  zIndex: {
    type: Number,
    default: 1,
  },
  safeAreaInsetTop: {
    type: Boolean,
    default: true,
  },
};

export type NavBarProps = ExtractPropTypes<typeof navBarProps>;
