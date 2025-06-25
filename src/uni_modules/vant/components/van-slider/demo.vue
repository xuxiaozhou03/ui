<template>
  <demo-block title="基础用法">
    <van-slider v-model="currentValue" class="slider" @change="onChange" />
  </demo-block>

  <demo-block title="双滑块">
    <van-slider range v-model="rangeValue" class="slider" @change="onChange" />
  </demo-block>

  <demo-block title="指定选择范围">
    <van-slider class="slider" :min="-50" :max="50" @change="onChange" />
  </demo-block>

  <demo-block title="禁用">
    <van-slider class="slider" v-model="disabledValue" disabled />
  </demo-block>

  <demo-block title="指定步长">
    <van-slider
      class="slider"
      v-model="stepValue"
      :step="10"
      @change="onChange"
    />
  </demo-block>

  <demo-block title="自定义样式">
    <van-slider
      v-model="customValue"
      class="slider"
      bar-height="4px"
      active-color="#ee0a24"
    />
  </demo-block>

  <demo-block title="自定义按钮">
    <van-slider
      v-model="currentValue"
      class="slider"
      use-button-slot
      active-color="#ee0a24"
      @drag="onDrag"
    >
      <template #button>
        <div class="custom-button">{{ currentValue }}</div>
      </template>
    </van-slider>
  </demo-block>

  <demo-block title="垂直方向">
    <div style="height: 150px; padding-left: 30px">
      <van-slider
        v-model="verticalValue"
        vertical
        class="slider"
        @change="onChange"
      />
      <van-slider
        v-model="verticalRangeValue"
        vertical
        range
        class="slider"
        @change="onChange"
      />
    </div>
  </demo-block>
</template>

<script setup lang="ts">
import { ref } from "vue";

const currentValue = ref(50);
const rangeValue = ref([20, 60]);
const disabledValue = ref(50);
const stepValue = ref(50);
const customValue = ref(50);
const verticalValue = ref(50);
const verticalRangeValue = ref([20, 60]);

function onChange(val: number | number[]) {
  window.alert(`当前值：${Array.isArray(val) ? val.join(",") : val}`);
}

function onDrag(val: { value: number }) {
  currentValue.value = val.value;
}
</script>

<style>
.slider {
  margin: 0 15px 30px;
}

.custom-button {
  width: 26px;
  color: #fff;
  font-size: 10px;
  line-height: 18px;
  text-align: center;
  border-radius: 100px;
  background-color: #ee0a24;
}
</style>
