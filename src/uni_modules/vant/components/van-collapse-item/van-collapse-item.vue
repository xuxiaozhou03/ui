<template>
  <view
    class="van-collapse-item"
    :class="[{ 'van-hairline--top': index !== 0 }, customClass]"
  >
    <van-cell
      :size="size"
      :title="title"
      title-class="title-class"
      :icon="icon"
      :value="value"
      :label="label"
      :is-link="isLink"
      :clickable="clickable"
      :border="border && expanded"
      :class="[
        'collapse-item__title',
        {
          'collapse-item__title--disabled': disabled,
          'collapse-item__title--expanded': expanded,
        },
      ]"
      right-icon-class="van-cell__right-icon"
      custom-class="van-cell"
      hover-class="van-cell--hover"
      @click="onClick"
    >
      <template #title><slot name="title" /></template>
      <template #icon><slot name="icon" /></template>
      <template #value><slot name="value" /></template>
      <template #right-icon><slot name="right-icon" /></template>
    </van-cell>
    <view class="van-collapse-item__wrapper" :style="wrapperStyle">
      <view class="van-collapse-item__content content-class">
        <slot />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, inject, computed, onMounted, watch } from "vue";
import { collapseItemProps, CollapseItemProps } from "./props";
import VanCell from "../van-cell/van-cell.vue";

const props = defineProps<CollapseItemProps>();
const {
  size,
  name,
  title,
  value,
  icon,
  label,
  disabled,
  clickable,
  border,
  isLink,
} = props;
const customClass = "";
const contentClass = "";

const collapseActiveNames = inject<any>("collapseActiveNames");
const collapseSwitch = inject<any>("collapseSwitch");

const index = ref(0);
const expanded = computed(() => {
  if (!collapseActiveNames) return false;
  const currentName = name ?? index.value;
  if (Array.isArray(collapseActiveNames.value)) {
    return collapseActiveNames.value.includes(currentName);
  }
  return collapseActiveNames.value === currentName;
});

const wrapperStyle = computed(() => ({
  height: expanded.value ? "auto" : "0",
  overflow: "hidden",
  transition: "height 0.3s",
}));

function onClick() {
  if (disabled) return;
  const currentName = name ?? index.value;
  collapseSwitch && collapseSwitch(currentName, !expanded.value);
}

onMounted(() => {
  // index 由父组件管理，简化为 0
  index.value = 0;
});

watch(
  () => props.name,
  () => {
    // 可根据父组件实际实现调整
  }
);
</script>

<style scoped>
.van-collapse-item__title .van-cell__right-icon {
  transform: rotate(90deg);
  transition: transform var(--collapse-item-transition-duration, 0.3s);
}
.van-collapse-item__title--expanded .van-cell__right-icon {
  transform: rotate(-90deg);
}
.van-collapse-item__title--disabled .van-cell,
.van-collapse-item__title--disabled .van-cell__right-icon {
  color: var(--collapse-item-title-disabled-color, #c8c9cc) !important;
}
.van-collapse-item__title--disabled .van-cell--hover {
  background-color: #fff !important;
}
.van-collapse-item__wrapper {
  overflow: hidden;
}
.van-collapse-item__content {
  background-color: var(--collapse-item-content-background-color, #fff);
  color: var(--collapse-item-content-text-color, #969799);
  font-size: var(--collapse-item-content-font-size, 13px);
  line-height: var(--collapse-item-content-line-height, 1.5);
  padding: var(--collapse-item-content-padding, 15px);
}
</style>
