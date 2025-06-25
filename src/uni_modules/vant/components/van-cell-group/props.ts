import type { ExtractPropTypes, PropType } from "vue";
import { commonProps } from "../../utils";

export const cellGroupProps = {
  ...commonProps,
  title: String,
  border: {
    type: Boolean,
    default: true,
  },
  inset: Boolean,
};

export type CellGroupProps = ExtractPropTypes<typeof cellGroupProps>;
