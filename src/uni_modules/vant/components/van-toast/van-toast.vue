<template>
  <van-overlay
    v-if="mask || forbidClick"
    :show="show"
    :z-index="zIndex"
    :style="mask ? undefined : { backgroundColor: 'transparent' }"
  />
  <van-transition :show="show" :style="{ zIndex }" class="van-toast__container">
    <div
      class="van-toast van-toast--{{ toastType }} van-toast--{{ position }}"
      @touchmove.prevent
    >
      <!-- text only -->
      <template v-if="type === 'text'">
        <span>{{ message }}</span>
      </template>
      <!-- html only -->
      <template v-else-if="type === 'html'">
        <span v-html="message" />
      </template>
      <!-- with icon -->
      <template v-else>
        <van-loading
          v-if="type === 'loading'"
          color="white"
          :type="loadingType"
          class="van-toast__loading"
        />
        <van-icon v-else class="van-toast__icon" :name="type" />
        <span v-if="message" class="van-toast__text">{{ message }}</span>
      </template>

      <slot />
    </div>
  </van-transition>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { toastProps } from "./props";

const props = defineProps(toastProps);
const show = props.show;
const mask = props.mask;
const forbidClick = props.forbidClick;
const zIndex = props.zIndex;
const type = props.type;
const loadingType = props.loadingType;
const position = props.position;
const message = props.message;

const toastType = computed(() =>
  type === "text" || type === "html" ? "text" : "icon"
);
</script>
<style scoped>
.van-toast {
  word-wrap: break-word;
  align-items: center;
  background-color: var(--toast-background-color, rgba(0, 0, 0, 0.7));
  border-radius: var(--toast-border-radius, 8px);
  box-sizing: initial;
  color: var(--toast-text-color, #fff);
  display: flex;
  flex-direction: column;
  font-size: var(--toast-font-size, 14px);
  justify-content: center;
  line-height: var(--toast-line-height, 20px);
  white-space: pre-wrap;
}
.van-toast__container {
  left: 50%;
  max-width: var(--toast-max-width, 70%);
  position: fixed;
  top: 50%;
  transform: translate(-50%, -50%);
  width: -webkit-fit-content;
  width: fit-content;
}
.van-toast--text {
  min-width: var(--toast-text-min-width, 96px);
  padding: var(--toast-text-padding, 8px 12px);
}
.van-toast--icon {
  min-height: var(--toast-default-min-height, 88px);
  padding: var(--toast-default-padding, 16px);
  width: var(--toast-default-width, 88px);
}
.van-toast--icon .van-toast__icon {
  font-size: var(--toast-icon-size, 36px);
}
.van-toast--icon .van-toast__text {
  padding-top: 8px;
}
.van-toast__loading {
  margin: 10px 0;
}
.van-toast--top {
  transform: translateY(-30vh);
}
.van-toast--bottom {
  transform: translateY(30vh);
}
</style>
