
<template>
  <view class="index">
    <view class="index-title">vant-weapp</view>
    <view class="p-2 space-y-2">
      <navigator
        v-for="item in needHandle"
        :key="item"
        class="p-2 bg-white rounded-lg border border-solid border-slate-400"
        :url="'/pages/'+item+'/index'"
      >
        {{ item }}
      </navigator>
      <div class="h-2 bg-slate-200"></div>
      <navigator
        v-for="item in ok"
        :key="item"
       class="p-2 bg-white rounded-lg border border-solid border-slate-400"
        :url="'/pages/'+item+'/index'"
      >
       {{ item }}
      </navigator>
      </view>
    </view>
</template>
<script lang="ts" setup>
const ok = []
const needHandle = [
  "action-sheet",
  "area",
  "button",
  "calendar",
  "card",
  "cascader",
  "cell",
  "checkbox",
  "circle",
  "col",
  "collapse",
  "config-provider",
  "count-down",
  "datetime-picker",
  "dialog",
  "divider",
  "dropdown-menu",
  "empty",
  "field",
  "goods-action",
  "grid",
  "icon",
  "image",
  "index-bar",
  "loading",
  "nav-bar",
  "notice-bar",
  "notify",
  "overlay",
  "panel",
  "picker",
  "popup",
  "progress",
  "radio",
  "rate",
  "search",
  "share-sheet",
  "sidebar",
  "skeleton",
  "slider",
  "stepper",
  "steps",
  "sticky",
  "submit-bar",
  "swipe-cell",
  "switch",
  "tab",
  "tabbar",
  "tag",
  "toast",
  "transition",
  "tree-select",
  "uploader"
];
</script>
     
