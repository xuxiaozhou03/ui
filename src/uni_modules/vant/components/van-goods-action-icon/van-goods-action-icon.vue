
    <template>
    <van-button
  square
  id="{{ id }}"
  size="large"
  lang="{{ lang }}"
  loading="{{ loading }}"
  disabled="{{ disabled }}"
  open-type="{{ openType }}"
  business-id="{{ businessId }}"
  custom-class="van-goods-action-icon"
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
  bindgetphonenumber="onGetPhoneNumber"
  bindlaunchapp="onLaunchApp"
>
  <van-icon
    wx:if="{{ icon }}"
    name="{{ icon }}"
    dot="{{ dot }}"
    info="{{ info }}"
    size="{{ size }}"
    color="{{ color }}"
    class-prefix="{{ classPrefix }}"
    class="van-goods-action-icon__icon"
    custom-class="icon-class"
    info-class="info-class"
  />
  <view wx:else>
    <slot name="icon" />
  </view>
  <text class="text-class">{{ text }}</text>
</van-button>

    </template>
    <script lang="ts" setup>
    import { cn, bem, commonProps } from "../../utils";
    import { VantComponent } from '../common/component';
import { button } from '../mixins/button';
import { link } from '../mixins/link';

VantComponent({
  classes: ['icon-class', 'text-class', 'info-class'],

  mixins: [link, button],

  props: {
    text: String,
    dot: Boolean,
    info: String,
    icon: String,
    size: String,
    color: String,
    classPrefix: {
      type: String,
      value: 'van-icon',
    },
    disabled: Boolean,
    loading: Boolean,
  },

  methods: {
    onClick(event: WechatMiniprogram.CustomEvent) {
      this.$emit('click', event.detail);
      this.jumpLink();
    },
  },
});


    
    </script>
    <style>
    .van-goods-action-icon{border:none!important;color:var(--goods-action-icon-text-color,#646566)!important;display:flex!important;flex-direction:column;font-size:var(--goods-action-icon-font-size,10px)!important;height:var(--goods-action-icon-height,50px)!important;justify-content:center!important;line-height:1!important;min-width:var(--goods-action-icon-width,48px)}.van-goods-action-icon__icon{color:var(--goods-action-icon-color,#323233);display:flex;font-size:var(--goods-action-icon-size,18px);margin:0 auto 5px}
    </style>
  