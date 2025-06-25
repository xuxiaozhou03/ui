import type { ExtractPropTypes } from "vue";

export const emptyProps = {
  description: String,
  image: {
    type: String as () => "error" | "search" | "default" | "network" | string,
    default: "default",
  },
};

export type EmptyProps = ExtractPropTypes<typeof emptyProps>;
