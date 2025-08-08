
  <template>
   <wxs src="../wxs/utils.wxs" module="utils" />
<wxs src="./index.wxs" module="computed" />

<view
  class="{{ utils.bem('switch', { on: checked === activeValue, disabled }) }} custom-class"
  style="{{ computed.rootStyle({ size, checked, activeColor, inactiveColor, activeValue }) }}"
  bind:tap="onClick"
>
  <view class="van-switch__node node-class">
    <van-loading
      wx:if="{{ loading }}"
      color="{{ computed.loadingColor({ checked, activeColor, inactiveColor, activeValue }) }}"
      custom-class="van-switch__loading"
    />
  </view>
</view>

  </template>
  <script lang="ts" setup>
  import { VantComponent } from '../common/component';

VantComponent({
  field: true,

  classes: ['node-class'],

  props: {
    checked: null,
    loading: Boolean,
    disabled: Boolean,
    activeColor: String,
    inactiveColor: String,
    size: {
      type: String,
      value: '30',
    },
    activeValue: {
      type: null,
      value: true,
    },
    inactiveValue: {
      type: null,
      value: false,
    },
  },

  methods: {
    onClick() {
      const { activeValue, inactiveValue, disabled, loading } = this.data;

      if (disabled || loading) {
        return;
      }

      const checked = this.data.checked === activeValue;
      const value = checked ? inactiveValue : activeValue;

      this.$emit('input', value);
      this.$emit('change', value);
    },
  },
});

  // 以下代码转换为 computed 属性 
 /* eslint-disable */
var style = require('../wxs/style.wxs');
var addUnit = require('../wxs/add-unit.wxs');

function rootStyle(data) {
  var currentColor = data.checked === data.activeValue ? data.activeColor : data.inactiveColor;

  return style({
    'font-size': addUnit(data.size),
    'background-color': currentColor,
  });
}

var BLUE = '#1989fa';
var GRAY_DARK = '#969799';

function loadingColor(data) {
  return data.checked === data.activeValue
    ? data.activeColor || BLUE
    : data.inactiveColor || GRAY_DARK;
}

module.exports = {
  rootStyle: rootStyle,
  loadingColor: loadingColor,
};

  </script>
  
<style>
@import "./style.css";
</style>

  