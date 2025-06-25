<template>
  <van-transition
    :show="show"
    :custom-class="cn('van-overlay', customClass)"
    :custom-style="{
      zIndex,
      ...customStyle,
    }"
    :duration="duration"
    @click="onClick"
  >
    <slot></slot>
  </van-transition>
</template>

<script setup lang="ts">
import { overlayProps } from "./props";
import { cn } from "../../utils";
// catch:touchmove="{{ lockScroll ? 'noop' : ''}}"

defineProps(overlayProps);
const emit = defineEmits(["click"]);
function onClick() {
  emit("click");
}
</script>

<style>
.van-overlay {
  background-color: var(--overlay-background-color, rgba(0, 0, 0, 0.7));
  height: 100%;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
}
</style>
