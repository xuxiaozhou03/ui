<template>
  <van-overlay
    v-if="data.mask || data.forbidClick"
    :show="data.show"
    :z-index="data.zIndex"
    :custom-style="
      data.mask
        ? {}
        : {
            backgroundColor: 'transparent',
          }
    "
  />
  <van-transition
    :show="data.show"
    :custom-style="{ zIndex: data.zIndex }"
    custom-class="van-toast__container"
  >
    <div
      :class="[
        'van-toast',
        data.type === 'text' || data.type === 'html'
          ? 'van-toast--text'
          : 'van-toast--icon',
        `van-toast--${data.position}`,
      ]"
      @touchmove.prevent
    >
      <template v-if="data.type === 'text'">
        <span>{{ data.message }}</span>
      </template>
      <template v-else-if="data.type === 'html'">
        <span v-html="data.message"></span>
      </template>
      <template v-else>
        <van-loading
          v-if="data.type === 'loading'"
          color="white"
          :type="data.loadingType"
          custom-class="van-toast__loading"
        />
        <van-icon v-else custom-class="van-toast__icon" :name="data.type" />
        <span v-if="data.message" class="van-toast__text">
          {{ data.message }}
        </span>
      </template>
      <slot />
    </div>
  </van-transition>
</template>
<script lang="ts" setup>
import { defineProps, nextTick, onMounted, onUnmounted, reactive } from "vue";
import {
  defaultOptions,
  registerToast,
  unregisterToast,
  type ToastOptions,
} from "./toast";

const props = defineProps({
  selector: {
    type: String,
    default: defaultOptions.selector,
  },
});

const data = reactive({
  ...defaultOptions,
});
let timer: ReturnType<typeof setTimeout> | null = null;

const onShow = (newData: ToastOptions) => {
  Object.assign(data, newData);
  data.show = true;

  if (data.duration && data.duration > 0) {
    timer = setTimeout(() => {
      onHide();
    }, data.duration);
  }
};
const onHide = () => {
  data.show = false;
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
  if (data.onClose) {
    nextTick(() => {
      data.onClose?.();
    });
  }
};

onMounted(() => {
  const { selector } = props;
  if (selector) {
    registerToast(selector, {
      onShow,
      onHide,
      setData(newData) {
        Object.assign(data, newData);
      },
    });
  }
});

onUnmounted(() => {
  unregisterToast(props.selector);
});
</script>
<style>
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
