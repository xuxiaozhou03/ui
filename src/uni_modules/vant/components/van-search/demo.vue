<template>
  <demo-block title="基本用法">
    <van-search
      v-model="value"
      placeholder="请输入搜索关键词"
      @search="onSearch"
    />
  </demo-block>

  <demo-block title="事件监听">
    <van-search
      v-model="value"
      show-action
      placeholder="请输入搜索关键词"
      @search="onSearch"
      @cancel="onCancel"
      @clear="onClear"
    />
  </demo-block>

  <demo-block title="搜索框内容对齐">
    <van-search
      v-model="value"
      input-align="center"
      placeholder="请输入搜索关键词"
    />
  </demo-block>

  <demo-block title="禁用搜索框">
    <van-search
      disabled
      v-model="value"
      placeholder="请输入搜索关键词"
    />
  </demo-block>

  <demo-block title="自定义背景色">
    <van-search
      v-model="value"
      shape="round"
      background="#4fc08d"
      placeholder="请输入搜索关键词"
    />
  </demo-block>

  <demo-block title="自定义按钮">
    <van-search
      v-model="value"
      label="地址"
      shape="round"
      placeholder="请输入搜索关键词"
      use-action-slot
      @search="onSearch"
    >
      <template #action>
        <view @click="onClick">搜索</view>
      </template>
    </van-search>
  </demo-block>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref('');

function onSearch(val?: string) {
  if (value.value) {
    // 这里可用 Toast 组件或 alert 代替
    window.alert('搜索：' + value.value);
  }
}

function onClick() {
  if (value.value) {
    window.alert('搜索：' + value.value);
  }
}

function onCancel() {
  window.alert('取消');
}

function onClear() {
  window.alert('清空');
}
</script>

<style>
</style>
