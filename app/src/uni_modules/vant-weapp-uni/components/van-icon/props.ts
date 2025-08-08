import type { ExtractPropTypes, PropType, CSSProperties } from "vue";

export const iconProps = {
  dot: Boolean,
  info: [String, Number] as PropType<string | number | null>,
  size: [String, Number] as PropType<string | number | null>,
  color: String,
  customStyle: Object as PropType<CSSProperties>,
  customClass: {
    type: String,
    default: "",
  },
  infoClass: {
    type: String,
    default: "",
  },
  classPrefix: {
    type: String,
    default: "van-icon",
  },
  name: String,
} as const;

export type IconProps = ExtractPropTypes<typeof iconProps>;
