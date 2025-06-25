<template>
  <demo-block title="单选模式">
    <van-tree-select
      :items="items"
      :main-active-index="mainActiveIndex"
      :active-id="activeId"
      @click-item="onClickItem"
      @click-nav="onClickNav"
    />
  </demo-block>

  <demo-block title="多选模式">
    <van-tree-select
      max="2"
      :items="items"
      :main-active-index="mainActiveIndexMulti"
      :active-id="activeIdMulti"
      @click-item="onClickItemMulti"
      @click-nav="onClickNavMulti"
    />
  </demo-block>

  <demo-block title="自定义内容">
    <van-tree-select
      :items="[{ text: '分组 1' }, { text: '分组 2' }]"
      height="55vw"
      :main-active-index="mainActiveIndex"
      :active-id="activeId"
      @click-item="onClickItem"
      @click-nav="onClickNav"
    >
      <template #content>
        <van-image
          v-if="mainActiveIndex === 0"
          src="https://img.yzcdn.cn/vant/apple-1.jpg"
          width="100%"
          height="100%"
        />
        <van-image
          v-else-if="mainActiveIndex === 1"
          src="https://img.yzcdn.cn/vant/apple-2.jpg"
          width="100%"
          height="100%"
        />
      </template>
    </van-tree-select>
  </demo-block>

  <demo-block title="徽标提示">
    <van-tree-select
      :items="badgeItems"
      :main-active-index="mainActiveIndex"
      :active-id="activeId"
      @click-item="onClickItem"
      @click-nav="onClickNav"
    />
  </demo-block>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";

const config = {
  pro1Name: "浙江",
  pro1: [
    { text: "杭州", id: 1 },
    { text: "温州", id: 2 },
    { text: "宁波", id: 3, disabled: true },
    { text: "义乌", id: 4 },
  ],
  pro2Name: "江苏",
  pro2: [
    { text: "南京", id: 5 },
    { text: "无锡", id: 6 },
    { text: "徐州", id: 7 },
    { text: "苏州", id: 8 },
  ],
  pro3Name: "福建",
  pro3: [
    { text: "泉州", id: 9 },
    { text: "厦门", id: 10 },
  ],
};
const items = [
  { text: config.pro1Name, children: config.pro1 },
  { text: config.pro2Name, children: config.pro2 },
  { text: config.pro3Name, disabled: true, children: config.pro3 },
];
const badgeItems = [
  { ...items[0], dot: true },
  { ...items[1], badge: 5 },
];
const mainActiveIndex = ref(0);
const activeId = ref(0);
const mainActiveIndexMulti = ref(0);
const activeIdMulti = ref<any[]>([]);

function onClickNav({ detail }: any) {
  mainActiveIndex.value = detail.index || 0;
}
function onClickItem({ detail }: any) {
  activeId.value = activeId.value === detail.id ? null : detail.id;
}
function onClickNavMulti({ detail }: any) {
  mainActiveIndexMulti.value = detail.index || 0;
}
function onClickItemMulti({ detail }: any) {
  const idx = activeIdMulti.value.indexOf(detail.id);
  if (idx > -1) {
    activeIdMulti.value.splice(idx, 1);
  } else {
    activeIdMulti.value.push(detail.id);
  }
}
</script>
<style scoped></style>
