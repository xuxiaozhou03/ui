<template>
  <van-popup
    v-if="poppable"
    :class="`van-calendar__popup--${position}`"
    :show="show"
    :round="round"
    :position="position"
    :closeable="showTitle || showSubtitle"
    :close-on-click-overlay="closeOnClickOverlay"
    :safe-area-inset-bottom="safeAreaInsetBottom"
    :root-portal="rootPortal"
    @enter="onOpen"
    @close="onClose"
    @after-enter="onOpened"
    @after-leave="onClosed"
  >
    <!-- 这里应插入日历主内容，可用 slot 或单独 Month/Day 组件 -->
    <slot />
  </van-popup>
  <van-toast id="van-toast" />
</template>
<script lang="ts" setup>
import { calendarProps } from "./props";

const props = defineProps(calendarProps);
const emit = defineEmits(["open", "close", "opened", "closed"]);

function onOpen(e: any) {
  emit("open", e);
}
function onClose(e: any) {
  emit("close", e);
}
function onOpened(e: any) {
  emit("opened", e);
}
function onClosed(e: any) {
  emit("closed", e);
}
</script>
<style>
.van-calendar {
  background-color: var(--calendar-background-color, #fff);
  display: flex;
  flex-direction: column;
  height: var(--calendar-height, 100%);
}
.van-calendar__close-icon {
  top: 11px;
}
.van-calendar__popup--bottom,
.van-calendar__popup--top {
  height: var(--calendar-popup-height, 90%);
}
.van-calendar__popup--left,
.van-calendar__popup--right {
  height: 100%;
}
.van-calendar__body {
  -webkit-overflow-scrolling: touch;
  flex: 1;
  overflow: auto;
}
.van-calendar__footer {
  flex-shrink: 0;
  padding: 0 var(--padding-md, 16px);
}
.van-calendar__footer--safe-area-inset-bottom {
  padding-bottom: env(safe-area-inset-bottom);
}
.van-calendar__footer + .van-calendar__footer,
.van-calendar__footer:empty {
  display: none;
}
.van-calendar__footer:empty + .van-calendar__footer {
  display: block !important;
}
.van-calendar__confirm {
  height: var(--calendar-confirm-button-height, 36px) !important;
  line-height: var(--calendar-confirm-button-line-height, 34px) !important;
  margin: var(--calendar-confirm-button-margin, 7px 0) !important;
}
</style>
