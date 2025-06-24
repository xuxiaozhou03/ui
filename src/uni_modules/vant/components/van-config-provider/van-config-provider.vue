<template>
  <view class="van-config-provider" :style="cssVars">
    <slot />
  </view>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { configProviderProps, ConfigProviderProps } from "./props";

const props = defineProps<ConfigProviderProps>();

function kebabCase(word: string) {
  return word
    .replace(/([A-Z])/g, "-$1")
    .toLowerCase()
    .replace(/^-/, "");
}

const cssVars = computed(() => {
  const themeVars = props.themeVars || {};
  const cssVars: Record<string, string | number> = {};
  Object.keys(themeVars).forEach((key) => {
    cssVars[`--${kebabCase(key)}`] = themeVars[key];
  });
  return cssVars;
});
</script>

<style scoped></style>
