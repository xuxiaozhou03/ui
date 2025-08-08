<template>
  <demo-block card title="提示弹窗" padding>
  <van-cell title="提示弹窗" bind:click="onClickAlert" is-link />
  <van-cell title="提示弹窗（无标题）" bind:click="onClickAlert2" is-link />
  <van-cell title="确认弹窗" bind:click="onClickConfirm" is-link />
</demo-block>

<demo-block card title="圆角按钮样式" padding>
  <van-cell title="提示弹窗" bind:click="onClickThemeAlert" is-link />
  <van-cell title="提示弹窗（无标题）" bind:click="onClickThemeAlert2" is-link />
</demo-block>

<demo-block card title="异步关闭" padding>
  <van-cell title="异步关闭" bind:click="onClickAsyncClose" />
</demo-block>

<demo-block card title="组件调用" padding>
  <van-cell title="组件调用" bind:click="showCustomDialog" />
</demo-block>

<van-dialog
  use-slot
  title="标题"
  show="{{ show }}"
  show-cancel-button
  bind:close="onClose"
  confirm-button-open-type="getUserInfo"
  bind:getuserinfo="getUserInfo"
>
  <image
    class="demo-image"
    src="https://img.yzcdn.cn/public_files/2017/09/05/4e3ea0898b1c2c416eec8c11c5360833.jpg"
  />
</van-dialog>

<van-dialog id="van-dialog" />

</template>
<script lang="ts" setup>
import { VantComponent } from '../../common/component';
import Dialog, { Action } from '../../dialog/dialog';

const message = '代码是写出来给人看的，附带能在机器上运行';

VantComponent({
  data: {
    show: false,
  },

  methods: {
    showCustomDialog() {
      this.setData({ show: true });
    },

    getUserInfo(event) {
      console.log(event.detail);
    },

    onClickThemeAlert() {
      Dialog.alert({
        context: this,
        title: '标题',
        theme: 'round-button',
        message,
      });
    },

    onClickThemeAlert2() {
      Dialog.alert({
        context: this,
        theme: 'round-button',
        message,
      });
    },

    onClickAlert() {
      Dialog.alert({
        context: this,
        title: '标题',
        message,
      });
    },

    onClickAlert2() {
      Dialog.alert({
        context: this,
        message,
      });
    },

    onClickConfirm() {
      Dialog.confirm({
        context: this,
        title: '标题',
        message,
      });
    },

    onClickAsyncClose() {
      const beforeClose = (action: Action): Promise<boolean> =>
        new Promise((resolve) => {
          setTimeout(() => {
            if (action === 'confirm') {
              resolve(true);
            } else {
              // 拦截取消操作
              resolve(false);
            }
          }, 1000);
        });

      Dialog.confirm({
        context: this,
        title: '标题',
        message,
        beforeClose,
      });
    },

    onClose() {
      this.setData({
        show: false,
      });
    },
  },
});

</script>
<style>.demo-image {
  box-sizing: border-box;
  width: 100%;
  padding: 25px 20px 0;
}
</style>
