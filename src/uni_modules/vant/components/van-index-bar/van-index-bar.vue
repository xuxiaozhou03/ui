<template>
  <view class="van-index-bar">
    <slot />
    <view
      v-if="showSidebar"
      class="van-index-bar__sidebar"
      @click="onClick"
      @touchmove="onTouchMove"
      @touchend="onTouchStop"
      @touchcancel="onTouchStop"
    >
      <view
        v-for="(item, index) in indexList"
        :key="index"
        class="van-index-bar__index"
        :style="{
          zIndex: zIndex + 1,
          color: activeAnchorIndex === index ? highlightColor : '',
        }"
        @click="onClickIndex(index)"
      >
        {{ item }}
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue';
import { indexBarProps } from './props';

default defineProps(indexBarProps);

const props = defineProps(indexBarProps);
const emit = defineEmits(['select']);

const showSidebar = ref(false);
const activeAnchorIndex = ref(-1);
const scrollTop = ref(0);
const sidebar = ref<{ height: number; top: number } | null>(null);
const children = ref<any[]>([]); // 需与 index-anchor 组件通信

// 省略复杂逻辑，建议后续补充完整 anchor 交互
function onClickIndex(index: number) {
  emit('select', props.indexList[index]);
}
function onClick() {}
function onTouchMove() {}
function onTouchStop() {}

// ...可继续补充 sticky、滚动等逻辑
</script>

<style>
.van-index-bar {
  position: relative;
}
.van-index-bar__sidebar {
  display: flex;
  flex-direction: column;
  position: fixed;
  right: 0;
  text-align: center;
  top: 50%;
  transform: translateY(-50%);
  -webkit-user-select: none;
  user-select: none;
}
.van-index-bar__index {
  font-size: var(--index-bar-index-font-size, 10px);
  font-weight: 500;
  line-height: var(--index-bar-index-line-height, 14px);
  padding: 0 var(--padding-base, 4px) 0 var(--padding-md, 16px);
}
</style>
