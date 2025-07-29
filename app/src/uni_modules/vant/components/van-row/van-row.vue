<template>
  <wxs src="./index.wxs" module="computed" />

  <view
    class="van-row custom-class"
    style="{{ computed.rootStyle({ gutter }) }}"
  >
    <slot />
  </view>
</template>
<script lang="ts" setup>
import { VantComponent } from "../common/component";
import { useChildren } from "../common/relation";
import { CSSProperties } from "vue";

VantComponent({
  relation: useChildren("col", function (target) {
    const { gutter } = this.data;

    if (gutter) {
      target.setData({ gutter });
    }
  }),

  props: {
    gutter: {
      type: Number,
      observer: "setGutter",
    },
  },

  methods: {
    setGutter() {
      this.children.forEach((col) => {
        col.setData(this.data);
      });
    },
  },
});

// 转换为 Vue 3 的 computed 属性
/* eslint-disable */
var style = require("../wxs/style.wxs");
var addUnit = require("../wxs/add-unit.wxs");

function rootStyle(data) {
  if (!data.gutter) {
    return "";
  }

  return style({
    "margin-right": addUnit(-data.gutter / 2),
    "margin-left": addUnit(-data.gutter / 2),
  });
}

module.exports = {
  rootStyle: rootStyle,
};
</script>
<style>
@import "../common/index.wxss";
.van-row:after {
  clear: both;
  content: "";
  display: table;
}
</style>
