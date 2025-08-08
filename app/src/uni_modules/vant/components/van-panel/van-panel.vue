
  <template>
   <view class="van-panel van-hairline--top-bottom custom-class">
  <van-cell
    wx:if="{{ title || desc || status }}"
    title="{{ title }}"
    label="{{ desc }}"
    value="{{ status }}"
    custom-class="header-class"
    value-class="van-panel__header-value"
  />
  <slot wx:else name="header" />

  <view class="van-panel__content">
    <slot />
  </view>

  <view class="van-panel__footer van-hairline--top footer-class">
    <slot name="footer" />
  </view>
</view>

  </template>
  <script lang="ts" setup>
  import { VantComponent } from '../common/component';

VantComponent({
  classes: ['header-class', 'footer-class'],

  props: {
    desc: String,
    title: String,
    status: String,
  },
});

  
  </script>
  
<style>
@import "./style.css";
</style>

  