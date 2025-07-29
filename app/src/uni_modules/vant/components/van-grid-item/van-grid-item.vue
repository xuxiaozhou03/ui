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

  // 转换为 Vue 3 的 computed 属性
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
<style lang="scss" scoped>
  @import '../common/index.wxss';.van-grid-item{box-sizing:border-box;float:left;position:relative}.van-grid-item--square{height:0}.van-grid-item__content{background-color:var(--grid-item-content-background-color,#fff);box-sizing:border-box;display:flex;flex-direction:column;height:100%;padding:var(--grid-item-content-padding,16px 8px)}.van-grid-item__content:after{border-width:0 1px 1px 0;z-index:1}.van-grid-item__content--surround:after{border-width:1px}.van-grid-item__content--center{align-items:center;justify-content:center}.van-grid-item__content--square{left:0;position:absolute;right:0;top:0}.van-grid-item__content--horizontal{flex-direction:row}.van-grid-item__content--horizontal .van-grid-item__text{margin:0 0 0 8px}.van-grid-item__content--reverse{flex-direction:column-reverse}.van-grid-item__content--reverse .van-grid-item__text{margin:0 0 8px}.van-grid-item__content--horizontal.van-grid-item__content--reverse{flex-direction:row-reverse}.van-grid-item__content--horizontal.van-grid-item__content--reverse .van-grid-item__text{margin:0 8px 0 0}.van-grid-item__content--clickable:active{background-color:var(--grid-item-content-active-color,#f2f3f5)}.van-grid-item__icon{align-items:center;display:flex;font-size:var(--grid-item-icon-size,26px);height:var(--grid-item-icon-size,26px)}.van-grid-item__text{word-wrap:break-word;color:var(--grid-item-text-color,#646566);font-size:var(--grid-item-text-font-size,12px)}.van-grid-item__icon+.van-grid-item__text{margin-top:8px}
</style>
