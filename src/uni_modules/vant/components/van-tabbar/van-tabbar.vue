<template>
  <div
    ref="rootRef"
    :class="[
      border ? 'van-hairline--top-bottom' : '',
      'van-tabbar',
      { 'van-tabbar--fixed': fixed, 'van-tabbar--safe': safeAreaInsetBottom },
      'custom-class',
    ]"
    :style="zIndex ? { zIndex } : {}"
  >
    <slot />
  </div>
  <div v-if="fixed && placeholder" :style="{ height: height + 'px' }"></div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, provide, onMounted } from "vue";
import { tabbarProps } from "./props";

const props = defineProps(tabbarProps);
const rootRef = ref<HTMLElement | null>(null);
const height = ref(50);

provide("vanTabbar", {
  active: computed(() => props.active),
  activeColor: computed(() => props.activeColor),
  inactiveColor: computed(() => props.inactiveColor),
  fixed: computed(() => props.fixed),
  safeAreaInsetBottom: computed(() => props.safeAreaInsetBottom),
});

function setHeight() {
  if (!props.fixed || !props.placeholder) return;
  nextTick(() => {
    if (rootRef.value) {
      height.value = rootRef.value.getBoundingClientRect().height;
    }
  });
}

watch(() => [props.fixed, props.placeholder], setHeight);

onMounted(() => {
  setHeight();
});
</script>

<style scoped>
.van-tabbar {
  background-color: var(--tabbar-background-color, #fff);
  box-sizing: initial;
  display: flex;
  height: var(--tabbar-height, 50px);
  width: 100%;
}
.van-tabbar--fixed {
  bottom: 0;
  left: 0;
  position: fixed;
}
.van-tabbar--safe {
  padding-bottom: env(safe-area-inset-bottom);
}
</style>
