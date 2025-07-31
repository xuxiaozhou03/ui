<template>
  <van-transition
    :show="show"
    :custom-class="`van-overlay ${customClass}`"
    :custom-style="{
      ...customStyle,
      zIndex,
    }"
    :duration="duration"
    @click="onClick"
    @touchmove.prevent="lockScroll ? noop : undefined"
  >
    <slot></slot>
  </van-transition>
</template>
<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";
import { overlayProps } from "./props";

defineProps(overlayProps);
const emit = defineEmits(["click"]);

function onClick(e: Event) {
  emit("click", e);
}
function noop() {}
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
