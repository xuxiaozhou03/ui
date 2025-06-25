<template>
  <div
    :class="[
      'van-grid',
      props.customClass,
      props.border && !props.gutter ? 'van-hairline--top' : '',
    ]"
    :style="rootStyle"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { gridProps } from "./props";
import { addUnit } from "../../utils";

const props = defineProps(gridProps);

const rootStyle = computed(() => {
  return {
    paddingLeft: props.gutter ? addUnit(props.gutter) : undefined,
  };
});
</script>

<style>
.van-grid {
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
}
</style>
