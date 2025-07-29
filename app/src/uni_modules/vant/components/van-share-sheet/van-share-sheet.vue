<template>
  <wxs src="./index.wxs" module="computed" />

<van-popup
  round
  class="van-share-sheet"
  show="{{ show }}"
  position="bottom"
  overlay="{{ overlay }}"
  duration="{{ duration }}"
  z-index="{{ zIndex }}"
  overlay-style="{{ overlayStyle }}"
  close-on-click-overlay="{{ closeOnClickOverlay }}"
  safe-area-inset-bottom="{{ safeAreaInsetBottom }}"
  root-portal="{{ rootPortal }}"
  bind:close="onClose"
  bind:click-overlay="onClickOverlay"
>
  <view class="van-share-sheet__header">
    <view class="van-share-sheet__title">
      <slot name="title" />
    </view>
    <view wx:if="{{ title }}" class="van-share-sheet__title">{{ title }}</view>

    <view class="van-share-sheet__description">
      <slot name="description" />
    </view>
    <view wx:if="{{ description }}" class="van-share-sheet__description">
      {{ description }}
    </view>
  </view>

  <block wx:if="{{ computed.isMulti(options) }}">
    <options
      wx:for="{{ options }}"
      show-border="{{ index !== 0 }}"
      wx:key="index"
      options="{{ item }}"
      bind:select="onSelect"
    />
  </block>

  <options wx:else options="{{ options }}" bind:select="onSelect" />

  <button type="button" class="van-share-sheet__cancel" bindtap="onCancel">
    {{ cancelText }}
  </button>
</van-popup>

</template>
<script lang="ts" setup>
  import { VantComponent } from '../common/component';

VantComponent({
  props: {
    // whether to show popup
    show: Boolean,
    // overlay custom style
    overlayStyle: String,
    // z-index
    zIndex: {
      type: Number,
      value: 100,
    },
    title: String,
    cancelText: {
      type: String,
      value: '取消',
    },
    description: String,
    options: {
      type: Array,
      value: [],
    },
    overlay: {
      type: Boolean,
      value: true,
    },
    safeAreaInsetBottom: {
      type: Boolean,
      value: true,
    },
    closeOnClickOverlay: {
      type: Boolean,
      value: true,
    },
    duration: {
      type: null,
      value: 300,
    },
    rootPortal: {
      type: Boolean,
      value: false,
    },
  },

  methods: {
    onClickOverlay() {
      this.$emit('click-overlay');
    },

    onCancel() {
      this.onClose();
      this.$emit('cancel');
    },

    onSelect(event: WechatMiniprogram.CustomEvent) {
      this.$emit('select', event.detail);
    },

    onClose() {
      this.$emit('close');
    },
  },
});

  // 转换为 Vue 3 的 computed 属性
  /* eslint-disable */
function isMulti(options) {
  if (options == null || options[0] == null) {
    return false;
  }

  return "Array" === options.constructor && "Array" === options[0].constructor;
}

module.exports = {
  isMulti: isMulti
};

</script>
<style>
  @import '../common/index.wxss';.van-share-sheet__header{padding:12px 16px 4px;text-align:center}.van-share-sheet__title{color:#323233;font-size:14px;font-weight:400;line-height:20px;margin-top:8px}.van-share-sheet__title:empty,.van-share-sheet__title:not(:empty)+.van-share-sheet__title{display:none}.van-share-sheet__description{color:#969799;display:block;font-size:12px;line-height:16px;margin-top:8px}.van-share-sheet__description:empty,.van-share-sheet__description:not(:empty)+.van-share-sheet__description{display:none}.van-share-sheet__cancel{background:#fff;border:none;box-sizing:initial;display:block;font-size:16px;height:auto;line-height:48px;padding:0;text-align:center;width:100%}.van-share-sheet__cancel:before{background-color:#f7f8fa;content:" ";display:block;height:8px}.van-share-sheet__cancel:after{display:none}.van-share-sheet__cancel:active{background-color:#f2f3f5}
</style>
