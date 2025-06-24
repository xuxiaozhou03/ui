<template>
  <div class="van-swipe-cell" @click="onClick('outside')" ref="root">
    <div
      class="van-swipe-cell__wrapper"
      :style="wrapperStyle"
      @touchstart="startDrag"
      @touchmove="onDrag"
      @touchend="endDrag"
      @touchcancel="endDrag"
    >
      <div
        v-if="leftWidth"
        class="van-swipe-cell__left"
        @click.stop="onClick('left')"
      >
        <slot name="left" />
      </div>
      <slot />
      <div
        v-if="rightWidth"
        class="van-swipe-cell__right"
        @click.stop="onClick('right')"
      >
        <slot name="right" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  computed,
  defineProps,
  defineEmits,
  onMounted,
  onBeforeUnmount,
} from "vue";
import { swipeCellProps } from "./props";

const props = defineProps(swipeCellProps);
const emit = defineEmits<{
  (
    e: "open",
    payload: { position: "left" | "right"; name: string | number }
  ): void;
  (e: "close", payload: { position: string; name: string | number }): void;
  (e: "click", position: string): void;
}>();

const root = ref<HTMLElement | null>(null);
const offset = ref(0);
const dragging = ref(false);
const startOffset = ref(0);
const deltaX = ref(0);
const direction = ref("");

const wrapperStyle = computed(() => {
  const transform = `translate3d(${offset.value}px, 0, 0)`;
  const transition = dragging.value
    ? "none"
    : "transform .6s cubic-bezier(0.18, 0.89, 0.32, 1)";
  return {
    transform,
    transition,
    WebkitTransform: transform,
    WebkitTransition: transition,
  };
});

function range(num: number, min: number, max: number) {
  return Math.min(Math.max(num, min), max);
}

function open(position: "left" | "right") {
  const left = Number(props.leftWidth);
  const right = Number(props.rightWidth);
  offset.value = position === "left" ? left : -right;
  emit("open", { position, name: props.name });
}

function close() {
  offset.value = 0;
}

function swipeMove(newOffset = 0) {
  offset.value = range(
    newOffset,
    -Number(props.rightWidth),
    Number(props.leftWidth)
  );
}

function swipeLeaveTransition() {
  const left = Number(props.leftWidth);
  const right = Number(props.rightWidth);
  if (right > 0 && -offset.value > right * 0.3) {
    open("right");
  } else if (left > 0 && offset.value > left * 0.3) {
    open("left");
  } else {
    swipeMove(0);
  }
}

function startDrag(e: TouchEvent) {
  if (props.disabled) return;
  dragging.value = true;
  startOffset.value = offset.value;
  if (e.touches.length) {
    deltaX.value = 0;
    direction.value = "";
  }
}

function onDrag(e: TouchEvent) {
  if (props.disabled || !dragging.value) return;
  if (!e.touches.length) return;
  const touch = e.touches[0];
  deltaX.value = touch.clientX - (touch as any).startX || 0;
  if (!direction.value) {
    direction.value =
      Math.abs(deltaX.value) >
      Math.abs((touch as any).clientY - (touch as any).startY)
        ? "horizontal"
        : "vertical";
  }
  if (direction.value !== "horizontal") return;
  swipeMove(startOffset.value + deltaX.value);
}

function endDrag() {
  if (props.disabled) return;
  dragging.value = false;
  swipeLeaveTransition();
}

function onClick(position: string) {
  emit("click", position);
  if (!offset.value) return;
  if (props.asyncClose) {
    emit("close", { position, name: props.name });
  } else {
    swipeMove(0);
  }
}
</script>

<style>
.van-swipe-cell {
  overflow: hidden;
  position: relative;
}
.van-swipe-cell__left,
.van-swipe-cell__right {
  height: 100%;
  position: absolute;
  top: 0;
}
.van-swipe-cell__left {
  left: 0;
  transform: translate3d(-100%, 0, 0);
}
.van-swipe-cell__right {
  right: 0;
  transform: translate3d(100%, 0, 0);
}
</style>
