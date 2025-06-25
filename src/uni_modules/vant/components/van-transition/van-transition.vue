<template>
  <div
    v-if="inited"
    :class="cn('van-transition', classes, customClass)"
    :style="rootStyle"
    @transitionend="onTransitionEnd"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps, reactive, toRef } from "vue";
import { transitionProps } from "./props";
import { type TransitionEmit, useTransition } from "./useTransition";
import { cn } from "../../utils";

const props = defineProps(transitionProps);

const computedTransitionProps = reactive({
  name: toRef(props, "name"),
  show: toRef(props, "show"),
  duration: toRef(props, "duration"),
});

const emit = defineEmits<TransitionEmit>();

const { inited, display, classes, currentDuration, onTransitionEnd } =
  useTransition(computedTransitionProps, emit);

const rootStyle = computed(() => ({
  "-webkit-transition-duration": currentDuration.value + "ms",
  "transition-duration": currentDuration.value + "ms",
  ...(display.value ? {} : { display: "none" }),
  ...props.customStyle,
}));
</script>

<style>
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
