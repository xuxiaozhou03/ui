<template>
  <button
    :id="id || buttonId"
    :data-detail="dataset"
    :class="[
      'van-button',
      `van-button--${type}`,
      `van-button--${size}`,
      {
        'van-button--block': block,
        'van-button--round': round,
        'van-button--plain': plain,
        'van-button--square': square,
        'van-button--loading': loading,
        'van-button--disabled': disabled,
        'van-button--hairline': hairline,
        'van-button--unclickable': disabled || loading,
      },
      hairline ? 'van-hairline--surround' : '',
      customClass,
    ]"
    :hover-class="
      disabled || loading
        ? ''
        : 'van-button--active' + (hoverClass ? ' ' + hoverClass : '')
    "
    :lang="lang"
    :form-type="formType"
    :style="rootStyle"
    :open-type="
      disabled ||
      loading ||
      (canIUseGetUserProfile && openType === 'getUserInfo')
        ? ''
        : openType
    "
    :business-id="businessId"
    :session-from="sessionFrom"
    :send-message-title="sendMessageTitle"
    :send-message-path="sendMessagePath"
    :send-message-img="sendMessageImg"
    :show-message-card="showMessageCard"
    :app-parameter="appParameter"
    :aria-label="ariaLabel"
    @click="onClick"
    @getuserinfo="onGetUserInfo"
    @contact="onContact"
    @getphonenumber="onGetPhoneNumber"
    @getrealtimephonenumber="onGetRealTimePhoneNumber"
    @agreeprivacyauthorization="onAgreePrivacyAuthorization"
    @error="onError"
    @launchapp="onLaunchApp"
    @opensetting="onOpenSetting"
    @chooseavatar="onChooseAvatar"
  >
    <template v-if="loading">
      <van-loading
        :custom-class="loadingClass"
        :size="loadingSize"
        :type="loadingType"
        :color="loadingColor"
      />
      <template v-if="loadingText">
        <span class="van-button__loading-text">{{ loadingText }}</span>
      </template>
    </template>
    <template v-else>
      <van-icon
        v-if="icon"
        size="1.2em"
        :name="icon"
        :class-prefix="classPrefix"
        class="van-button__icon"
        :custom-style="{
          lineHeight: 'inherit',
        }"
      />
      <span class="van-button__text">
        <slot />
      </span>
    </template>
  </button>
</template>
<script lang="ts" setup>
import { computed, defineProps } from "vue";
import type { CSSProperties } from "vue";
import { buttonProps, commonButtonEmits } from "./props";

const props = defineProps(buttonProps);
// todo
const canIUseGetUserProfile = true;

const rootStyle = computed(() => {
  const c = props.color || "";
  if (!c) return props.customStyle;
  const styleObj: CSSProperties = {
    color: props.plain ? c : "#fff",
    background: props.plain ? undefined : c,
  };
  if (c.includes("gradient")) {
    styleObj.border = 0;
  } else {
    styleObj.borderColor = c;
  }
  return [styleObj, props.customStyle];
});

const loadingColor = computed(() => {
  const c = props.color || "";
  if (props.plain) {
    return c || "#c9c9c9";
  }
  if (props.type === "default") {
    return "#c9c9c9";
  }
  return "#fff";
});

const emit = defineEmits(commonButtonEmits);

