import type { ExtractPropTypes, PropType } from "vue";

export const treeSelectProps = {
  items: Array,
  activeId: null,
  mainActiveIndex: {
    type: Number,
    default: 0,
  },
  height: {
    type: [Number, String],
    default: 300,
  },
  max: {
    type: Number,
    default: Infinity,
  },
  selectedIcon: String,
};

export type TreeSelectProps = ExtractPropTypes<typeof treeSelectProps>;
