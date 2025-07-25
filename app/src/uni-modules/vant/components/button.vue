<template>
  <button
    :id="id || buttonId"
    :data-detail="dataset"
    :class="[
      'custom-class',
      bem('button', [
        type,
        size,
        {
          block,
          round,
          plain,
          square,
          loading,
          disabled,
          hairline,
          unclickable: disabled || loading,
        },
      ]),
      hairline ? 'van-hairline--surround' : '',
    ]"
    :hover-class="disabled || loading ? '' : 'van-button--active hover-class'"
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
    @tap="handleClick"
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
        custom-class="loading-class"
        :size="loadingSize"
        :type="loadingType"
        :color="computedLoadingColor"
      />
      <view v-if="loadingText" class="van-button__loading-text">
        {{ loadingText }}
      </view>
    </template>
    <template v-else>
      <van-icon
        v-if="icon"
        size="1.2em"
        :name="icon"
        :class-prefix="classPrefix"
        class="van-button__icon"
        custom-style="line-height: inherit;"
      />
      <view class="van-button__text">
        <slot />
      </view>
    </template>
  </button>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { CSSProperties } from "vue";
import { canIUseFormFieldButton } from "../common/version";
import { bem } from "../common/bem";

interface Props {
  id?: string;
  buttonId?: string;
  formType?: string;
  icon?: string;
  classPrefix?: string;
  plain?: boolean;
  block?: boolean;
  round?: boolean;
  square?: boolean;
  loading?: boolean;
  hairline?: boolean;
  disabled?: boolean;
  loadingText?: string;
  customStyle?: string;
  loadingType?: string;
  type?: string;
  dataset?: any;
  size?: string;
  loadingSize?: string;
  color?: string;
  lang?: string;
  businessId?: string;
  sessionFrom?: string;
  sendMessageTitle?: string;
  sendMessagePath?: string;
  sendMessageImg?: string;
  showMessageCard?: boolean;
  appParameter?: string;
  ariaLabel?: string;
}

const props = withDefaults(defineProps<Props>(), {
  classPrefix: "van-icon",
  plain: false,
  block: false,
  round: false,
  square: false,
  loading: false,
  hairline: false,
  disabled: false,
  loadingType: "circular",
  type: "default",
  size: "normal",
  loadingSize: "20px",
});

const emit = defineEmits<{
  (e: "click", event: TouchEvent): void;
  (e: "getuserinfo", userProfile: any): void;
  (e: "contact"): void;
  (e: "getphonenumber"): void;
  (e: "getrealtimephonenumber"): void;
  (e: "agreeprivacyauthorization"): void;
  (e: "error"): void;
  (e: "launchapp"): void;
  (e: "opensetting"): void;
  (e: "chooseavatar"): void;
}>();

const canIUseGetUserProfile = canIUseFormFieldButton();

const rootStyle = computed<CSSProperties>(() => {
  if (!props.color) {
    return { ...props.customStyle };
  }

  const properties: CSSProperties = {
    color: props.plain ? props.color : "#fff",
    background: props.plain ? undefined : props.color,
  };

  if (props.color.includes("gradient")) {
    properties.border = 0;
  } else {
    properties.borderColor = props.color;
  }

  return { ...properties, ...props.customStyle };
});

const computedLoadingColor = computed<string>(() => {
  if (props.plain) {
    return props.color ? props.color : "#c9c9c9";
  }

  if (props.type === "default") {
    return "#c9c9c9";
  }

  return "#fff";
});

const handleClick = (event: WechatMiniprogram.TouchEvent) => {
  if (props.disabled || props.loading) return;

  emit("click", event);

  if (props.openType === "getUserInfo" && canIUseGetUserProfile) {
    wx.getUserProfile({
      desc: props.getUserProfileDesc || "  ",
      lang: props.lang || "en",
      complete: (userProfile) => {
        emit("getuserinfo", userProfile);
      },
    });
  }
};
</script>

<style scoped>
.van-button {
  -webkit-text-size-adjust: 100%;
  align-items: center;
  -webkit-appearance: none;
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
