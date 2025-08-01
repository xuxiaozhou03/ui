import type { ExtractPropTypes, PropType } from "vue";
import { commonProps } from "../../utils";

const GREEN = "#07c160";
const GRAY_DARK = "#969799";

export const stepsProps = {
  ...commonProps,
  icon: String,
  steps: {
    type: Array as PropType<
      {
        text?: string;
        desc?: string;
        inactiveIcon?: string;
        activeIcon?: string;
      }[]
    >,
    default: () => [],
  },
  active: {
    type: Number,
    default: 0,
  },
  direction: {
    type: String,
    default: "horizontal",
  },
  activeColor: {
    type: String,
    default: GREEN,
  },
  inactiveColor: {
    type: String,
    default: GRAY_DARK,
  },
  activeIcon: {
    type: String,
    default: "checked",
  },
  inactiveIcon: String,
  descClass: commonProps.customClass,
};

export type StepsProps = ExtractPropTypes<typeof stepsProps>;
