import type { ExtractPropTypes, PropType } from "vue";

export const progressProps = {
  inactive: Boolean,
  percentage: Number,
  pivotText: String,
  pivotColor: String,
  trackColor: String,
  showPivot: {
    type: Boolean,
    default: true,
  },
  color: String,
  textColor: {
    type: String,
    default: "#fff",
  },
  strokeWidth: {
    type: [Number, String],
    default: 4,
  },
};

export type ProgressProps = ExtractPropTypes<typeof progressProps>;
