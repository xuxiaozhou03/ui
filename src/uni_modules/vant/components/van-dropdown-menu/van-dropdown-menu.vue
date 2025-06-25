<template>
  <div
    :class="
      cn('van-dropdown-menu', 'van-dropdown-menu--top-bottom', 'custom-class')
    "
  >
    <div
      v-for="(item, index) in itemListData"
      :key="index"
      :data-index="index"
      :class="bem('dropdown-menu__item', { disabled: item.disabled })"
      @click="onTitleTap(index)"
    >
      <div
        :class="[
          item.titleClass,
          bem('dropdown-menu__title', {
            active: item.showPopup,
            down: item.showPopup === (direction === 'down'),
          }),
          'title-class',
        ]"
        :style="item.showPopup ? { color: props.activeColor } : {}"
      >
        <div class="van-ellipsis">
          {{ displayTitle(item) }}
        </div>
      </div>
    </div>
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, provide } from "vue";
import { vanDropdownMenuProps } from "./props";
import { cn, bem, addUnit } from "../../utils";

const props = defineProps(vanDropdownMenuProps);

// 子项数据
const itemListData = ref<any[]>([]);

// 供 van-dropdown-item 注入注册
function registerItem(item: any) {
  itemListData.value.push(item);
}
provide("vanDropdownMenuRegisterItem", registerItem);

const direction = computed(() => props.direction);

function displayTitle(item: any) {
  if (item.title) return item.title;
  const match = (item.options || []).filter(
    (option: any) => option.value === item.value
  );
  return match.length ? match[0].text : "";
}

function onTitleTap(index: number) {
  // 这里应实现切换逻辑，具体可根据业务补充
}
</script>

<style>
.van-dropdown-menu {
  background-color: var(--dropdown-menu-background-color, #fff);
  box-shadow: var(
    --dropdown-menu-box-shadow,
    0 2px 12px hsla(210, 1%, 40%, 0.12)
  );
  display: flex;
  height: var(--dropdown-menu-height, 50px);
  -webkit-user-select: none;
  user-select: none;
}
.van-dropdown-menu__item {
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: center;
  min-width: 0;
}
.van-dropdown-menu__item:active {
  opacity: 0.7;
}
.van-dropdown-menu__item--disabled:active {
  opacity: 1;
}
.van-dropdown-menu__item--disabled .van-dropdown-menu__title {
  color: var(--dropdown-menu-title-disabled-text-color, #969799);
}
.van-dropdown-menu__title {
  box-sizing: border-box;
  color: var(--dropdown-menu-title-text-color, #323233);
  font-size: var(--dropdown-menu-title-font-size, 15px);
  line-height: var(--dropdown-menu-title-line-height, 18px);
  max-width: 100%;
  padding: var(--dropdown-menu-title-padding, 0 24px 0 8px);
  position: relative;
}
.van-dropdown-menu__title:after {
  border-color: transparent transparent currentcolor currentcolor;
  border-style: solid;
  border-width: 3px;
  content: "";
  margin-top: -5px;
  opacity: 0.8;
  position: absolute;
  right: 11px;
  top: 50%;
  transform: rotate(-45deg);
}
.van-dropdown-menu__title--active {
  color: var(--dropdown-menu-title-active-text-color, #ee0a24);
}
.van-dropdown-menu__title--down:after {
  margin-top: -1px;
  transform: rotate(135deg);
}
</style>
