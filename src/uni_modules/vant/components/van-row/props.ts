import type { ExtractPropTypes } from "vue";

export const rowProps = {
  gutter: Number,
};

export type RowProps = ExtractPropTypes<typeof rowProps>;
