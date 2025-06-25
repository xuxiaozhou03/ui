<template>
  <div
    :class="[
      'van-tab__pane',
      { 'van-tab__pane--active': active, 'van-tab__pane--inactive': !active },
    ]"
    :style="shouldShow ? {} : { display: 'none' }"
  >
    <slot v-if="shouldRender" />
  </div>
</template>

<script setup lang="ts">
import { computed, inject, ref, watch, onMounted } from "vue";
import { tabProps } from "./props";

const props = defineProps(tabProps);
const parent = inject<any>("vanTabs", null);

const inited = ref(false);
const active = computed(() => {
  if (!parent) return false;
  const current = parent.currentName?.value ?? parent.currentIndex?.value;
  return props.name !== ""
    ? props.name === current
    : parent.tabs?.value?.[parent.currentIndex?.value] === props;
});

const shouldRender = computed(() => {
  if (!parent) return true;
  if (parent.lazyRender === false) return true;
  inited.value = inited.value || active.value;
  return inited.value;
});

const shouldShow = computed(() => {
  if (!parent) return true;
  return active.value || parent.animated;
});

watch(active, (val) => {
  if (val) inited.value = true;
});

onMounted(() => {
  if (active.value) inited.value = true;
});
</script>

<style scoped>
:host {
  box-sizing: border-box;
  flex-shrink: 0;
  width: 100%;
}
.van-tab__pane {
  -webkit-overflow-scrolling: touch;
  box-sizing: border-box;
  overflow-y: auto;
}
.van-tab__pane--active {
  height: auto;
}
.van-tab__pane--inactive {
  height: 0;
  overflow: visible;
}
</style>
