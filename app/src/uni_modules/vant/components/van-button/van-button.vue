
  <template>
   <wxs src="../wxs/utils.wxs" module="utils" />
<wxs src="./index.wxs" module="computed" />

<button
  id="{{ id || buttonId }}"
  data-detail="{{ dataset }}"
  class="custom-class {{ utils.bem('button', [type, size, { block, round, plain, square, loading, disabled, hairline, unclickable: disabled || loading }]) }} {{ hairline ? 'van-hairline--surround' : '' }}"
  hover-class="{{ disabled || loading ? '' : 'van-button--active hover-class'}}"
  lang="{{ lang }}"
  form-type="{{ formType }}"
  style="{{ computed.rootStyle({ plain, color, customStyle }) }}"
  open-type="{{ disabled || loading || (canIUseGetUserProfile && openType === 'getUserInfo') ? '' : openType }}"
  business-id="{{ businessId }}"
  session-from="{{ sessionFrom }}"
  send-message-title="{{ sendMessageTitle }}"
  send-message-path="{{ sendMessagePath }}"
  send-message-img="{{ sendMessageImg }}"
  show-message-card="{{ showMessageCard }}"
  app-parameter="{{ appParameter }}"
  aria-label="{{ ariaLabel }}"
  bindtap="{{ disabled || loading ? '' : 'onClick' }}"
  bindgetuserinfo="onGetUserInfo"
  bindcontact="onContact"
  bindgetphonenumber="onGetPhoneNumber"
  bindgetrealtimephonenumber="onGetRealTimePhoneNumber"
  bindagreeprivacyauthorization="onAgreePrivacyAuthorization"
  binderror="onError"
  bindlaunchapp="onLaunchApp"
  bindopensetting="onOpenSetting"
  bindchooseavatar="onChooseAvatar"
>
  <block wx:if="{{ loading }}">
    <van-loading
      custom-class="loading-class"
      size="{{ loadingSize }}"
      type="{{ loadingType }}"
      color="{{ computed.loadingColor({ type, color, plain }) }}"
    />
    <view wx:if="{{ loadingText }}" class="van-button__loading-text">
      {{ loadingText }}
    </view>
  </block>
  <block wx:else>
    <van-icon
      wx:if="{{ icon }}"
      size="1.2em"
      name="{{ icon }}"
      class-prefix="{{ classPrefix }}"
      class="van-button__icon"
      custom-style="line-height: inherit;"
    />
    <view class="van-button__text">
      <slot />
    </view>
  </block>
</button>

  </template>
  <script lang="ts" setup>
  import { VantComponent } from '../common/component';
import { button } from '../mixins/button';
import { canIUseFormFieldButton } from '../common/version';

const mixins = [button];
if (canIUseFormFieldButton()) {
  mixins.push('wx://form-field-button');
}

VantComponent({
  mixins,

  classes: ['hover-class', 'loading-class'],

  data: {
    baseStyle: '',
  },

  props: {
    formType: String,
    icon: String,
    classPrefix: {
      type: String,
      value: 'van-icon',
    },
    plain: Boolean,
    block: Boolean,
    round: Boolean,
    square: Boolean,
    loading: Boolean,
    hairline: Boolean,
    disabled: Boolean,
    loadingText: String,
    customStyle: String,
    loadingType: {
      type: String,
      value: 'circular',
    },
    type: {
      type: String,
      value: 'default',
    },
    dataset: null,
    size: {
      type: String,
      value: 'normal',
    },
    loadingSize: {
      type: String,
      value: '20px',
    },
    color: String,
  },

  methods: {
    onClick(event: WechatMiniprogram.TouchEvent) {
      this.$emit('click', event);

      const {
        canIUseGetUserProfile,
        openType,
        getUserProfileDesc,
        lang,
      } = this.data;

      if (openType === 'getUserInfo' && canIUseGetUserProfile) {
        wx.getUserProfile({
          desc: getUserProfileDesc || '  ',
          lang: lang || 'en',
          complete: (userProfile) => {
            this.$emit('getuserinfo', userProfile);
          },
        });
      }
    },
  },
});

  // 以下代码转换为 computed 属性 
 /* eslint-disable */
var style = require('../wxs/style.wxs');

function rootStyle(data) {
  if (!data.color) {
    return data.customStyle;
  }

  var properties = {
    color: data.plain ? data.color : '#fff',
    background: data.plain ? null : data.color,
  };

  // hide border when color is linear-gradient
  if (data.color.indexOf('gradient') !== -1) {
    properties.border = 0;
  } else {
    properties['border-color'] = data.color;
  }

  return style([properties, data.customStyle]);
}

function loadingColor(data) {
  if (data.plain) {
    return data.color ? data.color : '#c9c9c9';
  }

  if (data.type === 'default') {
    return '#c9c9c9';
  }

  return '#fff';
}

module.exports = {
  rootStyle: rootStyle,
  loadingColor: loadingColor,
};

  </script>
  
<style>
@import "./style.css";
</style>

  