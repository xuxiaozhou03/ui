import type { ExtractPropTypes, PropType } from "vue";

export const infoProps = {
  dot: Boolean,
  info: [String, Number],
  customStyle: String,
};

export type InfoProps = ExtractPropTypes<typeof infoProps>;
