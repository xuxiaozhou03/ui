import { commonProps } from "../../utils";
import type { PropType, ExtractPropTypes } from "vue";

export const infoProps = {
  ...commonProps,
  dot: Boolean,
  info: [String, Number] as PropType<string | number>,
};

export type InfoProps = ExtractPropTypes<typeof infoProps>;
