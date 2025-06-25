<template>
  <demo-block title="基础用法">
    <van-tabs v-model="active1" @change="onChange">
      <van-tab v-for="item in tabs4" :key="item" :title="`标签 ${item}`">
        <div class="content">{{ `内容${item}` }}</div>
      </van-tab>
    </van-tabs>
  </demo-block>

  <demo-block title="通过名称匹配">
    <van-tabs v-model="activeName">
      <van-tab
        v-for="item in tabsWithName"
        :key="item.name"
        :name="item.name"
        :title="`标签 ${item.index}`"
      >
        <div class="content">{{ `内容${item.index}` }}</div>
      </van-tab>
    </van-tabs>
  </demo-block>

  <demo-block title="横向滚动">
    <van-tabs>
      <van-tab v-for="item in tabs6" :key="item" :title="`标签 ${item}`">
        <div class="content">{{ `内容${item}` }}</div>
      </van-tab>
    </van-tabs>
  </demo-block>

  <demo-block title="禁用标签">
    <van-tabs @disabled="onClickDisabled">
      <van-tab
        v-for="(item, index) in tabs3"
        :key="item"
        :disabled="index === 1"
        :title="`标签 ${item}`"
      >
        <div class="content">{{ `内容${item}` }}</div>
      </van-tab>
    </van-tabs>
  </demo-block>

  <demo-block title="样式风格">
    <van-tabs type="card" tab-class="special-tab">
      <van-tab v-for="item in tabs3" :key="item" :title="`标签 ${item}`">
        <div class="content-2">{{ `内容${item}` }}</div>
      </van-tab>
    </van-tabs>
  </demo-block>

  <demo-block title="点击事件">
    <van-tabs @click="onClick">
      <van-tab v-for="item in tabs2" :key="item" :title="`标签 ${item}`">
        <div class="content">{{ `内容${item}` }}</div>
      </van-tab>
    </van-tabs>
  </demo-block>

  <demo-block title="粘性布局">
    <van-tabs sticky>
      <van-tab v-for="item in tabs4" :key="item" :title="`标签 ${item}`">
        <div class="content">{{ `内容${item}` }}</div>
      </van-tab>
    </van-tabs>
  </demo-block>

  <demo-block title="切换动画">
    <van-tabs animated>
      <van-tab v-for="item in tabs4" :key="item" :title="`标签 ${item}`">
        <div class="content">{{ `内容${item}` }}</div>
      </van-tab>
    </van-tabs>
  </demo-block>

  <demo-block title="滑动切换">
    <van-tabs swipeable>
      <van-tab v-for="item in tabs4" :key="item" :title="`标签 ${item}`">
        <div class="content">{{ `内容${item}` }}</div>
      </van-tab>
    </van-tabs>
  </demo-block>

  <demo-block title="自定义标题">
    <van-tabs
      v-model="active2"
      @change="onChange"
      tab-class="special-tab"
      tab-active-class="special-tab-active"
    >
      <template #nav-right>
        <van-icon name="search" class="right-nav" @click="onClickNavRight" />
      </template>
      <van-tab
        v-for="(item, index) in tabs4"
        :key="item"
        :title="`标签 ${item}`"
        :dot="index === 1"
        :info="index === 2 ? 99 : null"
      >
        <div class="content">{{ `内容${item}` }}</div>
      </van-tab>
    </van-tabs>
  </demo-block>

  <demo-block title="异步切换">
    <van-tabs
      v-model="active3"
      swipeable
      use-before-change
      @change="onChange"
      @before-change="onBeforeChange"
    >
      <van-tab v-for="item in tabs4" :key="item" :title="`标签 ${item}`">
        <div class="content">{{ `内容${item}` }}</div>
      </van-tab>
    </van-tabs>
  </demo-block>
</template>
<script setup lang="ts">
import { ref } from "vue";

const tabs2 = [1, 2];
const tabs3 = [1, 2, 3];
const tabs4 = [1, 2, 3, 4];
const tabs6 = [1, 2, 3, 4, 5, 6];
const tabsWithName = [
  { name: "a", index: 1 },
  { name: "b", index: 2 },
  { name: "c", index: 3 },
];

const active1 = ref(1);
const active2 = ref(1);
const active3 = ref(1);
const activeName = ref("b");

function onClickDisabled({ detail }: any) {
  window.alert(`标签 ${detail.index + 1} 已被禁用`);
}

function onChange({ detail }: any) {
  window.alert(`切换到标签 ${detail.index + 1}`);
}

function onClickNavRight() {
  window.alert("点击 right nav");
}

function onClick({ detail }: any) {
  window.alert(`点击标签 ${detail.index + 1}`);
}

function onBeforeChange({ detail }: any) {
  const { callback, title } = detail;
  if (window.confirm(`确定要切换至 ${title} tab吗？`)) {
    callback(true);
  } else {
    callback(false);
  }
}
</script>
<style scoped>
.content {
  padding: 20px;
  background-color: #fff;
}

.content-2 {
  padding: 20px;
}

.right-nav {
  padding: 0 10px;
  line-height: 44px !important;
  background-color: #fff;
}

.special-tab {
  transition: all 0.25s ease-in-out;
}

.special-tab-active {
  font-size: 1.05em !important;
}
</style>
