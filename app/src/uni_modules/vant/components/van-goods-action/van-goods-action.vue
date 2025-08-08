
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

  
  </script>
  
<style>
@import "./style.css";
</style>

  