function onClick(event: Event) {
  const { openType, getUserProfileDesc } = props;
  emit("click", event);

  if (openType === "getUserInfo" && canIUseGetUserProfile) {
    uni.getUserProfile({
      desc: getUserProfileDesc || "  ",
      // lang: lang || "en",
      complete: (userProfile) => {
        emit("getuserinfo", userProfile);
      },
    });
  }
}
function onGetUserInfo() {}
function onContact() {}
function onGetPhoneNumber() {}
function onGetRealTimePhoneNumber() {}
function onAgreePrivacyAuthorization() {}
function onError() {}
function onLaunchApp() {}
function onOpenSetting() {}
function onChooseAvatar() {}
</script>
<style>
.van-button {
  -webkit-text-size-adjust: 100%;
  align-items: center;
  -webkit-appearance: none;
  appearance: none;
  border-radius: var(--button-border-radius, 2px);
  box-sizing: border-box;
  display: inline-flex;
  font-size: var(--button-default-font-size, 16px);
  height: var(--button-default-height, 44px);
  justify-content: center;
  line-height: var(--button-line-height, 20px);
  padding: 0;
  position: relative;
  text-align: center;
  transition: opacity 0.2s;
  vertical-align: middle;
}
.van-button:before {
  background-color: #000;
  border: inherit;
  border-color: #000;
  border-radius: inherit;
  content: " ";
  height: 100%;
  left: 50%;
  opacity: 0;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
}
.van-button:after {
  border-width: 0;
}
.van-button--active:before {
  opacity: 0.15;
}
.van-button--unclickable:after {
  display: none;
}
.van-button--default {
  background: var(--button-default-background-color, #fff);
  border: var(--button-border-width, 1px) solid
    var(--button-default-border-color, #ebedf0);
  color: var(--button-default-color, #323233);
}
.van-button--primary {
  background: var(--button-primary-background-color, #07c160);
  border: var(--button-border-width, 1px) solid
    var(--button-primary-border-color, #07c160);
  color: var(--button-primary-color, #fff);
}
.van-button--info {
  background: var(--button-info-background-color, #1989fa);
  border: var(--button-border-width, 1px) solid
    var(--button-info-border-color, #1989fa);
  color: var(--button-info-color, #fff);
}
.van-button--danger {
  background: var(--button-danger-background-color, #ee0a24);
  border: var(--button-border-width, 1px) solid
    var(--button-danger-border-color, #ee0a24);
  color: var(--button-danger-color, #fff);
}
.van-button--warning {
  background: var(--button-warning-background-color, #ff976a);
  border: var(--button-border-width, 1px) solid
    var(--button-warning-border-color, #ff976a);
  color: var(--button-warning-color, #fff);
}
.van-button--plain {
  background: var(--button-plain-background-color, #fff);
}
.van-button--plain.van-button--primary {
  color: var(--button-primary-background-color, #07c160);
}
.van-button--plain.van-button--info {
  color: var(--button-info-background-color, #1989fa);
}
.van-button--plain.van-button--danger {
  color: var(--button-danger-background-color, #ee0a24);
}
.van-button--plain.van-button--warning {
  color: var(--button-warning-background-color, #ff976a);
}
.van-button--large {
  height: var(--button-large-height, 50px);
  width: 100%;
}
.van-button--normal {
  font-size: var(--button-normal-font-size, 14px);
  padding: 0 15px;
}
.van-button--small {
  font-size: var(--button-small-font-size, 12px);
  height: var(--button-small-height, 30px);
  min-width: var(--button-small-min-width, 60px);
  padding: 0 var(--padding-xs, 8px);
}
.van-button--mini {
  display: inline-block;
  font-size: var(--button-mini-font-size, 10px);
  height: var(--button-mini-height, 22px);
  min-width: var(--button-mini-min-width, 50px);
}
.van-button--mini + .van-button--mini {
  margin-left: 5px;
}
.van-button--block {
  display: flex;
  width: 100%;
}
.van-button--round {
  border-radius: var(--button-round-border-radius, 999px);
}
.van-button--square {
  border-radius: 0;
}
.van-button--disabled {
  opacity: var(--button-disabled-opacity, 0.5);
}
.van-button__text {
  display: inline;
}
.van-button__icon + .van-button__text:not(:empty),
.van-button__loading-text {
  margin-left: 4px;
}
.van-button__icon {
  line-height: inherit !important;
  min-width: 1em;
  vertical-align: top;
}
.van-button--hairline {
  border-width: 0;
  padding-top: 1px;
}
.van-button--hairline:after {
  border-color: inherit;
  border-radius: calc(var(--button-border-radius, 2px) * 2);
  border-width: 1px;
}
.van-button--hairline.van-button--round:after {
  border-radius: var(--button-round-border-radius, 999px);
}
.van-button--hairline.van-button--square:after {
  border-radius: 0;
}
</style>
