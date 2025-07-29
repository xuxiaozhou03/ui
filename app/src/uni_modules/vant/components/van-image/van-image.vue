<template>
  <wxs src="../wxs/utils.wxs" module="utils" />
<wxs src="./index.wxs" module="computed" />

<view
  style="{{ computed.rootStyle({ width, height, radius }) }}"
  class="custom-class {{ utils.bem('image', { round })}}"
  bind:tap="onClick"
>
  <image
    wx:if="{{ !error }}"
    src="{{ src }}"
    mode="{{ computed.mode(fit) }}"
    lazy-load="{{ lazyLoad }}"
    webp="{{ webp }}"
    class="image-class van-image__img"
    show-menu-by-longpress="{{ showMenuByLongpress }}"
    bind:load="onLoad"
    bind:error="onError"
  />

  <view
    wx:if="{{ loading && showLoading }}"
    class="loading-class van-image__loading"
  >
    <slot wx:if="{{ useLoadingSlot }}" name="loading" />
    <van-icon wx:else name="photo" custom-class="van-image__loading-icon" />
  </view>
  <view
    wx:if="{{ error && showError }}"
    class="error-class van-image__error"
  >
    <slot wx:if="{{ useErrorSlot }}" name="error" />
    <van-icon wx:else name="photo-fail" custom-class="van-image__error-icon" />
  </view>
</view>

</template>
<script lang="ts" setup>
  import { VantComponent } from '../common/component';
import { button } from '../mixins/button';

VantComponent({
  mixins: [button],

  classes: ['custom-class', 'loading-class', 'error-class', 'image-class'],

  props: {
    src: {
      type: String,
      observer() {
        this.setData({
          error: false,
          loading: true,
        });
      },
    },
    round: Boolean,
    width: null,
    height: null,
    radius: null,
    lazyLoad: Boolean,
    useErrorSlot: Boolean,
    useLoadingSlot: Boolean,
    showMenuByLongpress: Boolean,
    fit: {
      type: String,
      value: 'fill',
    },
    webp: {
      type: Boolean,
      value: false,
    },
    showError: {
      type: Boolean,
      value: true,
    },
    showLoading: {
      type: Boolean,
      value: true,
    },
  },

  data: {
    error: false,
    loading: true,
    viewStyle: '',
  },

  methods: {
    onLoad(event) {
      this.setData({
        loading: false,
      });

      this.$emit('load', event.detail);
    },

    onError(event) {
      this.setData({
        loading: false,
        error: true,
      });

      this.$emit('error', event.detail);
    },

    onClick(event) {
      this.$emit('click', event.detail);
    },
  },
});

  // 转换为 Vue 3 的 computed 属性
  /* eslint-disable */
var style = require('../wxs/style.wxs');
var addUnit = require('../wxs/add-unit.wxs');

function rootStyle(data) {
  return style([
    {
      width: addUnit(data.width),
      height: addUnit(data.height),
      'border-radius': addUnit(data.radius),
    },
    data.radius ? 'overflow: hidden' : null,
  ]);
}

var FIT_MODE_MAP = {
  none: 'center',
  fill: 'scaleToFill',
  cover: 'aspectFill',
  contain: 'aspectFit',
  widthFix: 'widthFix',
  heightFix: 'heightFix',
};

function mode(fit) {
  return FIT_MODE_MAP[fit];
}

module.exports = {
  rootStyle: rootStyle,
  mode: mode,
};

</script>
<style>
  @import '../common/index.wxss';.van-image{display:inline-block;position:relative}.van-image--round{border-radius:50%;overflow:hidden}.van-image--round .van-image__img{border-radius:inherit}.van-image__error,.van-image__img,.van-image__loading{display:block;height:100%;width:100%}.van-image__error,.van-image__loading{align-items:center;background-color:var(--image-placeholder-background-color,#f7f8fa);color:var(--image-placeholder-text-color,#969799);display:flex;flex-direction:column;font-size:var(--image-placeholder-font-size,14px);justify-content:center;left:0;position:absolute;top:0}.van-image__loading-icon{color:var(--image-loading-icon-color,#dcdee0);font-size:var(--image-loading-icon-size,32px)!important}.van-image__error-icon{color:var(--image-error-icon-color,#dcdee0);font-size:var(--image-error-icon-size,32px)!important}
</style>
