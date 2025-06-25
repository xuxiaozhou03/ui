<template>
  <demo-block title="基础用法" padding>
    <van-switch v-model="checked" />
  </demo-block>

  <demo-block title="禁用状态" padding>
    <van-switch v-model="checked" disabled />
  </demo-block>

  <demo-block title="加载状态" padding>
    <van-switch v-model="checked" loading />
  </demo-block>

  <demo-block title="自定义大小" padding>
    <van-switch v-model="checked" size="24px" />
  </demo-block>

  <demo-block title="自定义颜色" padding>
    <van-switch
      v-model="checked"
      active-color="#07c160"
      inactive-color="#ee0a24"
    />
  </demo-block>

  <demo-block title="异步控制" padding>
    <van-switch v-model="checked2" size="36px" @update:modelValue="onChange2" />
  </demo-block>

  <van-dialog id="van-dialog" />
</template>
<script setup lang="ts">
import { ref } from "vue";
// @ts-ignore
const Dialog = window.Dialog || {};

const checked = ref(true);
const checked2 = ref(true);

function onChange2(val: boolean) {
  // @ts-ignore
  Dialog.confirm({
    title: "提示",
    message: "是否切换开关？",
  }).then(() => {
    checked2.value = val;
  });
}
</script>
<style scoped></style>
