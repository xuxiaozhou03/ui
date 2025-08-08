
  <template>
   <wxs src="../wxs/utils.wxs" module="utils" />
<wxs src="./index.wxs" module="computed" />

<view class="custom-class {{ utils.bem('loading', { vertical }) }}">
  <view
    class="van-loading__spinner van-loading__spinner--{{ type }}"
    style="{{ computed.spinnerStyle({ color, size }) }}"
  >
    <view
      wx:if="{{ type === 'spinner' }}"
      wx:for="{{ array12 }}"
      wx:key="index"
      class="van-loading__dot"
    />
  </view>
  <view class="van-loading__text" style="{{ computed.textStyle({ textSize }) }}">
    <slot />
  </view>
</view>

  </template>
  <script lang="ts" setup>
  import { VantComponent } from '../common/component';

VantComponent({
  props: {
    color: String,
    vertical: Boolean,
    type: {
      type: String,
      value: 'circular',
    },
    size: String,
    textSize: String,
  },

  data: {
    array12: Array.from({ length: 12 }),
  },
});

  // 以下代码转换为 computed 属性 
 /* eslint-disable */
var style = require('../wxs/style.wxs');
var addUnit = require('../wxs/add-unit.wxs');

function spinnerStyle(data) {
  return style({
    color: data.color,
    width: addUnit(data.size),
    height: addUnit(data.size),
  });
}

function textStyle(data) {
  return style({
    'font-size': addUnit(data.textSize),
  });
}

module.exports = {
  spinnerStyle: spinnerStyle,
  textStyle: textStyle,
};

  </script>
  
<style>
@import "./style.css";
</style>

  