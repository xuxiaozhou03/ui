<template>
  <wxs src="../wxs/utils.wxs" module="utils" />

<view class="custom-class {{ utils.bem('goods-action', { safe: safeAreaInsetBottom }) }}">
  <slot />
</view>

</template>
<script lang="ts" setup>
  import { VantComponent } from '../common/component';
import { useChildren } from '../common/relation';

VantComponent({
  relation: useChildren('goods-action-button', function () {
    this.children.forEach((item) => {
      item.updateStyle();
    });
  }),

  props: {
    safeAreaInsetBottom: {
      type: Boolean,
      value: true,
    },
  },
});

  // 转换为 Vue 3 的 computed 属性
  
</script>
<style lang="scss" scoped>
  @import '../common/index.wxss';.van-goods-action{align-items:center;background-color:var(--goods-action-background-color,#fff);bottom:0;box-sizing:initial;display:flex;height:var(--goods-action-height,50px);left:0;position:fixed;right:0}.van-goods-action--safe{padding-bottom:env(safe-area-inset-bottom)}
</style>
