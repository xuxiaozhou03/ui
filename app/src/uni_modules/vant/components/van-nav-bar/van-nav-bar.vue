
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

  // 以下代码转换为 computed 属性 
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
  
<style>
@import "./style.css";
</style>

  