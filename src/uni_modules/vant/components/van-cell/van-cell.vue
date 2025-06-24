<template>
  <view
    :class="[
      'van-cell',
      size ? `van-cell--${size}` : '',
      {
        'van-cell--center': center,
        'van-cell--required': required,
        'van-cell--borderless': !border,
        'van-cell--clickable': isLink || clickable,
      },
      customClass,
    ]"
    :hover-class="isLink || clickable ? 'van-cell--hover' : ''"
    hover-stay-time="70"
    :style="customStyle"
    @tap="onClick"
  >
    <template v-if="icon">
      <van-icon :name="icon" class="van-cell__left-icon" />
    </template>
    <template v-else>
      <slot name="icon" />
    </template>

    <view
      :style="titleStyleComputed"
      class="van-cell__title"
      :class="titleClass"
    >
      <template v-if="title">{{ title }}</template>
      <template v-else>
        <slot name="title" />
      </template>
      <view
        v-if="label || useLabelSlot"
        class="van-cell__label"
        :class="labelClass"
      >
        <template v-if="useLabelSlot">
          <slot name="label" />
        </template>
        <template v-else-if="label">{{ label }}</template>
      </view>
    </view>

    <view class="van-cell__value" :class="valueClass">
      <template v-if="value || value === 0">{{ value }}</template>
      <template v-else>
        <slot />
      </template>
    </view>

    <template v-if="isLink">
      <van-icon
        :name="arrowDirection ? `arrow-${arrowDirection}` : 'arrow'"
        class="van-cell__right-icon"
      />
    </template>
    <template v-else>
      <slot name="right-icon" />
    </template>

    <slot name="extra" />
  </view>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { cellProps, CellProps } from "./props";
import VanIcon from "../icon/van-icon.vue";

const props = defineProps<CellProps>();
const emit = defineEmits(["click"]);

const router = useRouter();

const onClick = (event: Event) => {
  emit("click", event);
  if (props.isLink || props.clickable) {
    jumpLink();
  }
};

function addUnit(value?: string | number) {
  if (value == null) return undefined;
  return typeof value === "number" ? `${value}px` : value;
}

const titleStyleComputed = computed(() => {
  const style: Record<string, string | undefined> = {};
  if (props.titleStyle) Object.assign(style, props.titleStyle);
  if (props.titleWidth) {
    style["max-width"] = addUnit(props.titleWidth);
    style["min-width"] = addUnit(props.titleWidth);
  }
  return style;
});

function jumpLink() {
  if (props.url) {
    window.location.href = props.url;
  } else if (props.to && router) {
    router[props.replace ? "replace" : "push"](props.to);
  }
}
</script>

<style scoped>
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
.van-cell--clickable.van-cell--hover {
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
