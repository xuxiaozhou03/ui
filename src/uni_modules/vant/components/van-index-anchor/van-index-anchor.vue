<template>
  <div class="van-index-anchor-wrapper" :style="wrapperStyle">
    <div
      class="van-index-anchor"
      :class="{
        'van-index-anchor--active': active,
        'van-hairline--bottom': active,
      }"
      :style="anchorStyle"
    >
      <template v-if="useSlot">
        <slot />
      </template>
      <template v-else>
        <span>{{ index }}</span>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from "vue";

const props = defineProps({
  useSlot: Boolean,
  index: [String, Number],
});

const active = ref(false);
const wrapperStyle = ref("");
const anchorStyle = ref("");
// 交互逻辑可后续补充
</script>

<style>
.van-index-anchor {
  background-color: var(--index-anchor-background-color, transparent);
  color: var(--index-anchor-text-color, #323233);
  font-size: var(--index-anchor-font-size, 14px);
  font-weight: var(--index-anchor-font-weight, 500);
  line-height: var(--index-anchor-line-height, 32px);
  padding: var(--index-anchor-padding, 0 16px);
}
.van-index-anchor--active {
  background-color: var(--index-anchor-active-background-color, #fff);
  color: var(--index-anchor-active-text-color, #07c160);
  left: 0;
  right: 0;
}
</style>
