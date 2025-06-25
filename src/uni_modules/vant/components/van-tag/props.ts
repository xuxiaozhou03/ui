import type { ExtractPropTypes } from "vue";
import { commonProps } from "../../utils";

export const tagProps = {
  ...commonProps,
  size: String,
  mark: {
    type: Boolean,
    default: false,
  },
  color: String,
  plain: {
    type: Boolean,
    default: false,
  },
  round: {
    type: Boolean,
    default: false,
  },
  textColor: String,
  type: {
    type: String as () =>
      | "primary"
      | "success"
      | "warning"
      | "danger"
      | "info"
      | "default",
    default: "default",
  },
  closeable: {
    type: Boolean,
    default: false,
  },
};

export type TagProps = ExtractPropTypes<typeof tagProps>;
