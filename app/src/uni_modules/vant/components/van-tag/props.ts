import type { ExtractPropTypes } from "vue";
import { commonProps } from "../../utils";

export const tagProps = {
  ...commonProps,
  size: { type: String },
  mark: { type: Boolean, default: false },
  color: { type: String },
  plain: { type: Boolean, default: false },
  round: { type: Boolean, default: false },
  textColor: { type: String },
  type: {
    type: String as () =>
      | "default"
      | "danger"
      | "primary"
      | "success"
      | "warning",
    default: "default",
  },
  closeable: { type: Boolean, default: false },
};

export type TagProps = ExtractPropTypes<typeof tagProps>;
