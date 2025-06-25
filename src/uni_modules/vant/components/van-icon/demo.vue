<template>
  <van-tabs v-model:active="active" color="#1989fa">
    <div title="用法示例" custom-class="demo-tab-pane">
      <demo-block title="基础用法">
        <div custom-class="col" :span="6">
          <van-icon :name="demoIcon" size="32px" custom-class="icon" />
        </div>
        <div custom-class="col" :span="6">
          <van-icon :name="demoImage" size="32px" custom-class="icon" />
        </div>
      </demo-block>
      <demo-block title="提示信息">
        <div custom-class="col" :span="6">
          <van-icon :name="demoIcon" size="32px" custom-class="icon" dot />
        </div>
        <div custom-class="col" :span="6">
          <van-icon :name="demoIcon" size="32px" custom-class="icon" info="9" />
        </div>
        <div custom-class="col" :span="6">
          <van-icon
            :name="demoIcon"
            size="32px"
            custom-class="icon"
            info="99+"
          />
        </div>
      </demo-block>
      <demo-block title="图标颜色">
        <div custom-class="col" :span="6">
          <van-icon
            :name="demoIcon"
            size="32px"
            custom-class="icon"
            color="#1989fa"
          />
        </div>
        <div custom-class="col" :span="6">
          <van-icon
            :name="demoIcon"
            size="32px"
            custom-class="icon"
            color="#07c160"
          />
        </div>
      </demo-block>
      <demo-block title="图标大小">
        <div custom-class="col" :span="6">
          <van-icon :name="demoIcon" size="40" custom-class="icon" />
        </div>
        <div custom-class="col" :span="6">
          <van-icon :name="demoIcon" size="3rem" custom-class="icon" />
        </div>
      </demo-block>
    </div>
    <div title="基础图标" custom-class="demo-tab-pane">
      <div
        v-for="(item, index) in icons.basic"
        :key="index"
        custom-class="col"
        :span="6"
      >
        <van-icon :name="item" size="32px" custom-class="icon" />
        <div class="text">{{ item }}</div>
      </div>
    </div>
    <div title="线框风格" custom-class="demo-tab-pane">
      <div
        v-for="(item, index) in icons.outline"
        :key="index"
        custom-class="col"
        :span="6"
      >
        <van-icon :name="item" size="32px" custom-class="icon" />
        <div class="text">{{ item }}</div>
      </div>
    </div>
    <div title="实底风格" custom-class="demo-tab-pane">
      <div
        v-for="(item, index) in icons.filled"
        :key="index"
        custom-class="col"
        :span="6"
      >
        <van-icon :name="item" size="32px" custom-class="icon" />
        <div class="text">{{ item }}</div>
      </div>
    </div>
  </van-tabs>
</template>

<script setup lang="ts">
import { ref } from "vue";
import icons from "./config";

const active = ref(0);
const demoIcon = ref("chat-o");
const demoImage = ref("https://b.yzcdn.cn/vant/icon-demo-1126.png");
</script>

<style>
.col {
  display: inline-block;
  float: none;
  text-align: center;
  vertical-align: middle;
}

.icon {
  margin: 16px 0;
  color: #323233;
}

.text {
  display: block;
  height: 36px;
  margin: -4px 0 4px;
  padding: 0 5px;
  color: #646566;
  font-size: 12px;
  line-height: 18px;
}

.demo-tab-pane {
  margin: 20px;
  background-color: #fff;
}
</style>
