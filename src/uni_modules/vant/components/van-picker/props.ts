import type { ExtractPropTypes, PropType } from "vue";

export const pickerProps = {
  valueKey: {
    type: String,
    default: "text",
  },
  toolbarPosition: {
    type: String,
    default: "top",
  },
  defaultIndex: {
    type: Number,
    default: 0,
  },
  columns: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
  loading: Boolean,
  itemHeight: Number,
  visibleItemCount: Number,
};

export type PickerProps = ExtractPropTypes<typeof pickerProps>;
