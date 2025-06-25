<template>
  <Transition
    :name="name"
    :duration="duration"
    :enter-from-class="enterClass"
    :enter-active-class="enterActiveClass"
    :enter-to-class="enterToClass"
    :leave-from-class="leaveClass"
    :leave-active-class="leaveActiveClass"
    :leave-to-class="leaveToClass"
    @before-enter="onBeforeEnter"
    @enter="onEnter"
    @after-enter="onAfterEnter"
    @before-leave="onBeforeLeave"
    @leave="onLeave"
    @after-leave="onAfterLeave"
  >
    <div
      v-if="show || inited"
      :class="['van-transition', customClass, classes]"
      :style="rootStyle"
      @transitionend="onTransitionEnd"
    >
      <slot />
    </div>
  </Transition>
</template>
<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { transitionProps } from "./props";

const props = defineProps({
  ...transitionProps,
  show: Boolean,
  name: {
    type: String,
    default: "fade",
  },
  duration: {
    type: [Number, Object],
    default: 300,
  },
  customClass: String,
  enterClass: String,
  enterActiveClass: String,
  enterToClass: String,
  leaveClass: String,
  leaveActiveClass: String,
  leaveToClass: String,
});

const inited = ref(false);
const display = ref(false);
const currentDuration = ref(300);
const classes = ref("");

const rootStyle = computed(() => ({
  WebkitTransitionDuration: currentDuration.value + "ms",
  transitionDuration: currentDuration.value + "ms",
  display: display.value ? "" : "none",
}));

watch(
  () => props.show,
  (val) => {
    if (val) {
      inited.value = true;
      display.value = true;
    } else {
      display.value = false;
    }
  },
  { immediate: true }
);

function onBeforeEnter(el: Element) {
  // 可扩展
}
function onEnter(el: Element) {
  // 可扩展
}
function onAfterEnter(el: Element) {
  // 可扩展
}
function onBeforeLeave(el: Element) {
  // 可扩展
}
function onLeave(el: Element) {
  // 可扩展
}
function onAfterLeave(el: Element) {
  // 可扩展
}
function onTransitionEnd() {
  // 可扩展
}
</script>
<style scoped>
.van-transition {
  transition-timing-function: ease;
}
.van-fade-enter-active,
.van-fade-leave-active {
  transition-property: opacity;
}
.van-fade-enter,
.van-fade-leave-to {
  opacity: 0;
}
.van-fade-down-enter-active,
.van-fade-down-leave-active,
.van-fade-left-enter-active,
.van-fade-left-leave-active,
.van-fade-right-enter-active,
.van-fade-right-leave-active,
.van-fade-up-enter-active,
.van-fade-up-leave-active {
  transition-property: opacity, transform;
}
.van-fade-up-enter,
.van-fade-up-leave-to {
  opacity: 0;
  transform: translate3d(0, 100%, 0);
}
.van-fade-down-enter,
.van-fade-down-leave-to {
  opacity: 0;
  transform: translate3d(0, -100%, 0);
}
.van-fade-left-enter,
.van-fade-left-leave-to {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.van-fade-right-enter,
.van-fade-right-leave-to {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.van-slide-down-enter-active,
.van-slide-down-leave-active,
.van-slide-left-enter-active,
.van-slide-left-leave-active,
.van-slide-right-enter-active,
.van-slide-right-leave-active,
.van-slide-up-enter-active,
.van-slide-up-leave-active {
  transition-property: transform;
}
.van-slide-up-enter,
.van-slide-up-leave-to {
  transform: translate3d(0, 100%, 0);
}
.van-slide-down-enter,
.van-slide-down-leave-to {
  transform: translate3d(0, -100%, 0);
}
.van-slide-left-enter,
.van-slide-left-leave-to {
  transform: translate3d(-100%, 0, 0);
}
.van-slide-right-enter,
.van-slide-right-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>
