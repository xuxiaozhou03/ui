
  <template>
   <wxs src="../wxs/utils.wxs" module="utils" />

<van-popup
  show="{{ show }}"
  position="bottom"
  round="{{ round }}"
  z-index="{{ zIndex }}"
  overlay="{{ overlay }}"
  custom-class="van-action-sheet custom-class"
  safe-area-inset-bottom="{{ safeAreaInsetBottom }}"
  close-on-click-overlay="{{ closeOnClickOverlay }}"
  root-portal="{{ rootPortal }}"
  bind:close="onClickOverlay"
>
  <view wx:if="{{ title }}" class="van-action-sheet__header">
    {{ title }}
    <van-icon
      name="cross"
      custom-class="van-action-sheet__close"
      bind:click="onClose"
    />
  </view>
  <view wx:if="{{ description }}" class="van-action-sheet__description van-hairline--bottom">
    {{ description }}
  </view>
  <view wx:if="{{ actions && actions.length }}" class="list-class">
    <!-- button外包一层view，防止actions动态变化，导致渲染时button被打散 -->
    <button
      wx:for="{{ actions }}"
      wx:key="index"
      open-type="{{ item.disabled || item.loading || (canIUseGetUserProfile && item.openType === 'getUserInfo') ? '' : item.openType }}"
      style="{{ item.color ? 'color: ' + item.color : '' }}"
      class="{{ utils.bem('action-sheet__item', { disabled: item.disabled || item.loading }) }} {{ item.className || '' }}"
      hover-class="van-action-sheet__item--hover"
      data-index="{{ index }}"
      bindtap="{{ item.disabled || item.loading ? '' : 'onSelect' }}"
      bindgetuserinfo="onGetUserInfo"
      bindcontact="onContact"
      bindgetphonenumber="onGetPhoneNumber"
      binderror="onError"
      bindlaunchapp="onLaunchApp"
      bindopensetting="onOpenSetting"
      lang="{{ lang }}"
      session-from="{{ sessionFrom }}"
      send-message-title="{{ sendMessageTitle }}"
      send-message-path="{{ sendMessagePath }}"
      send-message-img="{{ sendMessageImg }}"
      show-message-card="{{ showMessageCard }}"
      app-parameter="{{ appParameter }}"
    >
      <block wx:if="{{ !item.loading }}">
        {{ item.name }}
        <view wx:if="{{ item.subname }}" class="van-action-sheet__subname" >{{ item.subname }}</view>
      </block>
      <van-loading wx:else custom-class="van-action-sheet__loading" size="22px" />
    </button>
  </view>
  <slot />
  <block wx:if="{{ cancelText }}">
    <view class="van-action-sheet__gap" />
    <view
      class="van-action-sheet__cancel"
      hover-class="van-action-sheet__cancel--hover"
      hover-stay-time="70"
      bind:tap="onCancel"
    >
      {{ cancelText }}
    </view>
  </block>
</van-popup>

  </template>
  <script lang="ts" setup>
  import { VantComponent } from '../common/component';
import { button } from '../mixins/button';

VantComponent({
  classes: ['list-class'],

  mixins: [button],
  props: {
    show: Boolean,
    title: String,
    cancelText: String,
    description: String,
    round: {
      type: Boolean,
      value: true,
    },
    zIndex: {
      type: Number,
      value: 100,
    },
    actions: {
      type: Array,
      value: [],
    },
    overlay: {
      type: Boolean,
      value: true,
    },
    closeOnClickOverlay: {
      type: Boolean,
      value: true,
    },
    closeOnClickAction: {
      type: Boolean,
      value: true,
    },
    safeAreaInsetBottom: {
      type: Boolean,
      value: true,
    },
    rootPortal: {
      type: Boolean,
      value: false,
    },
  },

  methods: {
    onSelect(event: WechatMiniprogram.TouchEvent) {
      const { index } = event.currentTarget.dataset;
      const { actions, closeOnClickAction, canIUseGetUserProfile } = this.data;
      const item = actions[index];
      if (item) {
        this.$emit('select', item);

        if (closeOnClickAction) {
          this.onClose();
        }

        if (item.openType === 'getUserInfo' && canIUseGetUserProfile) {
          wx.getUserProfile({
            desc: item.getUserProfileDesc || '  ',
            complete: (userProfile) => {
              this.$emit('getuserinfo', userProfile);
            },
          });
        }
      }
    },

    onCancel() {
      this.$emit('cancel');
    },

    onClose() {
      this.$emit('close');
    },

    onClickOverlay() {
      this.$emit('click-overlay');
      this.onClose();
    },
  },
});

  
  </script>
  
<style>
@import "./style.css";
</style>

  