<template>
  <view
    :class="[
      'van-collapse',
      { 'van-hairline--top-bottom': border },
      customClass,
    ]"
  >
    <slot />
  </view>
</template>

<script setup lang="ts">
import { collapseProps, CollapseProps } from "./props";
import { ref, watch, provide } from "vue";

const props = defineProps<CollapseProps>();
const emit = defineEmits(["update:modelValue", "change", "open", "close"]);

const activeNames = ref(props.modelValue);

watch(
  () => props.modelValue,
  (val) => {
    activeNames.value = val;
  }
);

function switchItem(name: string | number, expanded: boolean) {
  let newValue;
  if (!props.accordion) {
    if (expanded) {
      newValue = Array.isArray(activeNames.value)
        ? [...activeNames.value, name]
        : [name];
    } else {
      newValue = Array.isArray(activeNames.value)
        ? activeNames.value.filter((n) => n !== name)
        : [];
    }
  } else {
    newValue = expanded ? name : "";
  }
  emit("update:modelValue", newValue);
  emit("change", newValue);
  emit(expanded ? "open" : "close", name);
}

provide("collapseSwitch", switchItem);
provide("collapseActiveNames", activeNames);
</script>

<style scoped>
/* ...保留原样式... */
</style>
