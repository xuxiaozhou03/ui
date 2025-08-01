<template>
  <div
    :class="[
      'van-grid',
      { 'van-hairline--top': border && !gutter },
      customClass,
    ]"
    :style="{ paddingLeft: addUnit(gutter) }"
  >
    <slot />
  </div>
</template>
<script lang="ts" setup>
import { useProvideParent } from "../../composables/useRelation";
import { addUnit } from "../../utils";
import { gridKey, gridProps } from "./props";

const props = defineProps(gridProps);

useProvideParent(gridKey, props);
</script>
<style>
.van-grid {
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
}
</style>
