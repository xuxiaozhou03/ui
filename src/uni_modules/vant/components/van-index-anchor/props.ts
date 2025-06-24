import type { ExtractPropTypes } from "vue";

export const indexAnchorProps = {
  useSlot: Boolean,
  index: [String, Number],
};

export type IndexAnchorProps = ExtractPropTypes<typeof indexAnchorProps>;
