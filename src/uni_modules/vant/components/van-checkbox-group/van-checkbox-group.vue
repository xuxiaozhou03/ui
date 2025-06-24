<template>
  <view
    :class="[
      'van-checkbox-group',
      { 'van-checkbox-group--horizontal': direction === 'horizontal' },
    ]"
  >
    <slot />
  </view>
</template>

<script setup lang="ts">
import { checkboxGroupProps, CheckboxGroupProps } from "./props";
import { provide, ref, watch } from "vue";

const props = defineProps<CheckboxGroupProps>();
const emit = defineEmits(["update:modelValue", "change"]);

const { max, modelValue, disabled, direction } = props;
const value = ref(modelValue || []);

watch(
  () => props.modelValue,
  (val) => {
    value.value = val || [];
  }
);

function updateValue(val: any[]) {
  emit("update:modelValue", val);
  emit("change", val);
}

provide("checkboxGroupValue", value);
provide("checkboxGroupDisabled", disabled);
provide("checkboxGroupDirection", direction);
provide("checkboxGroupMax", max);
provide("checkboxGroupUpdate", updateValue);
</script>

<style scoped>
.van-checkbox-group--horizontal {
  display: flex;
  flex-wrap: wrap;
}
</style>
