import type { ExtractPropTypes, PropType } from "vue";

export const stepsProps = {
  icon: String,
  steps: Array as PropType<any[]>,
  active: Number,
  direction: {
    type: String,
    default: "horizontal",
  },
  activeColor: String,
  inactiveColor: String,
};

export type StepsProps = ExtractPropTypes<typeof stepsProps>;
