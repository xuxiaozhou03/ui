import type { ExtractPropTypes, PropType } from "vue";

export const pickerColumnProps = {
  valueKey: String,
  className: String,
  itemHeight: Number,
  visibleItemCount: Number,
  initialOptions: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
  defaultIndex: {
    type: Number,
    default: 0,
  },
};

export type PickerColumnProps = ExtractPropTypes<typeof pickerColumnProps>;
