import type { ExtractPropTypes, PropType } from "vue";

export const skeletonProps = {
  row: {
    type: Number,
    default: 0,
  },
  title: Boolean,
  avatar: Boolean,
  loading: {
    type: Boolean,
    default: true,
  },
  animate: {
    type: Boolean,
    default: true,
  },
  avatarSize: {
    type: String,
    default: "32px",
  },
  avatarShape: {
    type: String,
    default: "round",
  },
  titleWidth: {
    type: String,
    default: "40%",
  },
  rowWidth: {
    type: [Array, String],
    default: () => "100%",
  },
};

export type SkeletonProps = ExtractPropTypes<typeof skeletonProps>;
