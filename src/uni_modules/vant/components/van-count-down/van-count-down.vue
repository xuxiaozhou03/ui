<template>
  <view class="van-count-down">
    <template v-if="useSlot">
      <slot />
    </template>
    <template v-else>
      {{ formattedTime }}
    </template>
  </view>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
import { countDownProps, CountDownProps } from "./props";
import { parseTimeData, parseFormat, isSameSecond } from "./utils";

const props = defineProps<CountDownProps>();
const emit = defineEmits(["change", "finish"]);

const remain = ref(props.time || 0);
const formattedTime = ref(
  parseFormat(props.format, parseTimeData(remain.value))
);
let counting = false;
let endTime = 0;
let tid: any = null;

function simpleTick(fn: () => void) {
  return setTimeout(fn, 30);
}

function start() {
  if (counting) return;
  counting = true;
  endTime = Date.now() + remain.value;
  tick();
}

function pause() {
  counting = false;
  clearTimeout(tid);
}

function reset() {
  pause();
  remain.value = props.time || 0;
  setRemain(remain.value);
  if (props.autoStart) start();
}

function tick() {
  if (props.millisecond) {
    microTick();
  } else {
    macroTick();
  }
}

function microTick() {
  tid = simpleTick(() => {
    setRemain(getRemain());
    if (remain.value !== 0) microTick();
  });
}

function macroTick() {
  tid = simpleTick(() => {
    const r = getRemain();
    if (!isSameSecond(r, remain.value) || r === 0) setRemain(r);
    if (remain.value !== 0) macroTick();
  });
}

function getRemain() {
  return Math.max(endTime - Date.now(), 0);
}

function setRemain(val: number) {
  remain.value = val;
  const timeData = parseTimeData(val);
  if (props.useSlot) emit("change", timeData);
  formattedTime.value = parseFormat(props.format, timeData);
  if (val === 0) {
    pause();
    emit("finish");
  }
}

watch(() => props.time, reset);

onMounted(() => {
  reset();
});

onBeforeUnmount(() => {
  pause();
});
</script>

<style scoped>
.van-count-down {
  color: var(--count-down-text-color, #323233);
  font-size: var(--count-down-font-size, 14px);
  line-height: var(--count-down-line-height, 20px);
}
</style>
