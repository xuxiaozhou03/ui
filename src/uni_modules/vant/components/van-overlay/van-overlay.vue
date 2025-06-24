<template>
  <teleport to="body" v-if="rootPortal">
    <div
      v-if="show"
      class="van-overlay"
      :style="customStyle"
      @click="onClick"
    ></div>
  </teleport>
  <div
    v-else-if="show"
    class="van-overlay"
    :style="customStyle"
    @click="onClick"
  ></div>
</template>

<script setup lang="ts">
import { overlayProps } from "./props";

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
