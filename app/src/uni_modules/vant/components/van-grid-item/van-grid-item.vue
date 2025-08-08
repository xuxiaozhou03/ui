
  <template>
   <wxs src="../wxs/utils.wxs" module="utils" />
<wxs src="./index.wxs" module="computed" />

<view
  class="custom-class {{ utils.bem('grid-item', { square }) }}"
  style="{{ computed.wrapperStyle({ square, gutter, columnNum, index }) }}"
  bindtap="onClick"
>
  <view
    class="content-class {{ utils.bem('grid-item__content', [direction, { center, square, reverse, clickable, surround: border && gutter }]) }} {{ border ? 'van-hairline--surround' : '' }}"
    style="{{ computed.contentStyle({ square, gutter }) }}"
  >
    <block wx:if="{{ useSlot }}">
      <slot />
    </block>
    <block wx:else>
      <view class="van-grid-item__icon icon-class">
        <van-icon wx:if="{{ icon }}" name="{{ icon }}" color="{{ iconColor }}" class-prefix="{{ iconPrefix }}" dot="{{ dot }}" info="{{ badge || info }}" size="{{ iconSize }}" />
        <slot wx:else name="icon"></slot>
      </view>
      <view class="van-grid-item__text text-class">
        <text wx:if="{{ text }}">{{ text }}</text>
        <slot wx:else name="text"></slot>
      </view>
    </block>
  </view>
</view>

  </template>
  <script lang="ts" setup>
  import { VantComponent } from '../common/component';
import { useParent } from '../common/relation';
import { link } from '../mixins/link';

VantComponent({
  relation: useParent('grid'),

  classes: ['content-class', 'icon-class', 'text-class'],

  mixins: [link],

  props: {
    icon: String,
    iconColor: String,
    iconPrefix: {
      type: String,
      value: 'van-icon',
    },
    dot: Boolean,
    info: null,
    badge: null,
    text: String,
    useSlot: Boolean,
  },

  data: {
    viewStyle: '',
  },

  mounted() {
    this.updateStyle();
  },

  methods: {
    updateStyle() {
      if (!this.parent) {
        return;
      }

      const { data, children } = this.parent;
      const {
        columnNum,
        border,
        square,
        gutter,
        clickable,
        center,
        direction,
        reverse,
        iconSize,
      } = data;

      this.setData({
        center,
        border,
        square,
        gutter,
        clickable,
        direction,
        reverse,
        iconSize,
        index: children.indexOf(this),
        columnNum,
      });
    },

    onClick() {
      this.$emit('click');
      this.jumpLink();
    },
  },
});

  // 以下代码转换为 computed 属性 
 /* eslint-disable */
var style = require('../wxs/style.wxs');
var addUnit = require('../wxs/add-unit.wxs');

function wrapperStyle(data) {
  var width = 100 / data.columnNum + '%';

  return style({
    width: width,
    'padding-top': data.square ? width : null,
    'padding-right': addUnit(data.gutter),
    'margin-top':
      data.index >= data.columnNum && !data.square
        ? addUnit(data.gutter)
        : null,
  });
}

function contentStyle(data) {
  return data.square
    ? style({
        right: addUnit(data.gutter),
        bottom: addUnit(data.gutter),
        height: 'auto',
      })
    : '';
}

module.exports = {
  wrapperStyle: wrapperStyle,
  contentStyle: contentStyle,
};

  </script>
  
<style>
@import "./style.css";
</style>

  