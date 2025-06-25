<template>
  <view
    :class="
      bem('radio-group', [
        direction,
        { 'van-radio-group--horizontal': direction === 'horizontal' },
      ])
    "
  >
    <slot />
  </view>
</template>

<script setup lang="ts">
import { computed, provide } from "vue";
import { radioGroupProps, RadioGroupProps } from "./props";
import { bem as _bem } from "../../utils";

const props = defineProps<RadioGroupProps>();
const emit = defineEmits<{
  (e: "update:modelValue", value: any): void;
  (e: "change", value: any): void;
}>();

const modelValue = computed({
  get: () => props.value,
  set: (val) => {
    emit("update:modelValue", val);
    emit("change", val);
  },
});

const direction = computed(() => props.direction || "");

function bem(name: string, mods?: any) {
  return _bem(name, mods);
}

function change(val: any) {
  if (props.disabled) return;
  modelValue.value = val;
}

provide("vanRadioGroup", {
  modelValue: modelValue,
  disabled: computed(() => !!props.disabled),
  direction,
  change,
});
</script>

<style>
.van-radio-group--horizontal {
  display: flex;
  flex-wrap: wrap;
}
</style>
