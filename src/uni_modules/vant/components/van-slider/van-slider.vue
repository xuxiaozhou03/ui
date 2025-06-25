<template>
  <div
    :class="['custom-class', bem('slider', { disabled, vertical })]"
    :style="wrapperStyle"
    @click="onClick"
  >
    <div :class="bem('slider__bar')" :style="barStyle">
      <template v-if="range">
        <div
          :class="bem('slider__button-wrapper-left')"
          @mousedown="onDragStart(0, $event)"
          @touchstart="onDragStart(0, $event)"
        >
          <slot v-if="useButtonSlot" name="left-button" />
          <div v-else :class="bem('slider__button')" />
        </div>
        <div
          :class="bem('slider__button-wrapper-right')"
          @mousedown="onDragStart(1, $event)"
          @touchstart="onDragStart(1, $event)"
        >
          <slot v-if="useButtonSlot" name="right-button" />
          <div v-else :class="bem('slider__button')" />
        </div>
      </template>
      <template v-else>
        <div
          :class="bem('slider__button-wrapper')"
          @mousedown="onDragStart(0, $event)"
          @touchstart="onDragStart(0, $event)"
        >
          <slot v-if="useButtonSlot" name="button" />
          <div v-else :class="bem('slider__button')" />
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, defineProps, defineEmits } from "vue";
import { sliderProps, SliderProps } from "./props";

const props = defineProps({
  ...sliderProps,
  value: { type: [Number, Array], default: 0 },
  min: { type: Number, default: 0 },
  max: { type: Number, default: 100 },
  step: { type: Number, default: 1 },
  barHeight: { type: [String, Number], default: "2px" },
  inactiveColor: String,
});
const emit = defineEmits<{
  (e: "update:modelValue", value: number | [number, number]): void;
  (e: "change", value: number | [number, number]): void;
  (e: "drag", value: { value: number | [number, number] }): void;
}>();

const isRange = computed(() => props.range && Array.isArray(props.value));
const disabled = computed(() => !!props.disabled);
const vertical = computed(() => !!props.vertical);
const useButtonSlot = computed(() => !!props.useButtonSlot);

const value = ref(props.value);
watch(
  () => props.value,
  (v) => (value.value = v)
);

function clamp(val: number, min: number, max: number) {
  return Math.min(Math.max(val, min), max);
}
function addUnit(val: string | number | undefined) {
  if (val == null) return undefined;
  return typeof val === "number" ? `${val}px` : val;
}
function bem(name: string, mods?: any) {
  if (!mods) return `van-${name}`;
  let base = `van-${name}`;
  if (typeof mods === "object") {
    Object.keys(mods).forEach((k) => {
      if (mods[k]) base += ` van-${name}--${k}`;
    });
  }
  return base;
}

const getScope = () => props.max - props.min;
const getRange = () => props.max - props.min;
const getOffsetWidth = (current: number, min: number) => {
  const scope = getScope();
  return `${Math.max(((current - min) * 100) / scope, 0)}%`;
};
const calcMainAxis = () => {
  if (isRange.value) {
    return getOffsetWidth(
      (value.value as [number, number])[1],
      (value.value as [number, number])[0]
    );
  }
  return getOffsetWidth(value.value as number, props.min);
};
const calcOffset = () => {
  if (isRange.value) {
    return `${
      (((value.value as [number, number])[0] - props.min) * 100) / getScope()
    }%`;
  }
  return "0%";
};

const wrapperStyle = computed(() => {
  return {
    background: props.inactiveColor,
    [vertical.value ? "width" : "height"]: addUnit(props.barHeight),
  };
});
const barStyle = computed(() => {
  const mainAxis = vertical.value ? "height" : "width";
  return {
    [mainAxis]: calcMainAxis(),
    left: vertical.value ? 0 : calcOffset(),
    top: vertical.value ? calcOffset() : 0,
    background: props.activeColor,
    transition: "all .2s",
  };
});

let dragIndex = 0;
let startValue: number | [number, number] = 0;
function onDragStart(index: number, e: MouseEvent | TouchEvent) {
  if (disabled.value) return;
  dragIndex = index;
  if (isRange.value) {
    startValue = [...(value.value as [number, number])];
  } else {
    startValue = value.value as number;
  }
  document.addEventListener("mousemove", onDragMove);
  document.addEventListener("mouseup", onDragEnd);
  document.addEventListener("touchmove", onDragMove);
  document.addEventListener("touchend", onDragEnd);
}
function onDragMove(e: MouseEvent | TouchEvent) {
  if (disabled.value) return;
  // 这里只做简单实现，实际应根据滑块位置和轨道宽度计算
  // 省略详细实现，可根据实际需求补充
}
function onDragEnd(e: MouseEvent | TouchEvent) {
  document.removeEventListener("mousemove", onDragMove);
  document.removeEventListener("mouseup", onDragEnd);
  document.removeEventListener("touchmove", onDragMove);
  document.removeEventListener("touchend", onDragEnd);
  emit("change", value.value);
}
function onClick(e: MouseEvent) {
  if (disabled.value) return;
  // 这里只做简单实现，实际应根据点击位置和轨道宽度计算
  // 省略详细实现，可根据实际需求补充
}
</script>

<style>
.van-slider {
  background-color: var(--slider-inactive-background-color, #ebedf0);
  border-radius: 999px;
  height: var(--slider-bar-height, 2px);
  position: relative;
}
.van-slider:before {
  bottom: calc(var(--padding-xs, 8px) * -1);
  content: "";
  left: 0;
  position: absolute;
  right: 0;
  top: calc(var(--padding-xs, 8px) * -1);
}
.van-slider__bar {
  background-color: var(--slider-active-background-color, #1989fa);
  border-radius: inherit;
  height: 100%;
  position: relative;
  transition: all 0.2s;
  width: 100%;
}
.van-slider__button {
  background-color: var(--slider-button-background-color, #fff);
  border-radius: var(--slider-button-border-radius, 50%);
  box-shadow: var(--slider-button-box-shadow, 0 1px 2px rgba(0, 0, 0, 0.5));
  height: var(--slider-button-height, 24px);
  width: var(--slider-button-width, 24px);
}
.van-slider__button-wrapper,
.van-slider__button-wrapper-right {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate3d(50%, -50%, 0);
}
.van-slider__button-wrapper-left {
  left: 0;
  position: absolute;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
}
.van-slider--disabled {
  opacity: var(--slider-disabled-opacity, 0.5);
}
.van-slider--vertical {
  display: inline-block;
  height: 100%;
  width: var(--slider-bar-height, 2px);
}
.van-slider--vertical .van-slider__button-wrapper,
.van-slider--vertical .van-slider__button-wrapper-right {
  bottom: 0;
  right: 50%;
  top: auto;
  transform: translate3d(50%, 50%, 0);
}
.van-slider--vertical .van-slider__button-wrapper-left {
  left: auto;
  right: 50%;
  top: 0;
  transform: translate3d(50%, -50%, 0);
}
.van-slider--vertical:before {
  bottom: 0;
  left: -8px;
  right: -8px;
  top: 0;
}
</style>
