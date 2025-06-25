<template>
  <van-button
    square
    :id="id"
    size="large"
    :lang="lang"
    :loading="loading"
    :disabled="disabled"
    :open-type="openType"
    :business-id="businessId"
    class="van-goods-action-icon"
    :session-from="sessionFrom"
    :app-parameter="appParameter"
    :send-message-img="sendMessageImg"
    :send-message-path="sendMessagePath"
    :show-message-card="showMessageCard"
    :send-message-title="sendMessageTitle"
    @click="onClick"
    @error="onError"
    @contact="onContact"
    @opensetting="onOpenSetting"
    @getuserinfo="onGetUserInfo"
    @getphonenumber="onGetPhoneNumber"
    @launchapp="onLaunchApp"
  >
    <template v-if="icon">
      <van-icon
        :name="icon"
        :dot="dot"
        :info="info"
        :size="size"
        :color="color"
        :class-prefix="classPrefix"
        class="van-goods-action-icon__icon icon-class"
        info-class="info-class"
      />
    </template>
    <template v-else>
      <slot name="icon" />
    </template>
    <span class="text-class">{{ text }}</span>
  </van-button>
</template>

<script setup lang="ts">
import { goodsActionIconProps } from './props';
import { defineProps, defineEmits } from 'vue';

const props = defineProps(goodsActionIconProps);
const emit = defineEmits([
  'click',
  'error',
  'contact',
  'opensetting',
  'getuserinfo',
  'getphonenumber',
  'launchapp',
]);

function onClick(event: Event) {
  emit('click', event);
}
function onError(event: Event) {
  emit('error', event);
}
function onContact(event: Event) {
  emit('contact', event);
}
function onOpenSetting(event: Event) {
  emit('opensetting', event);
}
function onGetUserInfo(event: Event) {
  emit('getuserinfo', event);
}
function onGetPhoneNumber(event: Event) {
  emit('getphonenumber', event);
}
function onLaunchApp(event: Event) {
  emit('launchapp', event);
}
</script>

<style>
.van-goods-action-icon {
  border: none !important;
  color: var(--goods-action-icon-text-color, #646566) !important;
  display: flex !important;
  flex-direction: column;
  font-size: var(--goods-action-icon-font-size, 10px) !important;
  height: var(--goods-action-icon-height, 50px) !important;
  justify-content: center !important;
  line-height: 1 !important;
  min-width: var(--goods-action-icon-width, 48px);
}
.van-goods-action-icon__icon {
  color: var(--goods-action-icon-color, #323233);
  display: flex;
  font-size: var(--goods-action-icon-size, 18px);
  margin: 0 auto 5px;
}
</style>
