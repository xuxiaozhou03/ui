<template>
  <div class="van-sticky" :style="containerStyle" ref="root">
    <div
      :class="['van-sticky-wrap', { 'van-sticky-wrap--fixed': fixed }]"
      :style="wrapStyle"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from "vue";
import { stickyProps } from "./props";

const emit = defineEmits<{
  (e: "scroll", payload: { scrollTop: number; isFixed: boolean }): void;
}>();

const props = defineProps(stickyProps);

const fixed = ref(false);
const height = ref(0);
const transform = ref(0);
const root = ref<HTMLElement | null>(null);

const containerStyle = computed(() => ({
  height: fixed.value ? `${height.value}px` : "",
  zIndex: props.zIndex,
}));

const wrapStyle = computed(() => ({
  transform: transform.value ? `translate3d(0, ${transform.value}px, 0)` : "",
  top: fixed.value ? `${props.offsetTop}px` : "",
  zIndex: props.zIndex,
}));

function getContainerRect(): Promise<DOMRect> {
  if (typeof props.container === "function") {
    const el = props.container();
    if (el) {
      return Promise.resolve(el.getBoundingClientRect());
    }
  }
  return Promise.reject(new Error("not found container"));
}

function getRootRect(): Promise<DOMRect> {
  return new Promise((resolve) => {
    nextTick(() => {
      if (root.value) {
        resolve(root.value.getBoundingClientRect());
      }
    });
  });
}

async function onScroll(scrollTop?: number) {
  if (props.disabled) {
    fixed.value = false;
    transform.value = 0;
    return;
  }
  let currentScrollTop = scrollTop ?? window.scrollY;
  try {
    if (typeof props.container === "function") {
      const [rootRect, containerRect] = await Promise.all([
        getRootRect(),
        getContainerRect(),
      ]);
      if (
        props.offsetTop + rootRect.height >
        containerRect.height + containerRect.top
      ) {
        fixed.value = false;
        transform.value = containerRect.height - rootRect.height;
      } else if (props.offsetTop >= rootRect.top) {
        fixed.value = true;
        height.value = rootRect.height;
        transform.value = 0;
      } else {
        fixed.value = false;
        transform.value = 0;
      }
    } else {
      const rootRect = await getRootRect();
      if (!rootRect || (!rootRect.width && !rootRect.height)) return;
      if (props.offsetTop >= rootRect.top) {
        fixed.value = true;
        height.value = rootRect.height;
        transform.value = 0;
      } else {
        fixed.value = false;
      }
    }
    emit("scroll", { scrollTop: currentScrollTop, isFixed: fixed.value });
  } catch {
    // ignore
  }
}

watch(
  () => [props.offsetTop, props.disabled, props.container, props.scrollTop],
  () => {
    onScroll(props.scrollTop);
  }
);

function handleWindowScroll() {
  onScroll();
}

onMounted(() => {
  onScroll(props.scrollTop);
  window.addEventListener("scroll", handleWindowScroll, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleWindowScroll);
});
</script>

<style>
.van-sticky {
  position: relative;
}
.van-sticky-wrap--fixed {
  left: 0;
  position: fixed;
  right: 0;
}
</style>
