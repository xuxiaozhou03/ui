<template>
  <view
    :class="[
      'van-cell-group',
      { 'van-cell-group--inset': inset, 'van-hairline--top-bottom': border },
      customClass,
    ]"
  >
    <template v-if="title">
      <view
        :class="[
          'van-cell-group__title',
          { 'van-cell-group__title--inset': inset },
        ]"
      >
        {{ title }}
      </view>
    </template>
    <slot />
  </view>
</template>

<script setup lang="ts">
import { cellGroupProps } from "./props";
defineProps(cellGroupProps);
</script>

<style scoped>
.van-cell-group--inset {
  border-radius: var(--cell-group-inset-border-radius, 8px);
  margin: var(--cell-group-inset-padding, 0 16px);
  overflow: hidden;
}
.van-cell-group__title {
  color: var(--cell-group-title-color, #969799);
  font-size: var(--cell-group-title-font-size, 14px);
  line-height: var(--cell-group-title-line-height, 16px);
  padding: var(--cell-group-title-padding, 16px 16px 8px);
}
.van-cell-group__title--inset {
  padding: var(--cell-group-inset-title-padding, 16px 16px 8px 32px);
}
</style>
