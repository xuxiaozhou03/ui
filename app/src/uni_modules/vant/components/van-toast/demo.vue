<template>
  <demo-block title="文字提示" padding>
    <van-button
      type="primary"
      @click="showToast"
      custom-class="demo-margin-right"
      >文字提示</van-button
    >
    <van-button type="primary" @click="showLongToast">长文字提示</van-button>
  </demo-block>

  <demo-block title="加载提示" padding>
    <van-button
      type="primary"
      @click="showLoadingToast"
      custom-class="demo-margin-right"
      >加载提示</van-button
    >
    <van-button type="primary" @click="showCustomLoadingToast"
      >自定义加载图标</van-button
    >
  </demo-block>

  <demo-block title="成功/失败提示" padding>
    <van-button
      type="info"
      @click="showSuccessToast"
      custom-class="demo-margin-right"
      >成功提示</van-button
    >
    <van-button type="danger" @click="showFailToast">失败提示</van-button>
  </demo-block>

  <demo-block title="动态更新提示" padding>
    <van-button type="primary" @click="showCustomizedToast"
      >动态更新提示</van-button
    >
  </demo-block>

  <van-toast />
</template>

<script lang="ts" setup>
import Toast from "./toast";

function showToast() {
  Toast({ message: "提示内容" });
}

function showLongToast() {
  Toast({ message: "这是一条长文字提示，超过一定字数就会换行" });
}

function showLoadingToast() {
  Toast.loading({ message: "加载中...", forbidClick: true });
}

function showCustomLoadingToast() {
  Toast.loading({
    message: "加载中...",
    forbidClick: true,
    loadingType: "spinner",
  });
}

function showSuccessToast() {
  Toast.success({ message: "成功文案" });
}

function showFailToast() {
  Toast.fail({ message: "失败提示" });
}

function showCustomizedToast() {
  const text = (second: number) => `倒计时 ${second} 秒`;
  const toast = Toast.loading({
    duration: 0,
    forbidClick: true,
    message: text(3),
  });

  let second = 3;
  const timer = setInterval(() => {
    second--;
    if (second) {
      // 这里假设 Toast.loading 返回的 toast 支持 setData 或直接修改 message
      if (toast) {
        toast.setData({ message: text(second) });
      }
    } else {
      clearInterval(timer);
      Toast.clear();
    }
  }, 1000);
}
</script>

<style>
.demo-margin-right {
  margin-right: 10px;
}
</style>
