<template>
  <demo-block title="基础用法">
    <van-cell
      is-link
      title="选择单个日期"
      data-type="single"
      data-id="selectSingle"
      :value="formatFullDate(date.selectSingle)"
      @click="show"
    />
    <van-cell
      is-link
      title="选择多个日期"
      data-type="multiple"
      data-id="selectMultiple"
      :value="formatMultiple(date.selectMultiple)"
      @click="show"
    />
    <van-cell
      is-link
      title="选择日期区间"
      data-type="range"
      data-id="selectRange"
      :value="formatRange(date.selectRange)"
      @click="show"
    />
  </demo-block>

  <demo-block title="快捷选择">
    <van-cell
      is-link
      title="选择单个日期"
      data-type="single"
      data-id="quickSelect1"
      :value="formatFullDate(date.quickSelect1)"
      @click="show"
    />
    <van-cell
      is-link
      title="选择日期区间"
      data-type="range"
      data-id="quickSelect2"
      :value="formatRange(date.quickSelect2)"
      @click="show"
    />
  </demo-block>

  <demo-block title="自定义日历">
    <van-cell
      is-link
      title="自定义颜色"
      data-type="range"
      data-id="customColor"
      :value="formatRange(date.customColor)"
      @click="show"
    />
    <van-cell
      is-link
      title="自定义日期范围"
      data-type="single"
      data-id="customRange"
      :value="formatFullDate(date.customRange)"
      @click="show"
    />
    <van-cell
      is-link
      title="自定义按钮文字"
      data-type="range"
      data-id="customConfirm"
      :value="formatRange(date.customConfirm)"
      @click="show"
    />
    <van-cell
      is-link
      title="自定义日期文案"
      data-type="range"
      data-id="customDayText"
      :value="formatRange(date.customDayText)"
      @click="show"
    />
    <van-cell
      is-link
      title="自定义弹出位置"
      data-type="single"
      data-id="customPosition"
      :value="formatFullDate(date.customPosition)"
      @click="show"
    />
    <van-cell
      is-link
      title="日期区间最大范围"
      data-type="range"
      data-id="maxRange"
      :value="formatRange(date.maxRange)"
      @click="show"
    />
  </demo-block>

  <demo-block title="平铺展示">
    <van-calendar
      title="日历"
      :poppable="false"
      :show-confirm="false"
      :min-date="tiledMinDate"
      :max-date="tiledMaxDate"
      :first-day-of-week="firstDayOfWeek"
      class="tiled-calendar"
    />
  </demo-block>

  <van-calendar
    v-model:show="showCalendar"
    :type="type"
    :color="color"
    :round="round"
    :position="position"
    :min-date="minDate"
    :max-date="maxDate"
    :max-range="maxRange"
    :formatter="formatter"
    :show-confirm="showConfirm"
    :confirm-text="confirmText"
    :confirm-disabled-text="confirmDisabledText"
    :first-day-of-week="firstDayOfWeek"
    @confirm="onConfirm"
    @select="onSelect"
    @unselect="onUnselect"
    @open="onOpen"
    @opened="onOpened"
    @close="onClose"
    @closed="onClosed"
  />
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";

// 日期格式化工具函数
function formatFullDate(val: number | null) {
  if (!val) return "";
  const date = new Date(val);
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}
function formatMultiple(val: number[]) {
  if (!val || !val.length) return "";
  return val.map(formatFullDate).join(", ");
}
function formatRange(val: number[] | null) {
  if (!val || !val.length) return "";
  if (Array.isArray(val)) {
    return val.map(formatFullDate).join(" ~ ");
  }
  return "";
}

const date = reactive({
  maxRange: [],
  selectSingle: null,
  selectRange: [],
  selectMultiple: [],
  quickSelect1: null,
  quickSelect2: [],
  customColor: [],
  customConfirm: [],
  customRange: null,
  customDayText: [],
  customPosition: null,
});

const type = ref<"single" | "multiple" | "range">("single");
const round = ref(true);
const color = ref("");
const minDate = ref(Date.now());
const maxDate = ref(
  new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 6,
    new Date().getDate()
  ).getTime()
);
const maxRange = ref();
const position = ref<"top" | "right" | "bottom" | "left">("bottom");
const formatter = ref();
const showConfirm = ref(false);
const showCalendar = ref(false);
const tiledMinDate = ref(new Date(2012, 0, 10).getTime());
const tiledMaxDate = ref(new Date(2012, 2, 20).getTime());
const confirmText = ref("确定");
const confirmDisabledText = ref("确定");
const firstDayOfWeek = ref(0);
const id = ref<string | undefined>();

function resetSettings() {
  round.value = true;
  color.value = "";
  minDate.value = Date.now();
  maxDate.value = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 6,
    new Date().getDate()
  ).getTime();
  maxRange.value = undefined;
  position.value = "bottom";
  formatter.value = undefined;
  showConfirm.value = true;
  confirmText.value = "确定";
  confirmDisabledText.value = "确定";
}

function show(event: Event) {
  resetSettings();
  const target = event.currentTarget as HTMLElement;
  const typeAttr = target.getAttribute("data-type") as
    | "single"
    | "multiple"
    | "range";
  const idAttr = target.getAttribute("data-id") as string;
  type.value = typeAttr;
  id.value = idAttr;
  showCalendar.value = true;

  switch (idAttr) {
    case "quickSelect1":
    case "quickSelect2":
      showConfirm.value = false;
      break;
    case "customColor":
      color.value = "#07c160";
      break;
    case "customConfirm":
      confirmText.value = "完成";
      confirmDisabledText.value = "请选择结束时间";
      break;
    case "customRange":
      minDate.value = new Date(2010, 0, 1).getTime();
      maxDate.value = new Date(2010, 0, 31).getTime();
      break;
    case "customDayText":
      minDate.value = new Date(2010, 4, 1).getTime();
      maxDate.value = new Date(2010, 4, 31).getTime();
      formatter.value = dayFormatter;
      break;
    case "customPosition":
      round.value = false;
      position.value = "right";
      break;
    case "maxRange":
      maxRange.value = 3;
      break;
  }
}

function onConfirm(event: any) {
  showCalendar.value = false;
  if (!id.value) return;
  date[id.value] = Array.isArray(event)
    ? event.map((d: Date) => d.valueOf())
    : event.valueOf();
}
function onSelect(event: any) {
  // 可根据需要处理
}
function onUnselect(event: any) {
  // 可根据需要处理
}
function onClose() {
  showCalendar.value = false;
}
function onOpen() {}
function onOpened() {}
function onClosed() {}

function dayFormatter(day: any) {
  const month = day.date.getMonth() + 1;
  const dateNum = day.date.getDate();
  if (month === 5) {
    if (dateNum === 1) {
      day.topInfo = "劳动节";
    } else if (dateNum === 4) {
      day.topInfo = "五四青年节";
    } else if (dateNum === 11) {
      day.text = "今天";
    }
  }
  if (day.type === "start") {
    day.bottomInfo = "入店";
  } else if (day.type === "end") {
    day.bottomInfo = "离店";
  }
  return day;
}
</script>

<style>
.tiled-calendar {
  --calendar-height: 618px;
}
</style>
