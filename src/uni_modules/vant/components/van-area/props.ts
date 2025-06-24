import { commonProps } from "../../utils";
import type { PropType, ExtractPropTypes } from "vue";

export interface AreaList {
  province_list?: Record<string, string>;
  city_list?: Record<string, string>;
  county_list?: Record<string, string>;
}

export const areaProps = {
  ...commonProps,
  showToolbar: { type: Boolean, default: true },
  value: String,
  areaList: { type: Object as PropType<AreaList>, default: () => ({}) },
  columnsNum: { type: Number, default: 3 },
  columnsPlaceholder: { type: Array as PropType<string[]>, default: () => [] },
  // pickerProps 可根据实际情况补充
};

export type AreaProps = ExtractPropTypes<typeof areaProps>;
