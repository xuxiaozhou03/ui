<template>
  <div
    :class="[
      bem('sidebar-item', { selected, disabled }),
      selected ? 'active-class' : '',
      disabled ? 'disabled-class' : '',
      'custom-class',
    ]"
    @click="onClick"
  >
    <div class="van-sidebar-item__text">
      <van-info
        v-if="badge != null || info != null || dot"
        :dot="dot"
        :info="badge != null ? badge : info"
      />
      <template v-if="title">
        <span>{{ title }}</span>
      </template>
      <template v-else>
        <slot name="title" />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, computed, defineProps, getCurrentInstance } from "vue";
import { sidebarItemProps, SidebarItemProps } from "./props";
import VanInfo from "../van-info/van-info.vue";

const props = defineProps<SidebarItemProps>();
const sidebar = inject<any>("vanSidebar", null);
const instance = getCurrentInstance();

const index = computed(() => {
  // 通过 vnode key 或父节点 children 查找索引
  if (!instance || !instance.vnode || !instance.vnode.key) return -1;
  return Number(instance.vnode.key);
});

const selected = computed(() => {
  if (!sidebar) return false;
  return sidebar.currentActive?.value === index.value;
});

const disabled = computed(() => !!props.disabled);

function bem(name: string, mods?: any) {
  // 简化版 BEM
  if (!mods) return `van-${name}`;
  let base = `van-${name}`;
  if (typeof mods === "object") {
    Object.keys(mods).forEach((k) => {
      if (mods[k]) base += ` van-${name}--${k}`;
    });
  }
  return base;
}

function onClick() {
  if (!sidebar || disabled.value) return;
  const idx = index.value;
  if (idx < 0) return;
  sidebar.setActive(idx);
}
</script>

<style>
.van-sidebar-item {
  background-color: var(--sidebar-background-color, #f7f8fa);
  border-left: 3px solid transparent;
  box-sizing: border-box;
  color: var(--sidebar-text-color, #323233);
  display: block;
  font-size: var(--sidebar-font-size, 14px);
  line-height: var(--sidebar-line-height, 20px);
  overflow: hidden;
  padding: var(--sidebar-padding, 20px 12px 20px 8px);
  -webkit-user-select: none;
  user-select: none;
}
.van-sidebar-item__text {
  display: inline-block;
  position: relative;
  word-break: break-all;
}
.van-sidebar-item--hover:not(.van-sidebar-item--disabled) {
  background-color: var(--sidebar-active-color, #f2f3f5);
}
.van-sidebar-item:after {
  border-bottom-width: 1px;
}
.van-sidebar-item--selected {
  border-color: var(--sidebar-selected-border-color, #ee0a24);
  color: var(--sidebar-selected-text-color, #323233);
  font-weight: var(--sidebar-selected-font-weight, 500);
}
.van-sidebar-item--selected:after {
  border-right-width: 1px;
}
.van-sidebar-item--selected,
.van-sidebar-item--selected.van-sidebar-item--hover {
  background-color: var(--sidebar-selected-background-color, #fff);
}
.van-sidebar-item--disabled {
  color: var(--sidebar-disabled-text-color, #c8c9cc);
}
</style>
