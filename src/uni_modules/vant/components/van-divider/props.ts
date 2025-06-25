import { commonProps } from "../../utils";
import type { PropType, ExtractPropTypes } from "vue";

export const dividerProps = {
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

  fontSize: [String, Number],
  borderColor: String,
  textColor: String,
};

export type DividerProps = ExtractPropTypes<typeof dividerProps>;
