import type { ExtractPropTypes, PropType } from "vue";
import { commonProps } from "../../utils";

export const skeletonProps = {
  ...commonProps,
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
    type: [Array, String] as PropType<string[] | string>,
    default: () => "100%",
  },
  avatarClass: String,
  titleClass: String,
  rowClass: String,
};

export type SkeletonProps = ExtractPropTypes<typeof skeletonProps>;
