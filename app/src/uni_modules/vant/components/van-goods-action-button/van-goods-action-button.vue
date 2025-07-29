<template>
  <wxs src="../wxs/utils.wxs" module="utils" />
<van-button
  id="{{ id }}"
  button-id="{{ buttonId }}"
  lang="{{ lang }}"
  type="{{ type }}"
  size="{{ size }}"
  color="{{ color }}"
  plain="{{ plain }}"
  loading="{{ loading }}"
  disabled="{{ disabled }}"
  open-type="{{ openType }}"
  class="{{ utils.bem('goods-action-button', [type, { first: isFirst, last: isLast, plain: plain }])}}"
  custom-class="van-goods-action-button__inner custom-class"
  custom-style="{{customStyle}}"
  business-id="{{ businessId }}"
  session-from="{{ sessionFrom }}"
  app-parameter="{{ appParameter }}"
  send-message-img="{{ sendMessageImg }}"
  send-message-path="{{ sendMessagePath }}"
  show-message-card="{{ showMessageCard }}"
  send-message-title="{{ sendMessageTitle }}"
  bind:click="onClick"
  binderror="onError"
  bindcontact="onContact"
  bindopensetting="onOpenSetting"
  bindgetuserinfo="onGetUserInfo"
  bindagreeprivacyauthorization="onAgreePrivacyAuthorization"
  bindgetRealTimePhoneNumber="onGetRealTimePhoneNumber"
  bindgetphonenumber="onGetPhoneNumber"
  bindlaunchapp="onLaunchApp"
>
  {{ text }}
  <slot></slot>
</van-button>

</template>
<script lang="ts" setup>
  import { VantComponent } from '../common/component';
import { useParent } from '../common/relation';
import { button } from '../mixins/button';
import { link } from '../mixins/link';

VantComponent({
  mixins: [link, button],

  relation: useParent('goods-action'),

  props: {
    text: String,
    color: String,
    size: {
      type: String,
      value: 'normal',
    },
    loading: Boolean,
    disabled: Boolean,
    plain: Boolean,
    type: {
      type: String,
      value: 'danger',
    },
    customStyle: {
      type: String,
      value: '',
    },
  },

  methods: {
    onClick(event: WechatMiniprogram.CustomEvent) {
      this.$emit('click', event.detail);
      this.jumpLink();
    },

    updateStyle() {
      if (this.parent == null) {
        return;
      }

      const { index } = this;
      const { children = [] } = this.parent;

      this.setData({
        isFirst: index === 0,
        isLast: index === children.length - 1,
      });
    },
  },
});

  // 转换为 Vue 3 的 computed 属性
  
</script>
<style>
  @import '../common/index.wxss';:host{flex:1}.van-goods-action-button{--button-warning-background-color:var(--goods-action-button-warning-color,linear-gradient(to right,#ffd01e,#ff8917));--button-danger-background-color:var(--goods-action-button-danger-color,linear-gradient(to right,#ff6034,#ee0a24));--button-default-height:var(--goods-action-button-height,40px);--button-line-height:var(--goods-action-button-line-height,20px);--button-plain-background-color:var(--goods-action-button-plain-color,#fff);--button-border-width:0;display:block}.van-goods-action-button--first{--button-border-radius:999px 0 0 var(--goods-action-button-border-radius,999px);margin-left:5px}.van-goods-action-button--last{--button-border-radius:0 999px var(--goods-action-button-border-radius,999px) 0;margin-right:5px}.van-goods-action-button--first.van-goods-action-button--last{--button-border-radius:var(--goods-action-button-border-radius,999px)}.van-goods-action-button--plain{--button-border-width:1px}.van-goods-action-button__inner{font-weight:var(--font-weight-bold,500)!important;width:100%}@media (max-width:321px){.van-goods-action-button{font-size:13px}}
</style>
