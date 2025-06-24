import type { ExtractPropTypes } from "vue";

export const emptyProps = {
  description: String,
  image: {
    type: String,
    default: "default",
  },
};

export type EmptyProps = ExtractPropTypes<typeof emptyProps>;
