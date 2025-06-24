<template>
  <demo-block title="基础用法">
    <van-circle type="2d" :value="value" :text="`${value}%`" />
  </demo-block>

  <demo-block title="样式定制">
    <van-circle :value="value" :stroke-width="6" text="宽度定制" />
    <van-circle
      :value="value"
      layer-color="#eee"
      color="#ee0a24"
      text="颜色定制"
    />
    <van-circle :value="value" :color="gradientColor" text="渐变色" />
    <van-circle
      :value="value"
      color="#07c160"
      :clockwise="false"
      text="逆时针"
    />
    <van-circle :value="value" size="120" text="大小定制" />
  </demo-block>

  <van-button type="primary" size="small" @click="run(10)">增加</van-button>
  <van-button type="danger" size="small" @click="run(-10)">减少</van-button>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const value = ref(25);
const gradientColor = {
  "0%": "#ffd01e",
  "100%": "#ee0a24",
};

function format(rate: number) {
  return Math.min(Math.max(rate, 0), 100);
}

function run(step: number) {
  value.value = format(value.value + step);
}
</script>

<style>
.van-circle {
  margin: 5px 10px 20px;
}
.van-button {
  margin-left: 10px;
}
</style>
