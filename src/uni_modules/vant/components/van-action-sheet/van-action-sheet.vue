<template>
  <van-popup
    v-model:show="show"
    position="bottom"
    :round="round"
    :z-index="zIndex"
    :overlay="overlay"
    class="van-action-sheet"
    :safe-area-inset-bottom="safeAreaInsetBottom"
    :close-on-click-overlay="closeOnClickOverlay"
    :root-portal="rootPortal"
    @close="onClickOverlay"
  >
    <template v-if="title">
      <view class="van-action-sheet__header">
        {{ title }}
        <van-icon
          name="cross"
          class="van-action-sheet__close"
          @click="onClose"
        />
      </view>
    </template>
    <template v-if="description">
      <view class="van-action-sheet__description van-hairline--bottom">
        {{ description }}
      </view>
    </template>
    <template v-if="actions && actions.length">
      <view class="list-class">
        <button
          v-for="(item, index) in actions"
          :key="index"
          :open-type="item.disabled || item.loading ? '' : item.openType"
          :style="item.color ? { color: item.color } : {}"
          :class="
            cn(
              bem('action-sheet__item', {
                disabled: item.disabled || item.loading,
              }),
              item.className
            )
          "
          hover-class="van-action-sheet__item--hover"
          @click="!item.disabled && !item.loading && onSelect(item)"
        >
          <template v-if="!item.loading">
            {{ item.name }}
            <view v-if="item.subname" class="van-action-sheet__subname">{{
              item.subname
            }}</view>
          </template>
          <van-loading v-else class="van-action-sheet__loading" size="22px" />
        </button>
      </view>
    </template>
    <slot />
    <template v-if="cancelText">
      <view class="van-action-sheet__gap" />
      <view
        class="van-action-sheet__cancel"
        hover-class="van-action-sheet__cancel--hover"
        hover-stay-time="70"
        @click="onCancel"
      >
        {{ cancelText }}
      </view>
    </template>
  </van-popup>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { cn, bem } from "../../utils";
import {
  actionSheetProps,
  type ActionSheetProps,
  type ActionSheetAction,
} from "./props";

const props = defineProps(actionSheetProps);
const emit = defineEmits<{
  (e: "select", item: ActionSheetAction): void;
  (e: "cancel"): void;
  (e: "close"): void;
  (e: "click-overlay"): void;
}>();

const show = computed({
  get: () => props.show,
  set: (val: boolean) => emit("close"),
});

function onSelect(item: ActionSheetAction) {
  emit("select", item);
  if (props.closeOnClickAction) {
    emit("close");
  }
}
function onCancel() {
  emit("cancel");
}
function onClose() {
  emit("close");
}
function onClickOverlay() {
  emit("click-overlay");
  emit("close");
}
</script>
<style>
@import "../common/index.wxss";
.van-action-sheet {
  color: var(--action-sheet-item-text-color, #323233);
  max-height: var(--action-sheet-max-height, 90%) !important;
}
.van-action-sheet__cancel,
.van-action-sheet__item {
  background-color: var(--action-sheet-item-background, #fff);
  font-size: var(--action-sheet-item-font-size, 16px);
  line-height: var(--action-sheet-item-line-height, 22px);
  padding: 14px 16px;
  text-align: center;
}
.van-action-sheet__cancel--hover,
.van-action-sheet__item--hover {
  background-color: #f2f3f5;
}
.van-action-sheet__cancel:after,
.van-action-sheet__item:after {
  border-width: 0;
}
.van-action-sheet__cancel {
  color: var(--action-sheet-cancel-text-color, #646566);
}
.van-action-sheet__gap {
  background-color: var(--action-sheet-cancel-padding-color, #f7f8fa);
  display: block;
  height: var(--action-sheet-cancel-padding-top, 8px);
}
.van-action-sheet__item--disabled {
  color: var(--action-sheet-item-disabled-text-color, #c8c9cc);
}
.van-action-sheet__item--disabled.van-action-sheet__item--hover {
  background-color: var(--action-sheet-item-background, #fff);
}
.van-action-sheet__subname {
  color: var(--action-sheet-subname-color, #969799);
  font-size: var(--action-sheet-subname-font-size, 12px);
  line-height: var(--action-sheet-subname-line-height, 20px);
  margin-top: var(--padding-xs, 8px);
}
.van-action-sheet__header {
  font-size: var(--action-sheet-header-font-size, 16px);
  font-weight: var(--font-weight-bold, 500);
  line-height: var(--action-sheet-header-height, 48px);
  text-align: center;
}
.van-action-sheet__description {
  color: var(--action-sheet-description-color, #969799);
  font-size: var(--action-sheet-description-font-size, 14px);
  line-height: var(--action-sheet-description-line-height, 20px);
  padding: 20px var(--padding-md, 16px);
  text-align: center;
}
.van-action-sheet__close {
  color: var(--action-sheet-close-icon-color, #c8c9cc);
  font-size: var(--action-sheet-close-icon-size, 22px) !important;
  line-height: inherit !important;
  padding: var(--action-sheet-close-icon-padding, 0 16px);
  position: absolute !important;
  right: 0;
  top: 0;
}
.van-action-sheet__loading {
  display: flex !important;
}
</style>
