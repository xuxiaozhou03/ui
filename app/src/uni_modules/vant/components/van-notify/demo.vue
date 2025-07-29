<template>
  <demo-block padding title="基础用法">
  <van-button type="danger" bind:click="showNotify">基础用法</van-button>
</demo-block>

<demo-block padding title="通知类型">
  <view class="demo-margin-bottom">
    <van-button class="demo-margin-right" type="info" data-type="primary" bind:click="showNotifyByType">主要通知</van-button>
    <van-button type="primary" data-type="success" bind:click="showNotifyByType">成功通知</van-button>
  </view>
  <view class="demo-margin-bottom">
    <van-button class="demo-margin-right" type="danger" data-type="danger" bind:click="showNotifyByType">危险通知</van-button>
    <van-button type="warning" data-type="warning" bind:click="showNotifyByType">警告通知</van-button>
  </view>
</demo-block>

<demo-block padding title="自定义通知">
  <van-button type="primary" class="demo-margin-right" bind:click="showCustomColor">自定义颜色</van-button>
  <van-button type="primary" bind:click="showCustomDuration">自定义时长</van-button>
</demo-block>

<demo-block padding title="插入状态栏高度">
  <van-button type="primary" class="demo-margin-right" bind:click="showSafe">插入状态栏高度</van-button>
</demo-block>

<van-notify id="van-notify" />

</template>
<script lang="ts" setup>
  import { VantComponent } from '../../common/component';
import Notify from '../../notify/notify';

VantComponent({
  methods: {
    showNotify() {
      Notify({ context: this, message: '通知内容' });
    },

    showCustomColor() {
      Notify({
        context: this,
        message: '自定义颜色',
        color: '#ad0000',
        background: '#ffe1e1',
      });

      Notify.clear();
    },

    showCustomDuration() {
      Notify({
        context: this,
        duration: 1000,
        message: '自定义时长',
      });
    },

    showNotifyByType(event) {
      const { type } = event.currentTarget.dataset;
      Notify({
        type,
        context: this,
        message: '通知内容',
      });
    },

    showSafe() {
      Notify({
        context: this,
        message: '通知内容',
        safeAreaInsetTop: true,
      });
    },
  },
});

  // 转换为 Vue 3 的 computed 属性
  
</script>
<style>
  
</style>
