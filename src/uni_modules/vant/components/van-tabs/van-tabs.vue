<template>
  <div class="van-tabs custom-class">
    <van-sticky
      v-if="sticky"
      :z-index="zIndex"
      :offset-top="offsetTop"
      @scroll="onTouchScroll"
    >
      <div
        :class="[
          `van-tabs--${type}`,
          'van-tabs__wrap',
          {
            'van-hairline--top-bottom': type === 'line' && border,
            'van-tabs__wrap--scrollable': scrollable,
          },
        ]"
      >
        <slot name="nav-left" />
        <div class="van-tabs__scroll" :style="{ borderColor: color }">
          <div class="van-tabs__nav" :style="navStyle">
            <div
              v-if="type === 'line'"
              class="van-tabs__line"
              :style="lineStyle"
            />
            <div
              v-for="(tab, index) in tabs"
              :key="tab.name ?? index"
              :class="tabClass(index === currentIndex, ellipsis, tab.disabled)"
              :style="tabStyle(index === currentIndex, tab)"
              @click="onTap(index, tab)"
            >
              <div
                :class="ellipsis ? 'van-ellipsis' : ''"
                :style="tab.titleStyle"
              >
                {{ tab.title }}
                <van-info
                  v-if="tab.info !== null || tab.dot"
                  :info="tab.info"
                  :dot="tab.dot"
                  class="van-tab__title__info"
                />
              </div>
            </div>
          </div>
        </div>
        <slot name="nav-right" />
      </div>
    </van-sticky>
    <div
      class="van-tabs__content"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
      @touchcancel="onTouchEnd"
    >
      <div
        :class="['van-tabs__track', { 'van-tabs__track--animated': animated }]"
        :style="trackStyle"
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, defineProps, defineEmits } from "vue";
import { tabsProps } from "./props";

const props = defineProps(tabsProps);
const emit = defineEmits<{
  (e: "update:active", value: string | number): void;
  (e: "change", value: string | number): void;
  (e: "click", value: string | number): void;
  (e: "disabled", value: string | number): void;
  (e: "before-change", value: string | number): void;
  (e: "scroll", detail: any): void;
}>();

const tabs = ref<any[]>([]); // 需由父组件/slot注入或外部传入
const currentIndex = ref(0);
const scrollable = computed(
  () => tabs.value.length > props.swipeThreshold || !props.ellipsis
);
const ellipsis = computed(() => props.ellipsis);
const type = computed(() => props.type);
const zIndex = computed(() => props.zIndex);
const offsetTop = computed(() => props.offsetTop);
const color = computed(() => props.color);
const border = computed(() => props.border);
const animated = computed(() => props.animated);

function tabClass(active: boolean, ellipsis: boolean, disabled: boolean) {
  return [
    "van-tab",
    {
      "van-tab--active": active,
      "van-tab--disabled": disabled,
      "van-ellipsis": ellipsis,
    },
  ];
}
function tabStyle(active: boolean, tab: any) {
  const titleColor = active ? props.titleActiveColor : props.titleInactiveColor;
  return {
    color: titleColor,
    ...tab.titleStyle,
  };
}
const navStyle = computed(() => ({
  borderColor: type.value === "card" && color.value ? color.value : undefined,
}));
const lineStyle = computed(() => ({
  width:
    typeof props.lineWidth === "number"
      ? `${props.lineWidth}px`
      : props.lineWidth,
  backgroundColor: color.value,
}));
const trackStyle = computed(() => {
  if (!animated.value) return {};
  return {
    left: `-${100 * currentIndex.value}%`,
    transitionDuration: `${props.duration}s`,
  };
});
function onTap(index: number, tab: any) {
  if (tab.disabled) {
    emit("disabled", tab.name ?? index);
    return;
  }
  emit("click", tab.name ?? index);
  if (currentIndex.value !== index) {
    currentIndex.value = index;
    emit("update:active", tab.name ?? index);
    emit("change", tab.name ?? index);
  }
}
function onTouchScroll(e: any) {
  emit("scroll", e);
}
function onTouchStart() {}
function onTouchMove() {}
function onTouchEnd() {}
// 省略部分高级逻辑，后续可补充
</script>

<style>
.van-tabs {
  -webkit-tap-highlight-color: transparent;
  position: relative;
}
.van-tabs__wrap {
  display: flex;
  overflow: hidden;
}
.van-tabs__wrap--scrollable .van-tab {
  flex: 0 0 22%;
}
.van-tabs__wrap--scrollable .van-tab--complete {
  flex: 1 0 auto !important;
  padding: 0 12px;
}
.van-tabs__wrap--scrollable .van-tabs__nav--complete {
  padding-left: 8px;
  padding-right: 8px;
}
.van-tabs__scroll {
  background-color: var(--tabs-nav-background-color, #fff);
  overflow: auto;
}
.van-tabs__scroll--line {
  box-sizing: initial;
  height: calc(100% + 15px);
}
.van-tabs__scroll--card {
  border: 1px solid var(--tabs-default-color, #ee0a24);
  border-radius: 2px;
  box-sizing: border-box;
  margin: 0 var(--padding-md, 16px);
  width: calc(100% - var(--padding-md, 16px) * 2);
}
.van-tabs__scroll::-webkit-scrollbar {
  display: none;
}
.van-tabs__nav {
  display: flex;
  position: relative;
  -webkit-user-select: none;
  user-select: none;
}
.van-tabs__nav--card {
  box-sizing: border-box;
  height: var(--tabs-card-height, 30px);
}
.van-tabs__nav--card .van-tab {
  border-right: 1px solid var(--tabs-default-color, #ee0a24);
  color: var(--tabs-default-color, #ee0a24);
  line-height: calc(var(--tabs-card-height, 30px) - 2px);
}
.van-tabs__nav--card .van-tab:last-child {
  border-right: none;
}
.van-tabs__nav--card .van-tab.van-tab--active {
  background-color: var(--tabs-default-color, #ee0a24);
  color: #fff;
}
.van-tabs__nav--card .van-tab--disabled {
  color: var(--tab-disabled-text-color, #c8c9cc);
}
.van-tabs__line {
  background-color: var(--tabs-bottom-bar-color, #ee0a24);
  border-radius: var(--tabs-bottom-bar-height, 3px);
  bottom: 0;
  height: var(--tabs-bottom-bar-height, 3px);
  left: 0;
  opacity: 0;
  position: absolute;
  z-index: 1;
}
.van-tabs__track {
  height: 100%;
  position: relative;
  width: 100%;
}
.van-tabs__track--animated {
  display: flex;
  transition-property: left;
}
.van-tabs__content {
  overflow: hidden;
}
.van-tabs--line {
  height: var(--tabs-line-height, 44px);
}
.van-tabs--card {
  height: var(--tabs-card-height, 30px);
}
.van-tab {
  box-sizing: border-box;
  color: var(--tab-text-color, #646566);
  cursor: pointer;
  flex: 1;
  font-size: var(--tab-font-size, 14px);
  line-height: var(--tabs-line-height, 44px);
  min-width: 0;
  padding: 0 5px;
  position: relative;
  text-align: center;
}
.van-tab--active {
  color: var(--tab-active-text-color, #323233);
  font-weight: var(--font-weight-bold, 500);
}
.van-tab--disabled {
  color: var(--tab-disabled-text-color, #c8c9cc);
}
.van-tab__title__info {
  position: relative !important;
  top: -1px !important;
  transform: translateX(0) !important;
}
</style>
