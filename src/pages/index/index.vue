<template>
  <view class="index">
    <view class="p-2 space-y-2">
      <navigator
        v-for="item in needHandle"
        :key="item"
        class="p-2 bg-white rounded-lg border border-solid border-slate-400"
        :url="'/pages/' + item + '/index'"
      >
        {{ item }}
      </navigator>
      <div class="h-2 bg-slate-200"></div>
      <navigator
        v-for="item in ok"
        :key="item"
        class="p-2 bg-white rounded-lg border border-solid border-slate-400"
        :url="'/pages/' + item + '/index'"
      >
        {{ item }}
      </navigator>
    </view>
  </view>
</template>
<script lang="ts" setup>
const ok = [
  "icon",
  "loading",
  "tag",
  "button",
  "empty",
  "skeleton",
  "divider",
  "cell",
  "transition",
  "switch",
  "image",
  "overlay",
];
const needHandle = [
  "action-sheet",
  "area",
  "calendar",
  "card",
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
</script>
