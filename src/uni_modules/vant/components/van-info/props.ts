import type { ExtractPropTypes } from "vue";
import { commonProps } from "../../utils";

export const infoProps = {
  ...commonProps,
  dot: Boolean,
  info: [String, Number],
};

export type InfoProps = ExtractPropTypes<typeof infoProps>;
