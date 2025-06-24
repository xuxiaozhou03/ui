import type { ExtractPropTypes } from "vue";

export const tagProps = {
  size: {
    type: String,
    default: "",
  },
  mark: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
    default: "",
  },
  plain: {
    type: Boolean,
    default: false,
  },
  round: {
    type: Boolean,
    default: false,
  },
  textColor: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "default",
  },
  closeable: {
    type: Boolean,
    default: false,
  },
};

export type TagProps = ExtractPropTypes<typeof tagProps>;
