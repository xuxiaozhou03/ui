<template>
  <demo-block title="基础用法">
    <van-collapse v-model="active1">
      <van-collapse-item :title="title1">{{ content1 }}</van-collapse-item>
      <van-collapse-item :title="title2">{{ content2 }}</van-collapse-item>
      <van-collapse-item :title="title3" disabled>{{
        content3
      }}</van-collapse-item>
    </van-collapse>
  </demo-block>

  <demo-block title="手风琴">
    <van-collapse v-model="active2" accordion>
      <van-collapse-item :title="title1">{{ content1 }}</van-collapse-item>
      <van-collapse-item :title="title2">{{ content2 }}</van-collapse-item>
      <van-collapse-item :title="title3">{{ content3 }}</van-collapse-item>
    </van-collapse>
  </demo-block>

  <demo-block title="事件监听">
    <van-collapse
      v-model="active3"
      @change="onChange('active3', $event)"
      @open="onOpen"
      @close="onClose"
    >
      <van-collapse-item :title="title1">{{ content1 }}</van-collapse-item>
      <van-collapse-item :title="title2">{{ content2 }}</van-collapse-item>
      <van-collapse-item :title="title3">{{ content3 }}</van-collapse-item>
    </van-collapse>
  </demo-block>

  <demo-block title="自定义标题内容">
    <van-collapse v-model="active4">
      <van-collapse-item>
        <template #title>
          {{ title1 }}
          <van-icon name="question-o" class="van-icon-question" />
        </template>
        {{ content1 }}
      </van-collapse-item>
      <van-collapse-item :title="title2" value="内容" icon="shop-o">
        {{ content2 }}
      </van-collapse-item>
    </van-collapse>
  </demo-block>

  <van-toast id="van-toast" />
</template>
<script lang="ts" setup>
import { ref } from "vue";
import Toast from "../../toast/toast";

const active1 = ref([0]);
const active2 = ref(0);
const active3 = ref([]);
const active4 = ref([]);
const title1 = "标题1";
const title2 = "标题2";
const title3 = "标题3";
const content1 = "代码是写出来给人看的，附带能在机器上运行";
const content2 = "代码是写出来给人看的，附带能在机器上运行";
const content3 = "代码是写出来给人看的，附带能在机器上运行";

function onChange(key: string, val: any) {
  if (key === "active3") active3.value = val;
}
function onOpen(event: any) {
  Toast({ message: `展开: ${event}` });
}
function onClose(event: any) {
  Toast({ message: `关闭: ${event}` });
}
</script>
<style>
.van-icon-question {
  margin-left: 5px;
  font-size: 15px !important;
  color: #1989fa;
  vertical-align: -3px;
}
</style>
