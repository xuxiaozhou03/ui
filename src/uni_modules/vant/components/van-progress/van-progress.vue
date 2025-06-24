
    <template>
    


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
    import { cn, bem, commonProps } from "../../utils";
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


    // 把下面代码变成 computed 属性
    
var utils = require('../wxs/utils.wxs');


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
    .van-progress{background:var(--progress-background-color,#ebedf0);border-radius:var(--progress-height,4px);height:var(--progress-height,4px);position:relative}.van-progress__portion{background:var(--progress-color,#1989fa);border-radius:inherit;height:100%;left:0;position:absolute}.van-progress__pivot{background-color:var(--progress-pivot-background-color,#1989fa);border-radius:1em;box-sizing:border-box;color:var(--progress-pivot-text-color,#fff);font-size:var(--progress-pivot-font-size,10px);line-height:var(--progress-pivot-line-height,1.6);min-width:3.6em;padding:var(--progress-pivot-padding,0 5px);position:absolute;text-align:center;top:50%;transform:translateY(-50%);word-break:keep-all}
    </style>
  