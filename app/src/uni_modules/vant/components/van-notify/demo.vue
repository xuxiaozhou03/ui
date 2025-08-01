<template>
  <demo-block padding title="基础用法">
    <van-button type="danger" @click="showNotify">基础用法</van-button>
  </demo-block>

  <demo-block padding title="通知类型">
    <div class="demo-margin-bottom">
      <van-button
        custom-class="demo-margin-right"
        type="info"
        @click="showNotifyByType('primary')"
        >主要通知</van-button
      >
      <van-button type="primary" @click="showNotifyByType('success')"
        >成功通知</van-button
      >
    </div>
    <div class="demo-margin-bottom">
      <van-button
        custom-class="demo-margin-right"
        type="danger"
        @click="showNotifyByType('danger')"
      >
        危险通知
      </van-button>
      <van-button type="warning" @click="showNotifyByType('warning')">
        警告通知
      </van-button>
    </div>
  </demo-block>

  <demo-block padding title="自定义通知">
    <van-button
      type="primary"
      custom-class="demo-margin-right"
      @click="showCustomColor"
      >自定义颜色</van-button
    >
    <van-button type="primary" @click="showCustomDuration"
      >自定义时长</van-button
    >
  </demo-block>

  <demo-block padding title="插入状态栏高度">
    <van-button
      type="primary"
      custom-class="demo-margin-right"
      @click="showSafe"
      >插入状态栏高度</van-button
    >
  </demo-block>

  <van-notify selector="van-notify" />
</template>
<script lang="ts" setup>
import Notify, { type NotifyOptions } from "./notify";

function showNotify() {
  Notify({ message: "通知内容" });
}

function showCustomColor() {
  Notify({ message: "自定义颜色", color: "#ad0000", background: "#ffe1e1" });
}

function showCustomDuration() {
  Notify({ duration: 1000, message: "自定义时长" });
}

function showNotifyByType(type: NotifyOptions["type"]) {
  Notify({ type, message: "通知内容" });
}

function showSafe() {
  Notify({ message: "通知内容", safeAreaInsetTop: true });
}
</script>
<style>
.demo-margin-right {
  margin-right: 10px;
}
</style>
