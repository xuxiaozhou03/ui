import type { ExtractPropTypes } from "vue";
import { commonProps } from "../../utils";

export const infoProps = {
  dot: { type: Boolean, default: false },
  info: { type: [String, Number, null], default: null },
  customStyle: commonProps.customStyle,
};

export type InfoProps = ExtractPropTypes<typeof infoProps>;
