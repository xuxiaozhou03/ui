import type { ExtractPropTypes } from "vue";

export const swipeCellProps = {
  disabled: {
    type: Boolean,
    default: false,
  },
  leftWidth: {
    type: Number,
    default: 0,
  },
  rightWidth: {
    type: Number,
    default: 0,
  },
  asyncClose: {
    type: Boolean,
    default: false,
  },
  name: {
    type: [String, Number],
    default: "",
  },
};

export type SwipeCellProps = ExtractPropTypes<typeof swipeCellProps>;
