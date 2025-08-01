<template>
  <van-cell center title="基础用法">
    <van-stepper v-model="val1" />
  </van-cell>

  <van-cell center title="步长设置">
    <van-stepper v-model="val2" :step="2" />
  </van-cell>

  <van-cell center title="限制输入范围">
    <van-stepper v-model="val3" :min="5" :max="8" />
  </van-cell>

  <van-cell center title="限制输入整数">
    <van-stepper v-model="val4" integer />
  </van-cell>

  <van-cell center title="禁用状态">
    <van-stepper v-model="val5" disabled />
  </van-cell>

  <van-cell center title="禁用长按">
    <van-stepper v-model="val6" :long-press="false" />
  </van-cell>

  <van-cell center title="固定小数位数">
    <van-stepper v-model="val7" :step="0.2" :decimal-length="1" />
  </van-cell>

  <van-cell center title="异步变更">
    <van-stepper v-model="asyncVal" async-change @change="onChange" />
  </van-cell>

  <van-cell center title="自定义大小">
    <van-stepper v-model="val8" input-width="40px" button-size="32px" />
  </van-cell>

  <van-cell center title="圆角风格">
    <van-stepper v-model="val9" theme="round" button-size="22px" />
  </van-cell>
</template>
<script lang="ts" setup>
import { ref } from "vue";

const val1 = ref(1);
const val2 = ref(1);
const val3 = ref(1);
const val4 = ref(1);
const val5 = ref(1);
const val6 = ref(1);
const val7 = ref(1);
const val8 = ref(1);
const val9 = ref(1);
const asyncVal = ref(1);

function onChange(val: number) {
  // 这里可用 vant-toast 或 alert
  setTimeout(() => {
    asyncVal.value = val;
  }, 500);
}
</script>
<style></style>
