import type { ExtractPropTypes, PropType } from "vue";
import { commonProps } from "../../utils";

export const skeletonProps = {
  row: {
    type: Number,
    default: 0,
  },
  title: {
    type: Boolean,
  },
  avatar: {
    type: Boolean,
  },
  loading: {
    type: Boolean,
    default: true,
  },
  animate: {
    type: Boolean,
    default: true,
  },
  customClass: commonProps.customClass,
  avatarClass: commonProps.customClass,
  titleClass: commonProps.customClass,
  rowClass: commonProps.customClass,
  avatarSize: {
    type: [String, Number],
    default: "32px",
  },
  avatarShape: {
    type: String as PropType<"round" | "square">,
    default: "round",
  },
  titleWidth: {
    type: String,
    default: "40%",
  },
  rowWidth: {
    type: [String, Array] as PropType<string | string[]>,
    default: "100%",
  },
};

export type SkeletonProps = ExtractPropTypes<typeof skeletonProps>;
