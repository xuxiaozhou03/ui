
  <template>
   <wxs src="../wxs/utils.wxs" module="utils" />
<wxs src="./index.wxs" module="computed" />

<view
  class="van-progress custom-class"
  style="{{ computed.rootStyle({ strokeWidth, trackColor }) }}"
>
  <view
    class="van-progress__portion"
    style="{{ computed.portionStyle({ percentage, inactive, color }) }}"
  >
    <view
      wx:if="{{ showPivot && computed.pivotText(pivotText, percentage) }}"
      style="{{ computed.pivotStyle({ textColor, pivotColor, inactive, color, right }) }}"
      class="van-progress__pivot"
    >
      {{ computed.pivotText(pivotText, percentage) }}
    </view>
  </view>
</view>

  </template>
  <script lang="ts" setup>
  import { VantComponent } from '../common/component';
import { BLUE } from '../common/color';
import { getRect } from '../common/utils';

VantComponent({
  props: {
    inactive: Boolean,
    percentage: {
      type: Number,
      observer: 'setLeft',
    },
    pivotText: String,
    pivotColor: String,
    trackColor: String,
    showPivot: {
      type: Boolean,
      value: true,
    },
    color: {
      type: String,
      value: BLUE,
    },
    textColor: {
      type: String,
      value: '#fff',
    },
    strokeWidth: {
      type: null,
      value: 4,
    },
  },

  data: {
    right: 0,
  },

  mounted() {
    this.setLeft();
  },

  methods: {
    setLeft() {
      Promise.all([
        getRect(this, '.van-progress'),
        getRect(this, '.van-progress__pivot'),
      ]).then(([portion, pivot]) => {
        if (portion && pivot) {
          this.setData({
            right: (pivot.width * (this.data.percentage - 100)) / 100,
          });
        }
      });
    },
  },
});

  // 以下代码转换为 computed 属性 
 /* eslint-disable */
var utils = require('../wxs/utils.wxs');
var style = require('../wxs/style.wxs');

function pivotText(pivotText, percentage) {
  return pivotText || percentage + '%';
}

function rootStyle(data) {
  return style({
    'height': data.strokeWidth ? utils.addUnit(data.strokeWidth) : '',
    'background': data.trackColor,
  });
}

function portionStyle(data) {
  return style({
    background: data.inactive ? '#cacaca' : data.color,
    width: data.percentage ? data.percentage + '%' : '',
  });
}

function pivotStyle(data) {
  return style({
    color: data.textColor,
    right: data.right + 'px',
    background: data.pivotColor ? data.pivotColor : data.inactive ? '#cacaca' : data.color,
  });
}

module.exports = {
  pivotText: pivotText,
  rootStyle: rootStyle,
  portionStyle: portionStyle,
  pivotStyle: pivotStyle,
};

  </script>
  
<style>
@import "./style.css";
</style>

  