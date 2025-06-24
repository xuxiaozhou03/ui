import type { ExtractPropTypes, PropType } from "vue";

export const tabsProps = {
  sticky: {
    type: Boolean,
    default: false,
  },
  border: {
    type: Boolean,
    default: false,
  },
  swipeable: {
    type: Boolean,
    default: false,
  },
  titleActiveColor: {
    type: String,
    default: "",
  },
  titleInactiveColor: {
    type: String,
    default: "",
  },
  color: {
    type: String,
    default: "",
  },
  animated: {
    type: Boolean,
    default: false,
  },
  lineWidth: {
    type: [Number, String],
    default: 40,
  },
  lineHeight: {
    type: [Number, String],
    default: -1,
  },
  active: {
    type: [Number, String],
    default: 0,
  },
  type: {
    type: String,
    default: "line",
  },
  ellipsis: {
    type: Boolean,
    default: true,
  },
  duration: {
    type: Number,
    default: 0.3,
  },
  zIndex: {
    type: Number,
    default: 1,
  },
  swipeThreshold: {
    type: Number,
    default: 5,
  },
  offsetTop: {
    type: Number,
    default: 0,
  },
  lazyRender: {
    type: Boolean,
    default: true,
  },
  useBeforeChange: {
    type: Boolean,
    default: false,
  },
};

export type TabsProps = ExtractPropTypes<typeof tabsProps>;
