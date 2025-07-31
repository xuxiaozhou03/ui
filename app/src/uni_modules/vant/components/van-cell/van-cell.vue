<template>
  <div :class="cellClass" :style="customStyle" @click="onClick">
    <van-icon
      v-if="icon"
      :name="icon"
      custom-class="van-cell__left-icon-wrap van-cell__left-icon"
    />
    <template v-else>
      <slot name="icon" />
    </template>

    <div :style="titleStyleObj" :class="['van-cell__title', titleClass]">
      <template v-if="title">{{ title }}</template>
      <template v-else>
        <slot name="title" />
      </template>

      <div
        v-if="label || useLabelSlot"
        :class="['van-cell__label', labelClass]"
      >
        <template v-if="useLabelSlot">
          <slot name="label" />
        </template>
        <template v-else-if="label">{{ label }}</template>
      </div>
    </div>

    <div :class="['van-cell__value', valueClass]">
      <template v-if="value || value === 0">{{ value }}</template>
      <template v-else>
        <slot />
      </template>
    </div>

    <van-icon
      v-if="isLink"
      :name="arrowDirection ? 'arrow-' + arrowDirection : 'arrow'"
      custom-class="van-cell__right-icon-wrap right-icon-class van-cell__right-icon"
    />
    <template v-else>
      <slot name="right-icon" />
    </template>

    <slot name="extra" />
  </div>
</template>
<script lang="ts" setup>
import { computed, type CSSProperties } from "vue";
import { cellProps } from "./props";
import { addUnit } from "../../utils";

const props = defineProps(cellProps);

const cellClass = computed(() => [
  "van-cell",
  props.customClass,
  props.size ? `van-cell--${props.size}` : "",
  {
    "van-cell--center": props.center,
    "van-cell--required": props.required,
    "van-cell--borderless": !props.border,
    "van-cell--clickable": props.isLink || props.clickable,
    [props.hoverClass!]: !!props.hoverClass,
  },
]);

const titleStyleObj = computed(() => {
  const style: CSSProperties = {};
  if (props.titleWidth) {
    style.maxWidth = addUnit(props.titleWidth);
    style.minWidth = addUnit(props.titleWidth);
  }
  if (props.titleStyle) {
    Object.assign(style, props.titleStyle);
  }
  return style;
});

const emit = defineEmits<{
  (name: "click", event: MouseEvent): void;
}>();
function onClick(event: MouseEvent) {
  // 这里可根据需要 emit click 事件
  emit("click", event);
}
</script>
<style>
.van-cell {
  background-color: var(--cell-background-color, #fff);
  box-sizing: border-box;
  color: var(--cell-text-color, #323233);
  display: flex;
  font-size: var(--cell-font-size, 14px);
  line-height: var(--cell-line-height, 24px);
  padding: var(--cell-vertical-padding, 10px)
    var(--cell-horizontal-padding, 16px);
  position: relative;
  width: 100%;
}
.van-cell:after {
  border-bottom: 1px solid #ebedf0;
  bottom: 0;
  box-sizing: border-box;
  content: " ";
  left: 16px;
  pointer-events: none;
  position: absolute;
  right: 16px;
  transform: scaleY(0.5);
  transform-origin: center;
}
.van-cell--borderless:after {
  display: none;
}
.van-cell-group {
  background-color: var(--cell-background-color, #fff);
}
.van-cell__label {
  color: var(--cell-label-color, #969799);
  font-size: var(--cell-label-font-size, 12px);
  line-height: var(--cell-label-line-height, 18px);
  margin-top: var(--cell-label-margin-top, 3px);
}
.van-cell__value {
  color: var(--cell-value-color, #969799);
  overflow: hidden;
  text-align: right;
  vertical-align: middle;
}
.van-cell__title,
.van-cell__value {
  flex: 1;
}
.van-cell__title:empty,
.van-cell__value:empty {
  display: none;
}
.van-cell__left-icon-wrap,
.van-cell__right-icon-wrap {
  align-items: center;
  display: flex;
  font-size: var(--cell-icon-size, 16px);
  height: var(--cell-line-height, 24px);
}
.van-cell__left-icon-wrap {
  margin-right: var(--padding-base, 4px);
}
.van-cell__right-icon-wrap {
  color: var(--cell-right-icon-color, #969799);
  margin-left: var(--padding-base, 4px);
}
.van-cell__left-icon {
  vertical-align: middle;
}
.van-cell__left-icon,
.van-cell__right-icon {
  line-height: var(--cell-line-height, 24px);
}
.van-cell--clickable.van-cell--hover,
.van-cell--clickable:active {
  background-color: var(--cell-active-color, #f2f3f5);
}
.van-cell--required {
  overflow: visible;
}
.van-cell--required:before {
  color: var(--cell-required-color, #ee0a24);
  content: "*";
  font-size: var(--cell-font-size, 14px);
  left: var(--padding-xs, 8px);
  position: absolute;
}
.van-cell--center {
  align-items: center;
}
.van-cell--large {
  padding-bottom: var(--cell-large-vertical-padding, 12px);
  padding-top: var(--cell-large-vertical-padding, 12px);
}
.van-cell--large .van-cell__title {
  font-size: var(--cell-large-title-font-size, 16px);
}
.van-cell--large .van-cell__value {
  font-size: var(--cell-large-value-font-size, 16px);
}
.van-cell--large .van-cell__label {
  font-size: var(--cell-large-label-font-size, 14px);
}
</style>
