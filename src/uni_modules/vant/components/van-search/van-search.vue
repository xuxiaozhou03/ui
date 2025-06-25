<template>
  <div
    :class="[
      bem('search', { withaction: showAction || useActionSlot }),
      'custom-class',
    ]"
    :style="{ background }"
  >
    <div :class="bem('search__content', [shape])">
      <template v-if="label">
        <span class="van-search__label">{{ label }}</span>
      </template>
      <template v-else>
        <slot name="label" />
      </template>
      <van-field
        v-model="inputValue"
        type="search"
        :left-icon="!useLeftIconSlot ? leftIcon : undefined"
        :right-icon="!useRightIconSlot ? rightIcon : undefined"
        :focus="focus"
        :error="error"
        :border="false"
        confirm-type="search"
        class="van-search__field field-class"
        :disabled="disabled"
        :readonly="readonly"
        :clearable="clearable"
        :clear-trigger="clearTrigger"
        :clear-icon="clearIcon"
        :maxlength="maxlength"
        :input-align="inputAlign"
        input-class="input-class"
        :placeholder="placeholder"
        :placeholder-style="placeholderStyle"
        :cursor-spacing="cursorSpacing"
        custom-style="padding: 5px 10px 5px 0; background-color: transparent;"
        @blur="onBlur"
        @focus="onFocus"
        @change="onChange"
        @confirm="onSearch"
        @clear="onClear"
        @click-input="onClickInput"
      >
        <template v-if="useLeftIconSlot" #left-icon>
          <slot name="left-icon" />
        </template>
        <template v-if="useRightIconSlot" #right-icon>
          <slot name="right-icon" />
        </template>
      </van-field>
    </div>
    <div v-if="showAction || useActionSlot" class="van-search__action">
      <template v-if="useActionSlot">
        <slot name="action" />
      </template>
      <template v-else>
        <span
          class="van-search__action-button cancel-class"
          @click="onCancel"
          >{{ actionText }}</span
        >
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { searchProps, SearchProps } from "./props";
import VanField from "../van-field/van-field.vue";

const props = defineProps<SearchProps>();
const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "change", value: string): void;
  (e: "search", value: string): void;
  (e: "focus", value: any): void;
  (e: "blur", value: any): void;
  (e: "clear", value: any): void;
  (e: "click-input", value: any): void;
  (e: "cancel"): void;
}>();

const inputValue = ref(props.value ?? "");

watch(
  () => props.value,
  (val) => {
    if (val !== inputValue.value) inputValue.value = val ?? "";
  }
);

watch(inputValue, (val) => {
  emit("update:modelValue", val);
});

const showAction = computed(() => !!props.showAction);
const useActionSlot = computed(() => !!props.useActionSlot);
const useLeftIconSlot = computed(() => !!props.useLeftIconSlot);
const useRightIconSlot = computed(() => !!props.useRightIconSlot);
const leftIcon = computed(() => props.leftIcon ?? "search");
const rightIcon = computed(() => props.rightIcon);
const focus = computed(() => !!props.focus);
const error = computed(() => !!props.error);
const disabled = computed(() => !!props.disabled);
const readonly = computed(() => !!props.readonly);
const clearable = computed(() => !!props.clearable);
const clearTrigger = computed(() => props.clearTrigger);
const clearIcon = computed(() => props.clearIcon);
const maxlength = computed(() => props.maxlength);
const inputAlign = computed(() => props.inputAlign);
const placeholder = computed(() => props.placeholder);
const placeholderStyle = computed(() => props.placeholderStyle);
const cursorSpacing = computed(() => props.cursorSpacing);
const background = computed(() => props.background ?? "#ffffff");
const actionText = computed(() => props.actionText ?? "取消");
const shape = computed(() => props.shape ?? "square");
const label = computed(() => props.label);

function bem(name: string, mods?: any) {
  // 简化版 BEM
  if (!mods) return `van-${name}`;
  let base = `van-${name}`;
  if (typeof mods === "object") {
    Object.keys(mods).forEach((k) => {
      if (mods[k]) base += ` van-${name}--${k}`;
    });
  } else if (Array.isArray(mods)) {
    mods.forEach((m) => {
      if (typeof m === "string") base += ` van-${name}--${m}`;
      else if (typeof m === "object") {
        Object.keys(m).forEach((k) => {
          if (m[k]) base += ` van-${name}--${k}`;
        });
      }
    });
  }
  return base;
}

function onChange(val: string) {
  inputValue.value = val;
  emit("change", val);
}
function onCancel() {
  inputValue.value = "";
  emit("cancel");
  emit("change", "");
}
function onSearch(val: string) {
  emit("search", val);
}
function onFocus(e: any) {
  emit("focus", e);
}
function onBlur(e: any) {
  emit("blur", e);
}
function onClear(e: any) {
  inputValue.value = "";
  emit("clear", e);
}
function onClickInput(e: any) {
  emit("click-input", e);
}
</script>

<style>
.van-search {
  align-items: center;
  box-sizing: border-box;
  display: flex;
  padding: var(--search-padding, 10px 12px);
}
.van-search__content {
  background-color: var(--search-background-color, #f7f8fa);
  border-radius: 2px;
  display: flex;
  flex: 1;
  padding-left: var(--padding-sm, 12px);
}
.van-search__content--round {
  border-radius: 999px;
}
.van-search__label {
  color: var(--search-label-color, #323233);
  font-size: var(--search-label-font-size, 14px);
  line-height: var(--search-input-height, 34px);
  padding: var(--search-label-padding, 0 5px);
}
.van-search__field {
  flex: 1;
}
.van-search__field__left-icon {
  color: var(--search-left-icon-color, #969799);
}
.van-search--withaction {
  padding-right: 0;
}
.van-search__action {
  color: var(--search-action-text-color, #323233);
  font-size: var(--search-action-font-size, 14px);
  line-height: var(--search-input-height, 34px);
}
.van-search__action--hover {
  background-color: #f2f3f5;
}
.van-search__action-button {
  padding: var(--search-action-padding, 0 8px);
}
</style>
