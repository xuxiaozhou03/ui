<template>
  <van-tabs v-model:active="activeTab">
    <van-tab title="基础用法">
      <van-index-bar v-if="activeTab === 0" :scroll-top="scrollTop">
        <template v-for="item in indexList" :key="item">
          <van-index-anchor :index="item" />
          <van-cell title="文本" />
          <van-cell title="文本" />
          <van-cell title="文本" />
        </template>
      </van-index-bar>
    </van-tab>

    <van-tab title="自定义索引列表">
      <van-index-bar
        v-if="activeTab === 1"
        :index-list="customIndexList"
        :scroll-top="scrollTop"
      >
        <template v-for="item in customIndexList" :key="item">
          <van-index-anchor use-slot :index="item">
            <span>标题{{ item }}</span>
          </van-index-anchor>
          <van-cell title="文本" />
          <van-cell title="文本" />
          <van-cell title="文本" />
        </template>
      </van-index-bar>
    </van-tab>
  </van-tabs>
</template>

<script setup lang="ts">
import { ref } from "vue";

const indexList: string[] = [];
const charCodeOfA = "A".charCodeAt(0);
for (let i = 0; i < 26; i++) {
  indexList.push(String.fromCharCode(charCodeOfA + i));
}

const activeTab = ref(0);
const customIndexList = ref([1, 2, 3, 4, 5, 6, 8, 9, 10]);
const scrollTop = ref(0);
</script>

<style></style>
