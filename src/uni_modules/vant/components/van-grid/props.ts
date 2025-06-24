import type { ExtractPropTypes } from "vue";

export const gridProps = {
  square: Boolean,
  gutter: {
    type: [Number, String],
    default: 0,
  },
  clickable: Boolean,
  columnNum: {
    type: Number,
    default: 4,
  },
  center: {
    type: Boolean,
    default: true,
  },
  border: {
    type: Boolean,
    default: true,
  },
  direction: String,
  iconSize: String,
  reverse: {
    type: Boolean,
    default: false,
  },
};

export type GridProps = ExtractPropTypes<typeof gridProps>;
