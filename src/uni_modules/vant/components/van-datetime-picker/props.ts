import { commonProps } from "../../utils";
import type { ExtractPropTypes, PropType } from "vue";

export type DatetimePickerType = "datetime" | "date" | "time" | "year-month";

export const datetimePickerProps = {
  ...commonProps,
  value: [String, Number, Date],
  type: {
    type: String as PropType<DatetimePickerType>,
    default: "datetime",
  },
  showToolbar: {
    type: Boolean,
    default: true,
  },
  formatter: {
    type: Function as PropType<(type: string, value: string) => string>,
    default: (type: string, value: string) => value,
  },
  filter: Function as PropType<(type: string, options: string[]) => string[]>,
  minDate: {
    type: Number,
    default: () => new Date(new Date().getFullYear() - 10, 0, 1).getTime(),
  },
  maxDate: {
    type: Number,
    default: () => new Date(new Date().getFullYear() + 10, 11, 31).getTime(),
  },
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
  title: String,
  itemHeight: Number,
  visibleItemCount: Number,
  confirmButtonText: String,
  cancelButtonText: String,
  columns: Array as PropType<any[]>,
};

export type DatetimePickerProps = ExtractPropTypes<typeof datetimePickerProps>;
