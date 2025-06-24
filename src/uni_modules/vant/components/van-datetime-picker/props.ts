import type { ExtractPropTypes, PropType } from "vue";

export type DatetimePickerType = "datetime" | "date" | "time" | "year-month";

export const datetimePickerProps = {
  value: [String, Number, Date],
  filter: Function as PropType<(type: string, values: string[]) => string[]>,
  type: {
    type: String as PropType<DatetimePickerType>,
    default: "datetime",
  },
  showToolbar: {
    type: Boolean,
    default: true,
  },
  formatter: Function as PropType<(type: string, value: string) => string>,
  minDate: Number,
  maxDate: Number,
  minHour: {
    type: Number,
    default: 0,
  },
  maxHour: {
    type: Number,
    default: 23,
  },
  minMinute: {
    type: Number,
    default: 0,
  },
  maxMinute: {
    type: Number,
    default: 59,
  },
  // pickerProps 可在此合并
  title: String,
  columns: Array as PropType<any[]>,
  itemHeight: Number,
  visibleItemCount: Number,
  confirmButtonText: String,
  cancelButtonText: String,
};

export type DatetimePickerProps = ExtractPropTypes<typeof datetimePickerProps>;
