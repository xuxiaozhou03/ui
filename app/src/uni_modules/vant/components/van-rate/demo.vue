<template>
  <demo-block title="基础用法">
    <van-rate v-model="value1" custom-class="rate-position" />
  </demo-block>

  <demo-block title="自定义图标">
    <van-rate
      v-model="value2"
      custom-class="rate-position"
      icon="like"
      void-icon="like-o"
    />
  </demo-block>

  <demo-block title="自定义样式">
    <van-rate
      v-model="value3"
      custom-class="rate-position"
      :size="25"
      color="#ffd21e"
      void-icon="star"
      void-color="#eee"
    />
  </demo-block>

  <demo-block title="半星">
    <van-rate
      v-model="value4"
      custom-class="rate-position"
      allow-half
      void-icon="star"
      void-color="#eee"
    />
  </demo-block>

  <demo-block title="自定义数量">
    <van-rate v-model="value5" custom-class="rate-position" :count="6" />
  </demo-block>

  <demo-block title="禁用状态">
    <van-rate v-model="value6" custom-class="rate-position" disabled />
  </demo-block>

  <demo-block title="只读状态">
    <van-rate v-model="value6" custom-class="rate-position" readonly />
  </demo-block>

  <demo-block title="监听 change 事件">
    <van-rate
      v-model="value8"
      custom-class="rate-position"
      @change="onChange"
    />
  </demo-block>
</template>
<script lang="ts" setup>
import { ref } from "vue";
// import Toast from '../../toast/toast';

const value1 = ref(3);
const value2 = ref(3);
const value3 = ref(3);
const value4 = ref(2.5);
const value5 = ref(4);
const value6 = ref(3);
const value8 = ref(2);

function onChange(val: number) {
  // Toast({ message: '当前值：' + val });
  console.log("当前值：" + val);
}
</script>
<style>
.rate-position {
  margin-left: 15px;
}
</style>
