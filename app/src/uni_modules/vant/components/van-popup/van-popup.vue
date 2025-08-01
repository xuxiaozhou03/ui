<template>
  <van-overlay
    v-if="overlay"
    :show="show"
    :z-index="zIndex"
    :style="overlayStyle"
    :duration="duration"
    @click="onClickOverlay"
    :lock-scroll="lockScroll"
  />
  <view
    v-if="inited"
    :class="
      cn(
        bem('popup', [
          position,
          {
            round,
            safe: safeAreaInsetBottom,
            safeTop: safeAreaInsetTop,
            safeTabBar: safeAreaTabBar,
          },
        ]),
        classes,
        customClass
      )
    "
    :style="{
      zIndex: props.zIndex,
      ...props.customStyle,
    }"
    @transitionend="onTransitionEnd"
  >
    <slot />
    <van-icon
      v-if="closeable"
      :name="closeIcon"
      :custom-class="
        cn(
          'van-popup__close-icon',
          `van-popup__close-icon--${closeIconPosition}`,
          closeIconClass
        )
      "
      @tap="onClickCloseIcon"
    />
  </view>
</template>
<script setup lang="ts">
import { popupProps } from "./props";
import { cn, bem } from "../../utils";
import { useTransition } from "../van-transition/useTransition";

const props = defineProps(popupProps);

const emit = defineEmits(["close", "click-overlay", "update:show"]);

const { inited, classes, onTransitionEnd } = useTransition(props);

function onClickCloseIcon() {
  emit("close");
  emit("update:show", false);
}
function onClickOverlay() {
  emit("click-overlay");
  if (props.closeOnClickOverlay) {
    emit("close");
    emit("update:show", false);
  }
}

// observeClass() {
//   const { transition, position, duration } = this.data;

//   const updateData: { [key: string]: any } = {
//     name: transition || position,
//   };

//   if (transition === 'none') {
//     updateData.duration = 0;
//     this.originDuration = duration;
//   } else if (this.originDuration != null) {
//     updateData.duration = this.originDuration;
//   }

//   this.setData(updateData);
// },
</script>
<style>
.van-popup {
  -webkit-overflow-scrolling: touch;
  animation: ease both;
  background-color: var(--popup-background-color, #fff);
  box-sizing: border-box;
  max-height: 100%;
  overflow-y: auto;
  position: fixed;
  transition-timing-function: ease;
}
.van-popup--center {
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
}
.van-popup--center.van-popup--round {
  border-radius: var(--popup-round-border-radius, 16px);
}
.van-popup--top {
  left: 0;
  top: 0;
  width: 100%;
}
.van-popup--top.van-popup--round {
  border-radius: 0 0
    var(--popup-round-border-radius, var(--popup-round-border-radius, 16px))
    var(--popup-round-border-radius, var(--popup-round-border-radius, 16px));
}
.van-popup--right {
  right: 0;
  top: 50%;
  transform: translate3d(0, -50%, 0);
}
.van-popup--right.van-popup--round {
  border-radius: var(
      --popup-round-border-radius,
      var(--popup-round-border-radius, 16px)
    )
    0 0 var(--popup-round-border-radius, var(--popup-round-border-radius, 16px));
}
.van-popup--bottom {
  bottom: 0;
  left: 0;
  width: 100%;
}
.van-popup--bottom.van-popup--round {
  border-radius: var(
      --popup-round-border-radius,
      var(--popup-round-border-radius, 16px)
    )
    var(--popup-round-border-radius, var(--popup-round-border-radius, 16px)) 0 0;
}
.van-popup--left {
  left: 0;
  top: 50%;
  transform: translate3d(0, -50%, 0);
}
.van-popup--left.van-popup--round {
  border-radius: 0
    var(--popup-round-border-radius, var(--popup-round-border-radius, 16px))
    var(--popup-round-border-radius, var(--popup-round-border-radius, 16px)) 0;
}
.van-popup--bottom.van-popup--safe {
  padding-bottom: env(safe-area-inset-bottom);
}
.van-popup--bottom.van-popup--safeTabBar,
.van-popup--top.van-popup--safeTabBar {
  bottom: var(--tabbar-height, 50px);
}
.van-popup--safeTop {
  padding-top: env(safe-area-inset-top);
}
.van-popup__close-icon {
  color: var(--popup-close-icon-color, #969799);
  font-size: var(--popup-close-icon-size, 18px);
  position: absolute;
  z-index: var(--popup-close-icon-z-index, 1);
}
.van-popup__close-icon--top-left {
  left: var(--popup-close-icon-margin, 16px);
  top: var(--popup-close-icon-margin, 16px);
}
.van-popup__close-icon--top-right {
  right: var(--popup-close-icon-margin, 16px);
  top: var(--popup-close-icon-margin, 16px);
}
.van-popup__close-icon--bottom-left {
  bottom: var(--popup-close-icon-margin, 16px);
  left: var(--popup-close-icon-margin, 16px);
}
.van-popup__close-icon--bottom-right {
  bottom: var(--popup-close-icon-margin, 16px);
  right: var(--popup-close-icon-margin, 16px);
}
.van-popup__close-icon:active {
  opacity: 0.6;
}
.van-scale-enter-active,
.van-scale-leave-active {
  transition-property: opacity, transform;
}
.van-scale-enter,
.van-scale-leave-to {
  opacity: 0;
  transform: translate3d(-50%, -50%, 0) scale(0.7);
}
.van-fade-enter-active,
.van-fade-leave-active {
  transition-property: opacity;
}
.van-fade-enter,
.van-fade-leave-to {
  opacity: 0;
}
.van-center-enter-active,
.van-center-leave-active {
  transition-property: opacity;
}
.van-center-enter,
.van-center-leave-to {
  opacity: 0;
}
.van-bottom-enter-active,
.van-bottom-leave-active,
.van-left-enter-active,
.van-left-leave-active,
.van-right-enter-active,
.van-right-leave-active,
.van-top-enter-active,
.van-top-leave-active {
  transition-property: transform;
}
.van-bottom-enter,
.van-bottom-leave-to {
  transform: translate3d(0, 100%, 0);
}
.van-top-enter,
.van-top-leave-to {
  transform: translate3d(0, -100%, 0);
}
.van-left-enter,
.van-left-leave-to {
  transform: translate3d(-100%, -50%, 0);
}
.van-right-enter,
.van-right-leave-to {
  transform: translate3d(100%, -50%, 0);
}
</style>
