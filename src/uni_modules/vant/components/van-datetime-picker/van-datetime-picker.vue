<template>
  <van-picker
    class="van-datetime-picker"
    :class="cn(customClass)"
    :title="title"
    :columns="columns"
    :item-height="itemHeight"
    :show-toolbar="showToolbar"
    :visible-item-count="visibleItemCount"
    :confirm-button-text="confirmButtonText"
    :cancel-button-text="cancelButtonText"
    @change="onChange"
    @confirm="onConfirm"
    @cancel="onCancel"
  />
</template>

<script lang="ts" setup>
import { ref, computed, watch } from "vue";
import { vanDatetimePickerProps, VanDatetimePickerProps } from "./props";
import { cn } from "../../utils";

const props = defineProps(vanDatetimePickerProps);
const emit = defineEmits<{
  (e: "update:value", val: any): void;
  (e: "change", val: any): void;
  (e: "confirm", val: any): void;
  (e: "cancel"): void;
}>();

const innerValue = ref(props.value ?? Date.now());
const columns = ref<any[]>([]);

watch(
  () => props.value,
  (val) => {
    innerValue.value = val ?? Date.now();
    updateColumnValue(innerValue.value);
  }
);

function isValidDate(date: number) {
  return date !== undefined && !isNaN(new Date(date).getTime());
}
function range(num: number, min: number, max: number) {
  return Math.min(Math.max(num, min), max);
}
function padZero(val: string | number) {
  return `00${val}`.slice(-2);
}
function times(n: number, iteratee: (index: number) => string): string[] {
  let index = -1;
  const result = Array(n < 0 ? 0 : n);
  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}
function getTrueValue(formattedValue: string) {
  if (formattedValue === undefined) {
    formattedValue = "1";
  }
  while (isNaN(parseInt(formattedValue, 10))) {
    formattedValue = formattedValue.slice(1);
  }
  return parseInt(formattedValue, 10);
}
function getMonthEndDay(year: number, month: number): number {
  return 32 - new Date(year, month - 1, 32).getDate();
}
const defaultFormatter = (type: string, value: string) => value;

function correctValue(value: any) {
  const isDateType = props.type !== "time";
  if (isDateType && !isValidDate(value)) {
    value = props.minDate;
  } else if (!isDateType && !value) {
    value = `${padZero(props.minHour)}:00`;
  }
  if (!isDateType) {
    let [hour, minute] = value.split(":");
    hour = padZero(range(hour, props.minHour, props.maxHour));
    minute = padZero(range(minute, props.minMinute, props.maxMinute));
    return `${hour}:${minute}`;
  }
  value = Math.max(value, props.minDate);
  value = Math.min(value, props.maxDate);
  return value;
}

function getBoundary(type: "min" | "max", innerValue: number) {
  const value = new Date(innerValue);
  const boundary = new Date(type === "min" ? props.minDate : props.maxDate);
  const year = boundary.getFullYear();
  let month = 1;
  let date = 1;
  let hour = 0;
  let minute = 0;
  if (type === "max") {
    month = 12;
    date = getMonthEndDay(value.getFullYear(), value.getMonth() + 1);
    hour = 23;
    minute = 59;
  }
  if (value.getFullYear() === year) {
    month = boundary.getMonth() + 1;
    if (value.getMonth() + 1 === month) {
      date = boundary.getDate();
      if (value.getDate() === date) {
        hour = boundary.getHours();
        if (value.getHours() === hour) {
          minute = boundary.getMinutes();
        }
      }
    }
  }
  return {
    [`${type}Year`]: year,
    [`${type}Month`]: month,
    [`${type}Date`]: date,
    [`${type}Hour`]: hour,
    [`${type}Minute`]: minute,
  };
}

function getRanges() {
  if (props.type === "time") {
    return [
      { type: "hour", range: [props.minHour, props.maxHour] },
      { type: "minute", range: [props.minMinute, props.maxMinute] },
    ];
  }
  const { maxYear, maxDate, maxMonth, maxHour, maxMinute } = getBoundary(
    "max",
    innerValue.value
  );
  const { minYear, minDate, minMonth, minHour, minMinute } = getBoundary(
    "min",
    innerValue.value
  );
  const result = [
    { type: "year", range: [minYear, maxYear] },
    { type: "month", range: [minMonth, maxMonth] },
    { type: "day", range: [minDate, maxDate] },
    { type: "hour", range: [minHour, maxHour] },
    { type: "minute", range: [minMinute, maxMinute] },
  ];
  if (props.type === "date") result.splice(3, 2);
  if (props.type === "year-month") result.splice(2, 3);
  return result;
}

function getOriginColumns() {
  const filter = props.filter;
  const formatter = props.formatter || defaultFormatter;
  return getRanges().map(({ type, range }) => {
    let values = times(range[1] - range[0] + 1, (index) => {
      const value = range[0] + index;
      return type === "year" ? `${value}` : padZero(value);
    });
    if (filter) {
      values = filter(type, values);
    }
    return { type, values };
  });
}

function updateColumns() {
  const formatter = props.formatter || defaultFormatter;
  const results = getOriginColumns().map((column) => ({
    values: column.values.map((value) => formatter(column.type, value)),
  }));
  columns.value = results;
}

function updateColumnValue(value: any) {
  let values: string[] = [];
  const type = props.type;
  const formatter = props.formatter || defaultFormatter;
  if (type === "time") {
    const pair = value.split(":");
    values = [formatter("hour", pair[0]), formatter("minute", pair[1])];
  } else {
    const date = new Date(value);
    values = [
      formatter("year", `${date.getFullYear()}`),
      formatter("month", padZero(date.getMonth() + 1)),
    ];
    if (type === "date") {
      values.push(formatter("day", padZero(date.getDate())));
    }
    if (type === "datetime") {
      values.push(
        formatter("day", padZero(date.getDate())),
        formatter("hour", padZero(date.getHours())),
        formatter("minute", padZero(date.getMinutes()))
      );
    }
  }
  innerValue.value = value;
  updateColumns();
}

function onChange(val: any) {
  emit("update:value", val);
  emit("change", val);
}
function onConfirm() {
  emit("confirm", innerValue.value);
}
function onCancel() {
  emit("cancel");
}

// 初始化
updateColumnValue(innerValue.value);
</script>

<style></style>
