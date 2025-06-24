import type { ExtractPropTypes } from "vue";

export const collapseProps = {
  modelValue: [String, Number, Array],
  accordion: Boolean,
  border: {
    type: Boolean,
    default: true,
  },
};

export type CollapseProps = ExtractPropTypes<typeof collapseProps>;
