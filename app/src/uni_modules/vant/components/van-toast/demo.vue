<template>
  <demo-block title="文字提示" padding>
  <van-button type="primary" bind:tap="showToast" class="demo-margin-right">文字提示</van-button>
  <van-button type="primary" bind:tap="showLongToast">长文字提示</van-button>
</demo-block>

<demo-block title="加载提示" padding>
  <van-button type="primary" bind:tap="showLoadingToast" class="demo-margin-right">加载提示</van-button>
  <van-button type="primary" bind:tap="showCustomLoadingToast">自定义加载图标</van-button>
</demo-block>

<demo-block title="成功/失败提示" padding>
  <van-button type="info" bind:tap="showSuccessToast" class="demo-margin-right">成功提示</van-button>
  <van-button type="danger" bind:tap="showFailToast">失败提示</van-button>
</demo-block>

<demo-block title="动态更新提示" padding>
  <van-button type="primary" bind:tap="showCustomizedToast">动态更新提示</van-button>
</demo-block>

<van-toast id="van-toast" />

</template>
<script lang="ts" setup>
  import { VantComponent } from '../../common/component';
import Toast from '../../toast/toast';

VantComponent({
  methods: {
    showToast() {
      Toast({ context: this, message: '提示内容' });
    },

    showLongToast() {
      Toast({
        context: this,
        message: '这是一条长文字提示，超过一定字数就会换行',
      });
    },

    showLoadingToast() {
      Toast.loading({ context: this, message: '加载中...', forbidClick: true });
    },

    showCustomLoadingToast() {
      Toast.loading({
        context: this,
        message: '加载中...',
        forbidClick: true,
        loadingType: 'spinner',
      });
    },

    showSuccessToast() {
      Toast.success({ context: this, message: '成功文案' });
    },

    showFailToast() {
      Toast.fail({ context: this, message: '失败提示' });
    },

    showCustomizedToast() {
      const text = (second) => `倒计时 ${second} 秒`;
      const toast = Toast.loading({
        context: this,
        duration: 0,
        forbidClick: true,
        message: text(3),
      });

      let second = 3;
      const timer = setInterval(() => {
        second--;
        if (second) {
          toast?.setData({ message: text(second) });
        } else {
          clearInterval(timer);
          Toast.clear();
        }
      }, 1000);
    },
  },
});

  // 转换为 Vue 3 的 computed 属性
  
</script>
<style lang="scss" scoped>
  
</style>
