<template>
  <div class="van-cascader">
    <div v-if="showHeader" class="van-cascader__header">
      <slot name="title" v-if="useTitleSlot"></slot>
      <span class="van-cascader__title" v-else>{{ title }}</span>
      <van-icon
        v-if="closeable"
        :name="closeIcon"
        class="van-cascader__close-icon"
        @click="onClose"
      />
    </div>
    <van-tabs
      v-model:active="activeTab"
      class="van-cascader__tabs"
      wrap-class="van-cascader__tabs-wrap"
      tab-class="van-cascader__tab"
      :color="activeColor"
      :border="false"
      :swipeable="swipeable"
      :ellipsis="ellipsis"
      @click="onClickTab"
    >
      <van-tab
        v-for="(tab, tabIndex) in tabs"
        :key="tabIndex"
        :title="tab.selected ? tab.selected[textKey] : placeholder"
        :title-style="!tab.selected ? 'color: #969799;font-weight:normal;' : ''"
        style="width: 100%"
      >
        <div class="van-cascader__options">
          <div
            v-for="(option, index) in tab.options"
            :key="index"
            :class="[option.className, optionClass(tab, valueKey, option)]"
            :style="optionStyle(tab, valueKey, option, activeColor)"
            @click="onSelect(option, tabIndex)"
          >
            <span>{{ option[textKey] }}</span>
            <van-icon
              v-if="isSelected(tab, valueKey, option)"
              name="success"
              size="18"
            />
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { cn, bem } from "../../utils";
import { cascaderProps } from "./props";

const props = defineProps(cascaderProps);
const emit = defineEmits(["close", "select", "click-tab"]);

const tabs = ref<any[]>([]);
const activeTab = ref(0);
const textKey = ref(props.fieldNames?.text || "text");
const valueKey = ref(props.fieldNames?.value || "value");
const childrenKey = ref(props.fieldNames?.children || "children");

function onClose() {
  emit("close");
}
function onClickTab(tabIndex: number) {
  emit("click-tab", tabIndex);
}
function onSelect(option: any, tabIndex: number) {
  emit("select", { option, tabIndex });
}
function optionClass(tab: any, valueKey: string, option: any) {
  // 可根据原 utils.optionClass 逻辑补充
  return "";
}
function optionStyle(
  tab: any,
  valueKey: string,
  option: any,
  activeColor: string
) {
  // 可根据原 utils.optionStyle 逻辑补充
  return {};
}
function isSelected(tab: any, valueKey: string, option: any) {
  // 可根据原 utils.isSelected 逻辑补充
  return false;
}
</script>
<style>
.van-cascader__header {
  align-items: center;
  display: flex;
  height: 48px;
  justify-content: space-between;
  padding: 0 16px;
}
.van-cascader__title {
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
}
.van-cascader__close-icon {
  color: #c8c9cc;
  font-size: 22px;
  height: 22px;
}
.van-cascader__tabs-wrap {
  height: 48px !important;
  padding: 0 8px;
}
.van-cascader__tab {
  color: #323233 !important;
  flex: none !important;
  font-weight: 600 !important;
  padding: 0 8px !important;
}
.van-cascader__tab--unselected {
  color: #969799 !important;
  font-weight: 400 !important;
}
.van-cascader__option {
  align-items: center;
  cursor: pointer;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  line-height: 20px;
  padding: 10px 16px;
}
.van-cascader__option:active {
  background-color: #f2f3f5;
}
.van-cascader__option--selected {
  color: #1989fa;
  font-weight: 600;
}
.van-cascader__option--disabled {
  color: #c8c9cc;
  cursor: not-allowed;
}
.van-cascader__option--disabled:active {
  background-color: initial;
}
.van-cascader__options {
  -webkit-overflow-scrolling: touch;
  box-sizing: border-box;
  height: 384px;
  overflow-y: auto;
  padding-top: 6px;
}
</style>
