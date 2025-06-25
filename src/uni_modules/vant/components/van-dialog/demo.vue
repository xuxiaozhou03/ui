<template>
  <demo-block card title="提示弹窗" padding>
    <van-cell title="提示弹窗" @click="onClickAlert" is-link />
    <van-cell title="提示弹窗（无标题）" @click="onClickAlert2" is-link />
    <van-cell title="确认弹窗" @click="onClickConfirm" is-link />
  </demo-block>

  <demo-block card title="圆角按钮样式" padding>
    <van-cell title="提示弹窗" @click="onClickThemeAlert" is-link />
    <van-cell title="提示弹窗（无标题）" @click="onClickThemeAlert2" is-link />
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
    @close="onClose"
    confirm-button-open-type="getUserInfo"
    @getuserinfo="getUserInfo"
  >
    <img
      class="demo-image"
      src="https://img.yzcdn.cn/public_files/2017/09/05/4e3ea0898b1c2c416eec8c11c5360833.jpg"
    />
  </van-dialog>

  <van-dialog id="van-dialog" />
</template>
<script lang="ts" setup>
import { ref } from "vue";
import Dialog, { Action } from "../../dialog/dialog";

const message = "代码是写出来给人看的，附带能在机器上运行";
const show = ref(false);

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
