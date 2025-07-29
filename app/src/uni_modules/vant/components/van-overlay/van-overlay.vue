<template>
  <import src="./overlay.wxml" />

<root-portal wx:if="{{ rootPortal }}">
  <include src="./overlay.wxml" />
</root-portal>

<include wx:else src="./overlay.wxml" />

</template>
<script lang="ts" setup>
  import { VantComponent } from '../common/component';

VantComponent({
  props: {
    show: Boolean,
    customStyle: String,
    duration: {
      type: null,
      value: 300,
    },
    zIndex: {
      type: Number,
      value: 1,
    },
    lockScroll: {
      type: Boolean,
      value: true,
    },
    rootPortal: {
      type: Boolean,
      value: false,
    },
  },

  methods: {
    onClick() {
      this.$emit('click');
    },

    // for prevent touchmove
    noop() {},
  },
});

  // 转换为 Vue 3 的 computed 属性
  
</script>
<style>
  @import '../common/index.wxss';.van-overlay{background-color:var(--overlay-background-color,rgba(0,0,0,.7));height:100%;left:0;position:fixed;top:0;width:100%}
</style>
