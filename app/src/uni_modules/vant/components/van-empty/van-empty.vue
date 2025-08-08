
  <template>
   <wxs src="../wxs/utils.wxs" module="utils" />
<wxs src="./index.wxs" module="computed" />

<view class="custom-class van-empty">
  <view class="van-empty__image">
    <slot name="image"></slot>
  </view>
  <view class="van-empty__image">
    <image wx:if="{{ image }}" class="van-empty__image__img" src="{{ computed.imageUrl(image) }}" />
  </view>

  <view class="van-empty__description">
    <slot name="description"></slot>
  </view>
  <view class="van-empty__description">
    {{ description }}
  </view>

  <view class="van-empty__bottom">
    <slot></slot>
  </view>
</view>

  </template>
  <script lang="ts" setup>
  import { VantComponent } from '../common/component';

VantComponent({
  props: {
    description: String,
    image: {
      type: String,
      value: 'default',
    },
  },
});

  // 以下代码转换为 computed 属性 
 /* eslint-disable */
var PRESETS = ['error', 'search', 'default', 'network'];

function imageUrl(image) {
  if (PRESETS.indexOf(image) !== -1) {
    return 'https://img.yzcdn.cn/vant/empty-image-' + image + '.png';
  }

  return image;
}

module.exports = {
  imageUrl: imageUrl,
};


  </script>
  
<style>
@import "./style.css";
</style>

  