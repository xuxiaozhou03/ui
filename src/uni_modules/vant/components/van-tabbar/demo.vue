<template>
  <demo-block title="基础用法">
    <van-tabbar
      v-model="active"
      class="tabbar-position"
      :safe-area-inset-bottom="false"
    >
      <van-tabbar-item icon="home-o">标签</van-tabbar-item>
      <van-tabbar-item icon="search">标签</van-tabbar-item>
      <van-tabbar-item icon="friends-o">标签</van-tabbar-item>
      <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
    </van-tabbar>
  </demo-block>

  <demo-block title="通过名称匹配">
    <van-tabbar
      v-model="active2"
      class="tabbar-position"
      :safe-area-inset-bottom="false"
    >
      <van-tabbar-item name="home" icon="home-o">标签</van-tabbar-item>
      <van-tabbar-item name="search" icon="search">标签</van-tabbar-item>
      <van-tabbar-item name="friends" icon="friends-o">标签</van-tabbar-item>
      <van-tabbar-item name="setting" icon="setting-o">标签</van-tabbar-item>
    </van-tabbar>
  </demo-block>

  <demo-block title="显示徽标">
    <van-tabbar
      v-model="active3"
      class="tabbar-position"
      :safe-area-inset-bottom="false"
    >
      <van-tabbar-item icon="home-o">标签</van-tabbar-item>
      <van-tabbar-item icon="search" dot>标签</van-tabbar-item>
      <van-tabbar-item icon="friends-o" info="5">标签</van-tabbar-item>
      <van-tabbar-item icon="setting-o" info="20">标签</van-tabbar-item>
    </van-tabbar>
  </demo-block>

  <demo-block title="自定义图标">
    <van-tabbar
      v-model="active4"
      class="tabbar-position"
      :safe-area-inset-bottom="false"
    >
      <van-tabbar-item info="3">
        <template #icon>
          <img :src="icon.normal" style="width: 30px; height: 18px" />
        </template>
        <template #icon-active>
          <img :src="icon.active" style="width: 30px; height: 18px" />
        </template>
        自定义
      </van-tabbar-item>
      <van-tabbar-item icon="search">标签</van-tabbar-item>
      <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
    </van-tabbar>
  </demo-block>

  <demo-block title="自定义颜色">
    <van-tabbar
      v-model="active5"
      class="tabbar-position"
      active-color="#07c160"
      inactive-color="#000"
      :safe-area-inset-bottom="false"
    >
      <van-tabbar-item icon="home-o">标签</van-tabbar-item>
      <van-tabbar-item icon="search">标签</van-tabbar-item>
      <van-tabbar-item icon="friends-o">标签</van-tabbar-item>
      <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
    </van-tabbar>
  </demo-block>

  <demo-block title="切换标签事件">
    <van-tabbar
      v-model="active6"
      class="tabbar-position"
      :safe-area-inset-bottom="false"
      @change="handleChange"
    >
      <van-tabbar-item icon="home-o">标签1</van-tabbar-item>
      <van-tabbar-item icon="search">标签2</van-tabbar-item>
      <van-tabbar-item icon="friends-o">标签3</van-tabbar-item>
      <van-tabbar-item icon="setting-o">标签4</van-tabbar-item>
    </van-tabbar>
  </demo-block>
</template>
<script setup lang="ts">
import { ref } from "vue";

const active = ref(0);
const active2 = ref("home");
const active3 = ref(0);
const active4 = ref(0);
const active5 = ref(0);
const active6 = ref(0);
const icon = {
  normal: "https://img.yzcdn.cn/vant/user-inactive.png",
  active: "https://img.yzcdn.cn/vant/user-active.png",
};

function handleChange(val: number) {
  window.alert(`点击标签 ${val + 1}`);
}
</script>
<style scoped>
.tabbar-position {
  position: relative !important;
}
</style>
