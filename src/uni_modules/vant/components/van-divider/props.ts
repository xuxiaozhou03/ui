import type { ExtractPropTypes } from "vue";

export const dividerProps = {
  dashed: Boolean,
  hairline: Boolean,
  contentPosition: String,
  fontSize: String,
  borderColor: String,
  textColor: String,
  customStyle: String,
};

export type DividerProps = ExtractPropTypes<typeof dividerProps>;
