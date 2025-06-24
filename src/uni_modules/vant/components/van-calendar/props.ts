import { commonProps } from "../../utils";
import type { PropType, ExtractPropTypes } from "vue";

export type CalendarType = "single" | "multiple" | "range";

export const calendarProps = {
  ...commonProps,
  title: { type: String, default: "日期选择" },
  color: String,
  show: Boolean,
  formatter: Function as PropType<(day: any) => any>,
  confirmText: { type: String, default: "确定" },
  confirmDisabledText: { type: String, default: "确定" },
  rangePrompt: String,
  showRangePrompt: { type: Boolean, default: true },
  defaultDate: [Number, Array, Object] as PropType<number | number[] | object>,
  allowSameDay: Boolean,
  type: { type: String as PropType<CalendarType>, default: "single" },
  minDate: Number,
  maxDate: Number,
  position: { type: String, default: "bottom" },
  rowHeight: [Number, String],
  round: { type: Boolean, default: true },
  poppable: { type: Boolean, default: true },
  showMark: { type: Boolean, default: true },
  showTitle: { type: Boolean, default: true },
  showConfirm: { type: Boolean, default: true },
  showSubtitle: { type: Boolean, default: true },
  safeAreaInsetBottom: { type: Boolean, default: true },
  closeOnClickOverlay: { type: Boolean, default: true },
  maxRange: [Number, null],
  minRange: { type: Number, default: 1 },
  firstDayOfWeek: { type: Number, default: 0 },
  readonly: Boolean,
  rootPortal: { type: Boolean, default: false },
};

export type CalendarProps = ExtractPropTypes<typeof calendarProps>;
