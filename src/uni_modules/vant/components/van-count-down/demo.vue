<template>
  <demo-block title="基础用法">
    <van-count-down :time="time" />
  </demo-block>

  <demo-block title="自定义格式">
    <van-count-down :time="time" format="DD 天 HH 时 mm 分 ss 秒" />
  </demo-block>

  <demo-block title="毫秒级渲染">
    <van-count-down millisecond :time="time" format="HH:mm:ss:SSS" />
  </demo-block>

  <demo-block title="自定义样式">
    <van-count-down use-slot :time="time" @change="onChange">
      <template #default>
        <span class="item">{{ timeData.hours }}</span>
        <span class="item">{{ timeData.minutes }}</span>
        <span class="item">{{ timeData.seconds }}</span>
      </template>
    </van-count-down>
  </demo-block>

  <demo-block title="手动控制">
    <van-count-down
      ref="countDownRef"
      class="control-count-down"
      millisecond
      :time="3000"
      :auto-start="false"
      format="ss:SSS"
      @finish="finished"
    />
    <van-grid clickable :column-num="3">
      <van-grid-item text="开始" icon="play-circle-o" @click="start" />
      <van-grid-item text="暂停" icon="pause-circle-o" @click="pause" />
      <van-grid-item text="重置" icon="replay" @click="reset" />
    </van-grid>
  </demo-block>

  <van-toast id="van-toast" />
</template>
<script lang="ts" setup>
import { ref } from "vue";
import Toast from "../../toast/toast";

const time = ref(30 * 60 * 60 * 1000);
const timeData = ref<any>({});
const countDownRef = ref();

function onChange(e: any) {
  timeData.value = e;
}

function start() {
  countDownRef.value?.start();
}
function pause() {
  countDownRef.value?.pause();
}
function reset() {
  countDownRef.value?.reset();
}
function finished() {
  Toast({ message: "倒计时结束" });
}
</script>
<style>
.van-count-down {
  margin: 0 16px 10px;
}

.item {
  display: inline-block;
  width: 22px;
  margin-right: 5px;
  color: #fff;
  font-size: 12px;
  text-align: center;
  background-color: #1989fa;
  border-radius: 2px;
}
</style>
