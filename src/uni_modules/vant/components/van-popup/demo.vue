<template>
  <demo-block title="基础用法">
    <van-cell title="展示弹出层" is-link @click="showBasic = true" />
    <van-popup
      v-model:show="show.basic"
      custom-style="padding: 30px 50px"
      @close="showBasic = false"
    >
      内容
    </van-popup>
  </demo-block>

  <demo-block title="弹出位置">
    <van-cell title="顶部弹出" is-link @click="showTop = true" />
    <van-cell title="底部弹出" is-link @click="showBottom = true" />
    <van-cell title="左侧弹出" is-link @click="showLeft = true" />
    <van-cell title="右侧弹出" is-link @click="showRight = true" />

    <van-popup
      v-model:show="show.top"
      position="top"
      custom-style="height: 20%"
      @close="showTop = false"
    />
    <van-popup
      v-model:show="show.bottom"
      position="bottom"
      custom-style="height: 20%"
      @close="showBottom = false"
    />
    <van-popup
      v-model:show="show.left"
      position="left"
      custom-style="width: 20%; height: 100%"
      @close="showLeft = false"
    />
    <van-popup
      v-model:show="show.right"
      position="right"
      custom-style="width: 20%; height: 100%"
      @close="showRight = false"
    />
  </demo-block>

  <demo-block title="关闭图标">
    <van-cell title="关闭图标" is-link @click="showCloseIcon = true" />
    <van-cell title="自定义图标" is-link @click="showCustomCloseIcon = true" />
    <van-cell title="图标位置" is-link @click="showCustomIconPosition = true" />

    <van-popup
      v-model:show="show.closeIcon"
      closeable
      position="bottom"
      custom-style="height: 20%"
      @close="showCloseIcon = false"
    />
    <van-popup
      v-model:show="show.customCloseIcon"
      closeable
      close-icon="close"
      position="bottom"
      custom-style="height: 20%"
      @close="showCustomCloseIcon = false"
    />
    <van-popup
      v-model:show="show.customIconPosition"
      closeable
      close-icon-position="top-left"
      position="bottom"
      custom-style="height: 20%"
      @close="showCustomIconPosition = false"
    />
  </demo-block>

  <demo-block title="圆角弹窗">
    <van-cell title="圆角弹窗" is-link @click="showRound = true" />
    <van-popup
      v-model:show="show.round"
      round
      position="bottom"
      custom-style="height: 20%"
      @close="showRound = false"
    />
  </demo-block>
</template>

<script setup lang="ts">
import { reactive } from "vue";

const show = reactive({
  basic: false,
  top: false,
  bottom: false,
  left: false,
  right: false,
  round: false,
  closeIcon: false,
  customCloseIcon: false,
  customIconPosition: false,
});

const showBasic = {
  get: () => show.basic,
  set: (val: boolean) => (show.basic = val),
};
const showTop = {
  get: () => show.top,
  set: (val: boolean) => (show.top = val),
};
const showBottom = {
  get: () => show.bottom,
  set: (val: boolean) => (show.bottom = val),
};
const showLeft = {
  get: () => show.left,
  set: (val: boolean) => (show.left = val),
};
const showRight = {
  get: () => show.right,
  set: (val: boolean) => (show.right = val),
};
const showRound = {
  get: () => show.round,
  set: (val: boolean) => (show.round = val),
};
const showCloseIcon = {
  get: () => show.closeIcon,
  set: (val: boolean) => (show.closeIcon = val),
};
const showCustomCloseIcon = {
  get: () => show.customCloseIcon,
  set: (val: boolean) => (show.customCloseIcon = val),
};
const showCustomIconPosition = {
  get: () => show.customIconPosition,
  set: (val: boolean) => (show.customIconPosition = val),
};
</script>

<style></style>
