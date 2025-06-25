<template>
  <demo-block title="选择完整时间">
    <van-datetime-picker
      type="datetime"
      data-type="datetime"
      :loading="loading"
      v-model="currentDate1"
      :min-date="minDate"
      @input="onInput('datetime', $event)"
    />
  </demo-block>

  <demo-block title="选择日期（年月日）">
    <van-datetime-picker
      type="date"
      data-type="date"
      v-model="currentDate2"
      :min-date="minDate"
      @input="onInput('date', $event)"
      :formatter="formatter"
    />
  </demo-block>

  <demo-block title="选择日期（年月）">
    <van-datetime-picker
      type="year-month"
      data-type="year-month"
      v-model="currentDate3"
      :min-date="minDate"
      @input="onInput('year-month', $event)"
    />
  </demo-block>

  <demo-block title="选择时间">
    <van-datetime-picker
      type="time"
      data-type="time"
      v-model="currentDate4"
      :min-hour="minHour"
      :max-hour="maxHour"
      @input="onInput('time', $event)"
    />
  </demo-block>

  <demo-block title="选项过滤器">
    <van-datetime-picker type="time" v-model="currentDate4" :filter="filter" />
  </demo-block>

  <van-toast id="van-toast" />
</template>
<script lang="ts" setup>
import { ref } from "vue";
import Toast from "../../toast/toast";

const minHour = ref(10);
const maxHour = ref(20);
const minDate = ref(new Date(2018, 0, 1).getTime());
const maxDate = ref(new Date(2019, 10, 1).getTime());
const currentDate1 = ref(new Date(2018, 2, 31).getTime());
const currentDate2 = ref<number | null>(null);
const currentDate3 = ref(new Date(2018, 0, 1).getTime());
const currentDate4 = ref("12:00");
const loading = ref(false);

function formatter(type: string, value: string) {
  if (type === "year") return `${value}年`;
  if (type === "month") return `${value}月`;
  return value;
}

function filter(type: string, options: any[]) {
  if (type === "minute") {
    return options.filter((option) => option % 5 === 0);
  }
  return options;
}

function onInput(type: string, val: any) {
  Toast({ message: getResult(val, type) });
}

function getResult(time: any, type: string) {
  if (type === "time") return time;
  const date = new Date(time);
  switch (type) {
    case "datetime":
      return date.toLocaleString();
    case "date":
      return date.toLocaleDateString();
    case "year-month":
      return `${date.getFullYear()}/${date.getMonth() + 1}`;
    default:
      return "";
  }
}
</script>
<style></style>
