import { commonProps } from "../../utils";
import type { PropType, ExtractPropTypes } from "vue";

export const vanDividerProps = {
  ...commonProps,
  dashed: Boolean,
  hairline: {
    type: Boolean,
    default: true,
  },
  contentPosition: {
    type: String as PropType<"left" | "center" | "right">,
    default: "center",
  },
  customStyle: String,
};

export type VanDividerProps = ExtractPropTypes<typeof vanDividerProps>;
