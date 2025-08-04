<template>
  <demo-block card title="提示弹窗" padding>
    <van-cell title="提示弹窗" is-link @click="onClickAlert" />
    <van-cell title="提示弹窗（无标题）" is-link @click="onClickAlert2" />
    <van-cell title="确认弹窗" is-link @click="onClickConfirm" />
  </demo-block>

  <demo-block card title="圆角按钮样式" padding>
    <van-cell title="提示弹窗" is-link @click="onClickThemeAlert" />
    <van-cell title="提示弹窗（无标题）" is-link @click="onClickThemeAlert2" />
  </demo-block>

  <demo-block card title="异步关闭" padding>
    <van-cell title="异步关闭" @click="onClickAsyncClose" />
  </demo-block>

  <demo-block card title="组件调用" padding>
    <van-cell title="组件调用" @click="showCustomDialog" />
  </demo-block>

  <van-dialog
    use-slot
    title="标题"
    v-model:show="show"
    show-cancel-button
    confirm-button-open-type="getUserInfo"
    @getuserinfo="getUserInfo"
    @close="onClose"
  >
    <image
      class="demo-image"
      src="https://img.yzcdn.cn/public_files/2017/09/05/4e3ea0898b1c2c416eec8c11c5360833.jpg"
    />
  </van-dialog>
</template>
<script setup lang="ts">
import { ref } from "vue";
import Dialog, { Action } from "../../dialog/dialog";

const show = ref(false);
const message = "代码是写出来给人看的，附带能在机器上运行";

function showCustomDialog() {
  show.value = true;
}

function getUserInfo(event: any) {
  console.log(event.detail);
}

function onClickThemeAlert() {
  Dialog.alert({
    title: "标题",
    theme: "round-button",
    message,
  });
}

function onClickThemeAlert2() {
  Dialog.alert({
    theme: "round-button",
    message,
  });
}

function onClickAlert() {
  Dialog.alert({
    title: "标题",
    message,
  });
}

function onClickAlert2() {
  Dialog.alert({
    message,
  });
}

function onClickConfirm() {
  Dialog.confirm({
    title: "标题",
    message,
  });
}

function onClickAsyncClose() {
  const beforeClose = (action: Action): Promise<boolean> =>
    new Promise((resolve) => {
      setTimeout(() => {
        if (action === "confirm") {
          resolve(true);
        } else {
          resolve(false);
        }
      }, 1000);
    });
  Dialog.confirm({
    title: "标题",
    message,
    beforeClose,
  });
}

function onClose() {
  show.value = false;
}
</script>
<style>
.demo-image {
  box-sizing: border-box;
  width: 100%;
  padding: 25px 20px 0;
}
</style>
