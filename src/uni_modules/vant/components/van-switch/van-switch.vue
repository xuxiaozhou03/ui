<template>
  <div
    class="van-switch"
    :class="{
      'van-switch--on': checked === activeValue,
      'van-switch--disabled': disabled,
    }"
    :style="rootStyle"
    @click="onClick"
  >
    <div class="van-switch__node">
      <van-loading
        v-if="loading"
        :color="loadingColor"
        class="van-switch__loading"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmits } from "vue";
import { switchProps } from "./props";

const props = defineProps(switchProps);
const emit = defineEmits<{
  (e: "update:checked", value: any): void;
  (e: "change", value: any): void;
}>();

const checked = computed(() => props.checked);
const activeValue = computed(() => props.activeValue);
const disabled = computed(() => props.disabled);
const loading = computed(() => props.loading);

const rootStyle = computed(() => {
  const currentColor =
    checked.value === activeValue.value
      ? props.activeColor || "#1989fa"
      : props.inactiveColor || "#969799";
  return {
    fontSize: `${props.size}px`,
    backgroundColor: currentColor,
  };
});

const loadingColor = computed(() => {
  return checked.value === activeValue.value
    ? props.activeColor || "#1989fa"
    : props.inactiveColor || "#969799";
});

function onClick() {
  if (disabled.value || loading.value) return;
  const isChecked = checked.value === activeValue.value;
  const value = isChecked ? props.inactiveValue : props.activeValue;
  emit("update:checked", value);
  emit("change", value);
}
</script>

<style>
.van-switch {
  background-color: var(--switch-background-color, #fff);
  border: var(--switch-border, 1px solid rgba(0, 0, 0, 0.1));
  border-radius: var(--switch-node-size, 1em);
  box-sizing: initial;
  display: inline-block;
  height: var(--switch-height, 1em);
  position: relative;
  transition: background-color var(--switch-transition-duration, 0.3s);
  width: var(--switch-width, 2em);
}
.van-switch__node {
  background-color: var(--switch-node-background-color, #fff);
  border-radius: 100%;
  box-shadow: var(
    --switch-node-box-shadow,
    0 3px 1px 0 rgba(0, 0, 0, 0.05),
    0 2px 2px 0 rgba(0, 0, 0, 0.1),
    0 3px 3px 0 rgba(0, 0, 0, 0.05)
  );
  height: var(--switch-node-size, 1em);
  left: 0;
  position: absolute;
  top: 0;
  transition: var(--switch-transition-duration, 0.3s)
    cubic-bezier(0.3, 1.05, 0.4, 1.05);
  width: var(--switch-node-size, 1em);
  z-index: var(--switch-node-z-index, 1);
}
.van-switch__loading {
  height: 50%;
  left: 25%;
  position: absolute !important;
  top: 25%;
  width: 50%;
}
.van-switch--on {
  background-color: var(--switch-on-background-color, #1989fa);
}
.van-switch--on .van-switch__node {
  transform: translateX(
    calc(var(--switch-width, 2em) - var(--switch-node-size, 1em))
  );
}
.van-switch--disabled {
  opacity: var(--switch-disabled-opacity, 0.4);
}
</style>
