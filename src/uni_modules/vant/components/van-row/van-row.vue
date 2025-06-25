<template>
  <div class="van-row custom-class" :style="rootStyle">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, provide } from "vue";
import { rowProps, RowProps } from "./props";

const props = defineProps<RowProps>();

// 提供 gutter 给 col 子组件
provide(
  "vanRowGutter",
  computed(() => props.gutter)
);

function addUnit(val?: number) {
  if (val == null) return undefined;
  return typeof val === "number" ? `${val}px` : val;
}

const rootStyle = computed(() => {
  if (!props.gutter) return "";
  const margin = addUnit(-props.gutter / 2);
  return {
    marginRight: margin,
    marginLeft: margin,
  };
});
</script>

<style>
.van-row:after {
  clear: both;
  content: "";
  display: table;
}
</style>
