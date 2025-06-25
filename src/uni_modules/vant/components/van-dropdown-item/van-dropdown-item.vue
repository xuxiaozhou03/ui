<template>
  <div v-if="showWrapper" :class="bem('dropdown-item')">
    <van-popup
      :style="{
        position: 'absolute',
        ...(props.popupStyle ? { ...props.popupStyle } : {}),
      }"
      :overlay="true"
      :position="'top'"
      :duration="200"
      :safe-area-tab-bar="false"
      :close-on-click-overlay="true"
      :root-portal="props.rootPortal"
      @enter="onOpen"
      @leave="onClose"
      @close="onClose"
      @after-enter="onOpened"
      @after-leave="onClosed"
    >
      <van-cell
        v-for="item in props.options"
        :key="item.value"
        :class="
          bem('dropdown-item__option', { active: item.value === props.value })
        "
        clickable
        :icon="item.icon"
        @click="() => onOptionTap(item)"
      >
        <template #title>
          <span
            class="van-dropdown-item__title item-title-class"
            :style="
              item.value === props.value ? { color: props.activeColor } : {}
            "
          >
            {{ item.text }}
          </span>
        </template>
        <van-icon
          v-if="item.value === props.value"
          name="success"
          class="van-dropdown-item__icon"
          :color="props.activeColor"
        />
      </van-cell>
      <slot />
    </van-popup>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { dropdownItemProps, DropdownItemProps } from "./props";
import { cn, bem } from "../../utils";

const props = defineProps(dropdownItemProps);
const emit = defineEmits<{
  (e: "update:value", val: string | number): void;
  (e: "change", val: string | number): void;
  (e: "open"): void;
  (e: "close"): void;
  (e: "opened"): void;
  (e: "closed"): void;
}>();

const showWrapper = ref(true); // 具体逻辑可根据父组件控制

function onOptionTap(option: any) {
  if (props.disabled) return;
  emit("update:value", option.value);
  emit("change", option.value);
}
function onOpen() {
  emit("open");
}
function onClose() {
  emit("close");
}
function onOpened() {
  emit("opened");
}
function onClosed() {
  emit("closed");
}
</script>

<style>
.van-dropdown-item {
  left: 0;
  overflow: hidden;
  position: fixed;
  right: 0;
}
.van-dropdown-item__option {
  text-align: left;
}
.van-dropdown-item__option--active .van-dropdown-item__icon,
.van-dropdown-item__option--active .van-dropdown-item__title {
  color: var(--dropdown-menu-option-active-color, #ee0a24);
}
.van-dropdown-item--up {
  top: 0;
}
.van-dropdown-item--down {
  bottom: 0;
}
.van-dropdown-item__icon {
  display: block;
  line-height: inherit;
}
</style>
