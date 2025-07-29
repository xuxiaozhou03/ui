<template>
  <wxs src="../wxs/utils.wxs" module="utils" />
<wxs src="./index.wxs" module="computed" />

<view wx:if="{{ fixed && placeholder }}" style="height: {{ height }}px;" />

<view
  class="{{ utils.bem('nav-bar', { fixed }) }} custom-class {{ border ? 'van-hairline--bottom' : '' }}"
  style="{{ computed.barStyle({ zIndex, statusBarHeight, safeAreaInsetTop }) }}; {{ customStyle }}"
>
  <view class="van-nav-bar__content">
    <view class="van-nav-bar__left" bind:tap="onClickLeft">
      <block wx:if="{{ leftArrow || leftText }}">
        <van-icon
          wx:if="{{ leftArrow }}"
          size="16px"
          name="arrow-left"
          custom-class="van-nav-bar__arrow"
        />
        <view
          wx:if="{{ leftText }}"
          class="van-nav-bar__text"
          hover-class="van-nav-bar__text--hover"
          hover-stay-time="70"
        >{{ leftText }}</view>
      </block>
      <slot wx:else name="left" />
    </view>
    <view class="van-nav-bar__title title-class van-ellipsis">
      <block wx:if="{{ title }}">{{ title }}</block>
      <slot wx:else name="title" />
    </view>
    <view class="van-nav-bar__right" bind:tap="onClickRight">
      <view
        wx:if="{{ rightText }}"
        class="van-nav-bar__text"
        hover-class="van-nav-bar__text--hover"
        hover-stay-time="70"
      >{{ rightText }}</view>
      <slot wx:else name="right" />
    </view>
  </view>
</view>

</template>
<script lang="ts" setup>
  import { VantComponent } from '../common/component';
import { getRect, getSystemInfoSync } from '../common/utils';

VantComponent({
  classes: ['title-class'],

  props: {
    title: String,
    fixed: {
      type: Boolean,
      observer: 'setHeight',
    },
    placeholder: {
      type: Boolean,
      observer: 'setHeight',
    },
    leftText: String,
    rightText: String,
    customStyle: String,
    leftArrow: Boolean,
    border: {
      type: Boolean,
      value: true,
    },
    zIndex: {
      type: Number,
      value: 1,
    },
    safeAreaInsetTop: {
      type: Boolean,
      value: true,
    },
  },

  data: {
    height: 46,
  },

  created() {
    const { statusBarHeight } = getSystemInfoSync();

    this.setData({
      statusBarHeight,
      height: 46 + statusBarHeight,
    });
  },

  mounted() {
    this.setHeight();
  },

  methods: {
    onClickLeft() {
      this.$emit('click-left');
    },

    onClickRight() {
      this.$emit('click-right');
    },

    setHeight() {
      if (!this.data.fixed || !this.data.placeholder) {
        return;
      }

      wx.nextTick(() => {
        getRect(this, '.van-nav-bar').then((res) => {
          if (res && 'height' in res) {
            this.setData({ height: res.height });
          }
        });
      });
    },
  },
});

  // 转换为 Vue 3 的 computed 属性
  /* eslint-disable */
var style = require('../wxs/style.wxs');

function barStyle(data) {
  return style({
    'z-index': data.zIndex,
    'padding-top': data.safeAreaInsetTop ? data.statusBarHeight + 'px' : 0,
  });
}

module.exports = {
  barStyle: barStyle,
};

</script>
<style lang="scss" scoped>
  @import '../common/index.wxss';.van-nav-bar{background-color:var(--nav-bar-background-color,#fff);box-sizing:initial;height:var(--nav-bar-height,46px);line-height:var(--nav-bar-height,46px);position:relative;text-align:center;-webkit-user-select:none;user-select:none}.van-nav-bar__content{height:100%;position:relative}.van-nav-bar__text{color:var(--nav-bar-text-color,#1989fa);display:inline-block;margin:0 calc(var(--padding-md, 16px)*-1);padding:0 var(--padding-md,16px);vertical-align:middle}.van-nav-bar__text--hover{background-color:#f2f3f5}.van-nav-bar__arrow{color:var(--nav-bar-icon-color,#1989fa)!important;font-size:var(--nav-bar-arrow-size,16px)!important;vertical-align:middle}.van-nav-bar__arrow+.van-nav-bar__text{margin-left:-20px;padding-left:25px}.van-nav-bar--fixed{left:0;position:fixed;top:0;width:100%}.van-nav-bar__title{color:var(--nav-bar-title-text-color,#323233);font-size:var(--nav-bar-title-font-size,16px);font-weight:var(--font-weight-bold,500);margin:0 auto;max-width:60%}.van-nav-bar__left,.van-nav-bar__right{align-items:center;bottom:0;display:flex;font-size:var(--font-size-md,14px);position:absolute;top:0}.van-nav-bar__left{left:var(--padding-md,16px)}.van-nav-bar__right{right:var(--padding-md,16px)}
</style>
