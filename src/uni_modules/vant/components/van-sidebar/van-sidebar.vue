<template>
  <div class="van-sidebar custom-class">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, provide, watch, defineProps, defineEmits } from "vue";
import { sidebarProps, SidebarProps } from "./props";

const props = defineProps<SidebarProps>();
const emit = defineEmits<{
  (e: "update:activeKey", value: number): void;
  (e: "change", value: number): void;
}>();

const currentActive = ref(props.activeKey ?? 0);

watch(
  () => props.activeKey,
  (val) => {
    if (val !== currentActive.value) {
      setActive(val ?? 0);
    }
  }
);

function setActive(activeKey: number) {
  currentActive.value = activeKey;
  emit("update:activeKey", activeKey);
  emit("change", activeKey);
}

provide("vanSidebar", {
  currentActive,
  setActive,
});
</script>

<style>
.van-sidebar {
  width: var(--sidebar-width, 80px);
}
</style>
