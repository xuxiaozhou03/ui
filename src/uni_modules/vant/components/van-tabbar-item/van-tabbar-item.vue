<template>
  <div
    :class="['van-tabbar-item', { 'van-tabbar-item--active': active }, 'custom-class']"
    :style="{ color: active ? activeColor : inactiveColor }"
    @click="onClick"
  >
    <div class="van-tabbar-item__icon">
      <template v-if="icon">
        <van-icon :name="icon" :class-prefix="iconPrefix" class="van-tabbar-item__icon__inner" />
      </template>
      <template v-else>
        <slot v-if="active" name="icon-active" />
        <slot v-else name="icon" />
      </template>
      <van-info :dot="dot" :info="info" class="van-tabbar-item__info" />
    </div>
    <div class="van-tabbar-item__text">
      <slot />
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, inject } from 'vue';
import { tabbarItemProps } from './props';

const props = defineProps(tabbarItemProps);
const tabbar = inject<any>('vanTabbar', {});

const active = computed(() => {
  if (props.name != null && props.name !== '') {
    return tabbar.active?.value === props.name;
  }
  // fallback: index 由父组件顺序决定，需父组件传递 index，简化为 always false
  return false;
});
const activeColor = computed(() => tabbar.activeColor?.value || '');
const inactiveColor = computed(() => tabbar.inactiveColor?.value || '');

function onClick() {
  if (tabbar && typeof tabbar.active?.value !== 'undefined') {
    const value = props.name != null && props.name !== '' ? props.name : undefined;
    tabbar.active.value = value;
    // 触发父组件 change 事件（需父组件实现）
    if (tabbar.onChange) tabbar.onChange(value);
  }
  if (props.url) {
    window.open(props.url, '_self');
  }
}
</script>
<style scoped>
:host {
  flex: 1;
}
.van-tabbar-item {
  align-items: center;
  color: var(--tabbar-item-text-color, #646566);
  display: flex;
  flex-direction: column;
  font-size: var(--tabbar-item-font-size, 12px);
  height: 100%;
  justify-content: center;
  line-height: var(--tabbar-item-line-height, 1);
}
.van-tabbar-item__icon {
  font-size: var(--tabbar-item-icon-size, 22px);
  margin-bottom: var(--tabbar-item-margin-bottom, 4px);
  position: relative;
}
.van-tabbar-item__icon__inner {
  display: block;
  min-width: 1em;
}
.van-tabbar-item--active {
  color: var(--tabbar-item-active-color, #1989fa);
}
.van-tabbar-item__info {
  margin-top: 2px;
}
</style>
