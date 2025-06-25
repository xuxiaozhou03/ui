<template>
  <div class="van-picker custom-class">
    <!-- 顶部工具栏，可根据 toolbarPosition 控制显示位置 -->
    <slot name="toolbar" v-if="toolbarPosition === 'top'" />

    <div v-if="loading" class="van-picker__loading">
      <van-loading color="#1989fa" />
    </div>

    <div class="van-picker__columns" :style="columnsStyle" @touchmove.prevent>
      <van-picker-column
        v-for="(item, index) in columnsData"
        :key="index"
        class="van-picker__column column-class"
        :value-key="valueKey"
        :initial-options="item.values"
        :default-index="item.defaultIndex ?? defaultIndex"
        :item-height="itemHeight"
        :visible-item-count="visibleItemCount"
        active-class="active-class"
        @change="onChange($event, index)"
      />
      <div class="van-picker__mask" :style="maskStyle" />
      <div
        class="van-picker__frame van-hairline--top-bottom"
        :style="frameStyle"
      />
    </div>

    <slot name="toolbar" v-if="toolbarPosition === 'bottom'" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { pickerProps } from "./props";
import { addUnit } from "../../utils";

const props = defineProps(pickerProps);
const emit = defineEmits(["change", "confirm", "cancel"]);

const loading = computed(() => props.loading);
const valueKey = computed(() => props.valueKey ?? "text");
const toolbarPosition = computed(() => props.toolbarPosition ?? "top");
const defaultIndex = computed(() => props.defaultIndex ?? 0);
const itemHeight = computed(() => props.itemHeight);
const visibleItemCount = computed(() => props.visibleItemCount);

// columns 兼容一维/多维
const columnsData = computed(() => {
  const columns = props.columns || [];
  if (columns.length && !columns[0].values) {
    return [{ values: columns }];
  }
  return columns;
});

const columnsStyle = computed(() => ({
  height: addUnit(itemHeight.value * visibleItemCount.value),
}));
const maskStyle = computed(() => ({
  backgroundSize: `100% ${addUnit(
    (itemHeight.value * (visibleItemCount.value - 1)) / 2
  )}`,
}));
const frameStyle = computed(() => ({
  height: addUnit(itemHeight.value),
}));

function onChange(event: any, index: number) {
  // 这里 event.detail.value 是当前列的值
  emit("change", {
    picker: null, // Vue 3 需通过 ref 获取实例
    value: event.detail.value,
    index,
  });
}
</script>

<style>
.van-picker {
  -webkit-text-size-adjust: 100%;
  background-color: var(--picker-background-color, #fff);
  overflow: hidden;
  position: relative;
  -webkit-user-select: none;
  user-select: none;
}
.van-picker__toolbar {
  display: flex;
  height: var(--picker-toolbar-height, 44px);
  justify-content: space-between;
  line-height: var(--picker-toolbar-height, 44px);
}
.van-picker__cancel,
.van-picker__confirm {
  font-size: var(--picker-action-font-size, 14px);
  padding: var(--picker-action-padding, 0 16px);
}
.van-picker__cancel--hover,
.van-picker__confirm--hover {
  opacity: 0.7;
}
.van-picker__confirm {
  color: var(--picker-confirm-action-color, #576b95);
}
.van-picker__cancel {
  color: var(--picker-cancel-action-color, #969799);
}
.van-picker__title {
  font-size: var(--picker-option-font-size, 16px);
  font-weight: var(--font-weight-bold, 500);
  max-width: 50%;
  text-align: center;
}
.van-picker__columns {
  display: flex;
  position: relative;
}
.van-picker__column {
  flex: 1 1;
  width: 0;
}
.van-picker__loading {
  align-items: center;
  background-color: var(--picker-loading-mask-color, hsla(0, 0%, 100%, 0.9));
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 4;
}
.van-picker__mask {
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  background-image: linear-gradient(
      180deg,
      hsla(0, 0%, 100%, 0.9),
      hsla(0, 0%, 100%, 0.4)
    ),
    linear-gradient(0deg, hsla(0, 0%, 100%, 0.9), hsla(0, 0%, 100%, 0.4));
  background-position: top, bottom;
  background-repeat: no-repeat;
  height: 100%;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 2;
}
.van-picker__frame,
.van-picker__mask {
  pointer-events: none;
  position: absolute;
}
.van-picker__frame {
  left: 16px;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
}
</style>
