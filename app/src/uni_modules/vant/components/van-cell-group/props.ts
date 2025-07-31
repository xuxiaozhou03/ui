import type { ExtractPropTypes } from "vue";
import { commonProps } from "../../utils";

export const cellGroupProps = {
  title: String,
  border: { type: Boolean, default: true },
  inset: Boolean,
  customClass: commonProps.customClass,
};
export type CellGroupProps = ExtractPropTypes<typeof cellGroupProps>;
