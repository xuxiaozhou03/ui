import type { ExtractPropTypes } from "vue";

export const tabProps = {
  dot: Boolean,
  info: null,
  title: String,
  disabled: Boolean,
  titleStyle: String,
  name: {
    type: null,
    default: "",
  },
};

export type TabProps = ExtractPropTypes<typeof tabProps>;
