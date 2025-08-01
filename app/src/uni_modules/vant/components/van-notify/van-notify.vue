<template>
  <van-transition
    name="slide-down"
    :show="show"
    custom-class="van-notify__container"
    :custom-style="{
      zIndex,
      top: addUnit(top),
    }"
    @click="onTap"
  >
    <div
      :class="['van-notify', `van-notify--${type}`]"
      :style="{
        background,
        color,
      }"
    >
      <div
        v-if="safeAreaInsetTop"
        :style="{ height: statusBarHeight + 'px' }"
      />
      <span>{{ message }}</span>
    </div>
  </van-transition>
</template>
<script lang="ts" setup>
import { ref, defineProps } from "vue";
import { notifyProps } from "./props";
import { addUnit } from "../../utils";

const props = defineProps(notifyProps);

const show = ref(false);
const statusBarHeight = ref(0);
let timer: any = null;

function openNotify() {
  clearTimeout(timer);
  show.value = true;
  if (props.duration > 0 && props.duration !== Infinity) {
    timer = setTimeout(() => {
      closeNotify();
    }, props.duration);
  }
}

function closeNotify() {
  clearTimeout(timer);
  show.value = false;
}

function onTap(e: Event) {
  // 可扩展点击事件
}
</script>
<style>
.van-notify {
  word-wrap: break-word;
  font-size: var(--notify-font-size, 14px);
  line-height: var(--notify-line-height, 20px);
  padding: var(--notify-padding, 6px 15px);
  text-align: center;
}
.van-notify__container {
  box-sizing: border-box;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
}
.van-notify--primary {
  background-color: var(--notify-primary-background-color, #1989fa);
}
.van-notify--success {
  background-color: var(--notify-success-background-color, #07c160);
}
.van-notify--danger {
  background-color: var(--notify-danger-background-color, #ee0a24);
}
.van-notify--warning {
  background-color: var(--notify-warning-background-color, #ff976a);
}
</style>
