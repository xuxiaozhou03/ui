import type { ExtractPropTypes } from "vue";

export const colProps = {
  span: Number,
  offset: Number,
};

export type ColProps = ExtractPropTypes<typeof colProps>;
