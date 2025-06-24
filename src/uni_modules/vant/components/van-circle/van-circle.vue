<template>
  <view class="van-circle">
    <canvas
      class="van-circle__canvas"
      :width="size"
      :height="size"
      ref="canvasRef"
    />
    <view v-if="!text" class="van-circle__text">
      <slot></slot>
    </view>
    <view v-else class="van-circle__text">{{ text }}</view>
  </view>
</template>

<script setup lang="ts">
import {
  ref,
  watch,
  onMounted,
  onBeforeUnmount,
  computed,
  nextTick,
} from "vue";
import { circleProps, CircleProps } from "./props";

const props = defineProps<CircleProps>();
const canvasRef = ref<HTMLCanvasElement | null>(null);
let interval: any = null;
let currentValue = ref(props.modelValue);

const PERIMETER = 2 * Math.PI;
const BEGIN_ANGLE = -Math.PI / 2;
const STEP = 1;

function addUnit(value?: string | number) {
  if (value == null) return undefined;
  return typeof value === "number" ? `${value}px` : value;
}

function format(rate: number) {
  return Math.min(Math.max(rate, 0), 100);
}

function drawCircle(value: number) {
  const canvas = canvasRef.value;
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const size = props.size;
  ctx.clearRect(0, 0, size, size);
  // layer circle
  ctx.save();
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2 - props.strokeWidth / 2, 0, PERIMETER);
  ctx.strokeStyle = props.layerColor || "#fff";
  ctx.lineWidth = props.strokeWidth;
  ctx.lineCap = props.lineCap;
  ctx.stroke();
  ctx.restore();
  // progress circle
  if (format(value) !== 0) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(
      size / 2,
      size / 2,
      size / 2 - props.strokeWidth / 2,
      BEGIN_ANGLE,
      BEGIN_ANGLE + PERIMETER * (format(value) / 100),
      !props.clockwise
    );
    ctx.strokeStyle = typeof props.color === "string" ? props.color : "#1989fa";
    ctx.lineWidth = props.strokeWidth;
    ctx.lineCap = props.lineCap;
    ctx.stroke();
    ctx.restore();
  }
}

function reRender() {
  if (props.speed <= 0 || props.speed > 1000) {
    currentValue.value = props.modelValue;
    drawCircle(currentValue.value);
    return;
  }
  clearMockInterval();
  const run = () => {
    interval = setTimeout(() => {
      if (currentValue.value !== props.modelValue) {
        if (Math.abs(currentValue.value - props.modelValue) < STEP) {
          currentValue.value = props.modelValue;
        } else if (currentValue.value < props.modelValue) {
          currentValue.value += STEP;
        } else {
          currentValue.value -= STEP;
        }
        drawCircle(currentValue.value);
        run();
      } else {
        clearMockInterval();
      }
    }, 1000 / props.speed);
  };
  run();
}

function clearMockInterval() {
  if (interval) {
    clearTimeout(interval);
    interval = null;
  }
}

watch(
  () => props.modelValue,
  () => {
    reRender();
  }
);

watch(
  () => props.size,
  () => {
    nextTick(() => drawCircle(currentValue.value));
  }
);

onMounted(() => {
  currentValue.value = props.modelValue;
  nextTick(() => drawCircle(currentValue.value));
});

onBeforeUnmount(() => {
  clearMockInterval();
});
</script>

<style scoped>
.van-circle {
  display: inline-block;
  position: relative;
  text-align: center;
}
.van-circle__text {
  color: var(--circle-text-color, #323233);
  left: 0;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
}
</style>
