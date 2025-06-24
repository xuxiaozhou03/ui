import type { ExtractPropTypes, PropType } from "vue";

export const cellGroupProps = {
  title: String,
  border: {
    type: Boolean,
    default: true,
  },
  inset: Boolean,
};

export type CellGroupProps = ExtractPropTypes<typeof cellGroupProps>;
