<template>
  <view class="content">
    <view
      class="item"
      v-for="item in noOkItems"
      :key="item"
      @click="jump(item)"
    >
      {{ item }}
    </view>
    <div class="divider"></div>
    <view class="item" v-for="item in okItems" :key="item" @click="jump(item)">
      {{ item }}
    </view>
  </view>
</template>

<script setup lang="ts">
const noOkItems = [
  "action-sheet",
  "area",
  "calendar",
  "cascader",
  "checkbox",
  "circle",
  "col",
  "collapse",
  "config-provider",
  "count-down",
  "datetime-picker",
  "dialog",
  "dropdown-menu",
  "field",
  "goods-action",
  "grid",
  "index-bar",
  "nav-bar",
  "notice-bar",
  "notify",
  "panel",
  "picker",
  "popup",
  "progress",
  "radio",
  "rate",
  "search",
  "share-sheet",
  "sidebar",
  "slider",
  "stepper",
  "steps",
  "sticky",
  "submit-bar",
  "swipe-cell",
  "tab",
  "tabbar",
  "toast",
  "tree-select",
  "uploader",
];
const okItems: string[] = [
  "overlay",
  "loading",
  "icon",
  "button",
  "tag",
  "cell",
  "image",
  "transition",
  "divider",
  "card",
  "empty",
  "skeleton",
  "switch",
];

const jump = (item: string) => {
  uni.navigateTo({
    url: `/pages/${item}/index`,
  });
};
</script>

<style>
.content {
  padding: 8px;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.item {
  border: 1px solid #ddd;
  border-radius: 20px;
  padding: 8px 16px;
  background-color: #fff;
}

.divider {
  margin-top: 16px;
  margin-bottom: 16px;
  height: 1px;
  width: 100%;
  background-color: #ddd;
}
</style>
