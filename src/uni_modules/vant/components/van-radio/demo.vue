<template>
  <demo-block title="基本用法" padding>
    <van-radio-group v-model="radio1">
      <van-radio name="1" custom-class="demo-radio">单选框 1</van-radio>
      <van-radio name="2">单选框 2</van-radio>
    </van-radio-group>
  </demo-block>

  <demo-block title="水平排列" padding>
    <van-radio-group v-model="radio1" direction="horizontal">
      <van-radio name="1">单选框 1</van-radio>
      <van-radio name="2">单选框 2</van-radio>
    </van-radio-group>
  </demo-block>

  <demo-block title="禁用状态" padding>
    <van-radio-group v-model="radio2" disabled>
      <van-radio name="1" custom-class="demo-radio">单选框 1</van-radio>
      <van-radio name="2">单选框 2</van-radio>
    </van-radio-group>
  </demo-block>

  <demo-block title="自定义形状" padding>
    <van-radio-group v-model="radioShape">
      <van-radio name="1" shape="square" custom-class="demo-radio"
        >单选框</van-radio
      >
      <van-radio name="2" shape="square">单选框</van-radio>
    </van-radio-group>
  </demo-block>

  <demo-block title="自定义颜色" padding>
    <van-radio-group v-model="radio3">
      <van-radio name="1" custom-class="demo-radio" checked-color="#07c160"
        >单选框</van-radio
      >
      <van-radio name="2" checked-color="#07c160">单选框</van-radio>
    </van-radio-group>
  </demo-block>

  <demo-block title="自定义大小" padding>
    <van-radio-group v-model="radioSize">
      <van-radio name="1" icon-size="24px" custom-class="demo-radio"
        >单选框</van-radio
      >
      <van-radio name="2" icon-size="24px">单选框</van-radio>
    </van-radio-group>
  </demo-block>

  <demo-block title="自定义图标" padding>
    <van-radio-group v-model="radio4">
      <van-radio use-icon-slot name="1">
        自定义图标
        <template #icon>
          <img
            :src="radio4 === '1' ? icon.active : icon.normal"
            class="icon"
            style="width: 20px"
          />
        </template>
      </van-radio>
      <van-radio use-icon-slot name="2">
        自定义图标
        <template #icon>
          <img
            :src="radio4 === '2' ? icon.active : icon.normal"
            class="icon"
            style="width: 20px"
          />
        </template>
      </van-radio>
    </van-radio-group>
  </demo-block>

  <demo-block title="禁用文本点击" padding>
    <van-radio-group v-model="radioLabel">
      <van-radio label-disabled name="1" custom-class="demo-radio"
        >单选框 1</van-radio
      >
      <van-radio label-disabled name="2">单选框 2</van-radio>
    </van-radio-group>
  </demo-block>

  <demo-block title="与 Cell 组件一起使用">
    <van-radio-group v-model="radio5">
      <van-cell-group>
        <van-cell title="单选框 1" clickable @click="() => (radio5 = '1')">
          <template #right-icon>
            <van-radio name="1"></van-radio>
          </template>
        </van-cell>
        <van-cell title="单选框 2" clickable @click="() => (radio5 = '2')">
          <template #right-icon>
            <van-radio name="2"></van-radio>
          </template>
        </van-cell>
      </van-cell-group>
    </van-radio-group>
  </demo-block>
</template>

<script setup lang="ts">
import { ref } from "vue";

const radio1 = ref("1");
const radio2 = ref("2");
const radio3 = ref("1");
const radio4 = ref("1");
const radio5 = ref("1");
const radioSize = ref("1");
const radioLabel = ref("1");
const radioShape = ref("1");
const icon = {
  normal:
    "https://img.yzcdn.cn/public_files/2017/10/13/c547715be149dd3faa817e4a948b40c4.png",
  active:
    "https://img.yzcdn.cn/public_files/2017/10/13/793c77793db8641c4c325b7f25bf130d.png",
};
</script>

<style>
.demo-radio {
  margin-bottom: 10px;
}

.icon {
  width: 20px;
}
</style>
