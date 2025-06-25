<template>
  <van-cell center title="基础用法">
    <van-stepper v-model="baseValue" />
  </van-cell>

  <van-cell center title="步长设置">
    <van-stepper v-model="stepValue" :step="2" />
  </van-cell>

  <van-cell center title="限制输入范围">
    <van-stepper v-model="rangeValue" :min="5" :max="8" />
  </van-cell>

  <van-cell center title="限制输入整数">
    <van-stepper v-model="intValue" integer />
  </van-cell>

  <van-cell center title="禁用状态">
    <van-stepper v-model="disabledValue" disabled />
  </van-cell>

  <van-cell center title="禁用长按">
    <van-stepper v-model="longPressValue" :long-press="false" />
  </van-cell>

  <van-cell center title="固定小数位数">
    <van-stepper v-model="decimalValue" :step="0.2" :decimal-length="1" />
  </van-cell>

  <van-cell center title="异步变更">
    <van-stepper v-model="asyncValue" async-change @change="onChange" />
  </van-cell>

  <van-cell center title="自定义大小">
    <van-stepper v-model="customSizeValue" input-width="40px" button-size="32px" />
  </van-cell>

  <van-cell center title="圆角风格">
    <van-stepper v-model="roundValue" theme="round" button-size="22px" />
  </van-cell>

  <van-toast id="van-toast" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const baseValue = ref(1);
const stepValue = ref(1);
const rangeValue = ref(1);
const intValue = ref(1);
const disabledValue = ref(1);
const longPressValue = ref(1);
const decimalValue = ref(1);
const asyncValue = ref(1);
const customSizeValue = ref(1);
const roundValue = ref(1);

function onChange(val: number) {
  setTimeout(() => {
    asyncValue.value = val;
  }, 500);
}
</script>

<style>
</style>
