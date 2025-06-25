<template>
  <demo-block title="基础用法">
    <van-steps
      :steps="steps"
      v-model:active="active"
      @click-step="onClick"
      class="demo-margin-bottom"
    />
    <van-button class="demo-margin-left" @click="nextStep">下一步</van-button>
  </demo-block>

  <demo-block title="自定义样式">
    <van-steps
      :steps="steps"
      v-model:active="active"
      active-icon="success"
      active-color="#38f"
      inactive-icon="arrow"
    />
  </demo-block>

  <demo-block title="自定义图标">
    <van-steps :steps="customIconSteps" v-model:active="active" />
  </demo-block>

  <demo-block title="竖向步骤条">
    <van-steps
      :steps="steps"
      v-model:active="active"
      direction="vertical"
      active-color="#ee0a24"
    />
  </demo-block>

  <van-toast id="van-toast" />
</template>

<script setup lang="ts">
import { ref } from "vue";

const steps = [
  { text: "步骤一", desc: "描述信息" },
  { text: "步骤二", desc: "描述信息" },
  { text: "步骤三", desc: "描述信息" },
  { text: "步骤四", desc: "描述信息" },
];

const active = ref(1);
const customIconSteps = steps.map((item, index) => ({
  ...item,
}));

function nextStep() {
  active.value = (active.value + 1) % 4;
}

function onClick(index: number) {
  window.alert(`Index: ${index}`);
}
</script>

<style>
.demo-margin-left {
  margin-left: 10px;
}

.demo-margin-bottom {
  display: block;
  margin-bottom: 15px;
}
</style>
