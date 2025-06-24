import { commonProps } from "../../utils";
import type { PropType, ExtractPropTypes } from "vue";

export interface CascaderFieldNames {
  text?: string;
  value?: string;
  children?: string;
}

export const cascaderProps = {
  ...commonProps,
  title: String,
  value: String,
  placeholder: { type: String, default: "请选择" },
  activeColor: { type: String, default: "#1989fa" },
  options: { type: Array as PropType<any[]>, default: () => [] },
  swipeable: { type: Boolean, default: false },
  closeable: { type: Boolean, default: true },
  ellipsis: { type: Boolean, default: true },
  showHeader: { type: Boolean, default: true },
  closeIcon: { type: String, default: "cross" },
  fieldNames: {
    type: Object as PropType<CascaderFieldNames>,
    default: () => ({ text: "text", value: "value", children: "children" }),
  },
  useTitleSlot: Boolean,
};

export type CascaderProps = ExtractPropTypes<typeof cascaderProps>;
