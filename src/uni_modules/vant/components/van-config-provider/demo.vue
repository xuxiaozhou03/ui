<template>
  <demo-block title="默认主题">
    <van-cell-group>
      <van-field label="评分">
        <template #input>
          <van-rate v-model="rate" style="width: 100%" />
        </template>
      </van-field>
      <van-field label="滑块" :border="false">
        <template #input>
          <van-slider v-model="slider" style="width: 100%" />
        </template>
      </van-field>
    </van-cell-group>
    <div style="margin: 16px">
      <van-button round block type="primary">提交</van-button>
    </div>
  </demo-block>

  <demo-block title="定制主题">
    <van-config-provider :theme-vars="themeVars">
      <van-cell-group>
        <van-field label="评分">
          <template #input>
            <van-rate v-model="rate" style="width: 100%" />
          </template>
        </van-field>
        <van-field label="滑块" :border="false">
          <template #input>
            <van-slider v-model="slider" style="width: 100%" />
          </template>
        </van-field>
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary">提交</van-button>
      </div>
    </van-config-provider>
  </demo-block>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const rate = ref(4);
const slider = ref(50);
const themeVars = {
  rateIconFullColor: "#07c160",
  sliderBarHeight: "4px",
  sliderButtonWidth: "20px",
  sliderButtonHeight: "20px",
  sliderActiveBackgroundColor: "#07c160",
  buttonPrimaryBorderColor: "#07c160",
  buttonPrimaryBackgroundColor: "#07c160",
};
</script>

<style></style>
