import type { ExtractPropTypes, PropType } from "vue";

export const indexBarProps = {
  sticky: {
    type: Boolean,
    default: true,
  },
  zIndex: {
    type: Number,
    default: 1,
  },
  highlightColor: {
    type: String,
    default: "#07c160", // GREEN
  },
  stickyOffsetTop: {
    type: Number,
    default: 0,
  },
  indexList: {
    type: Array as PropType<string[]>,
    default: () => {
      const list: string[] = [];
      const charCodeOfA = "A".charCodeAt(0);
      for (let i = 0; i < 26; i++) {
        list.push(String.fromCharCode(charCodeOfA + i));
      }
      return list;
    },
  },
};

export type IndexBarProps = ExtractPropTypes<typeof indexBarProps>;
