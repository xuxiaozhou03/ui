import type { ExtractPropTypes, PropType } from "vue";

export const radioProps = {
  name: null,
  value: null,
  disabled: Boolean,
  useIconSlot: Boolean,
  checkedColor: String,
  labelPosition: {
    type: String,
    default: "right",
  },
  labelDisabled: Boolean,
  shape: {
    type: String,
    default: "round",
  },
  iconSize: {
    type: [Number, String],
    default: 20,
  },
};

export type RadioProps = ExtractPropTypes<typeof radioProps>;
