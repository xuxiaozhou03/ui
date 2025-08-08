<template>
  <button
    :id="id || buttonId"
    :data-detail="dataset"
    :class="
      cn(
        props.customClass,
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
        hairline ? 'van-hairline--surround' : ''
      )
    "
    :hover-class="disabled || loading ? '' : props.hoverClass"
    :lang="lang"
    :form-type="formType"
    :style="computedStyle"
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
    @tap="disabled || loading ? null : onClick"
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
        :custom-class="props.loadingClass"
        :size="loadingSize"
        :type="loadingType"
        :color="loadingColor"
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
        :custom-class="`van-button__icon ${props.iconClass}`"
        custom-style="line-height: inherit;"
      />
      <view class="van-button__text">
        <slot />
      </view>
    </template>
  </button>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import type { CSSProperties } from "vue";
import { bem, cn } from "../../utils";
import { buttonProps, type ButtonProps } from "./props";

// Props 定义
const props = defineProps(buttonProps);

// 事件定义
interface Emits {
  click: [event: Event];
  getuserinfo: [userProfile: any];
  contact: [event: any];
  getphonenumber: [event: any];
  getrealtimephonenumber: [event: any];
  agreeprivacyauthorization: [event: any];
  error: [event: any];
  launchapp: [event: any];
  opensetting: [event: any];
  chooseavatar: [event: any];
}

const emit = defineEmits<Emits>();

// 计算属性
const computedStyle = computed((): CSSProperties => {
  const baseStyles: CSSProperties = {};

  // 合并 customStyle
  if (props.customStyle) {
    Object.assign(baseStyles, props.customStyle);
  }

  // 如果有颜色配置，覆盖相应样式
  if (props.color) {
    baseStyles.color = props.plain ? props.color : "#fff";
    baseStyles.background = props.plain ? undefined : props.color;

    // hide border when color is linear-gradient
    if (props.color.indexOf("gradient") !== -1) {
      baseStyles.border = "0";
    } else {
      baseStyles.borderColor = props.color;
    }
  }

  return baseStyles;
});

const loadingColor = computed(() => {
  if (props.plain) {
    return props.color ? props.color : "#c9c9c9";
  }

  if (props.type === "default") {
    return "#c9c9c9";
  }

  return "#fff";
});

// 方法
const onClick = (event: Event) => {
  emit("click", event);

  const { canIUseGetUserProfile, openType, getUserProfileDesc, lang } = props;

  if (openType === "getUserInfo" && canIUseGetUserProfile) {
    // #ifdef MP-WEIXIN
    // @ts-ignore
    uni.getUserProfile({
      desc: getUserProfileDesc || "  ",
      lang: (lang as "en" | "zh_CN" | "zh_TW") || "en",
      complete: (userProfile) => {
        emit("getuserinfo", userProfile);
      },
    });
    // #endif
  }
};

const onGetUserInfo = (event: any) => {
  emit("getuserinfo", event);
};

const onContact = (event: any) => {
  emit("contact", event);
};

const onGetPhoneNumber = (event: any) => {
  emit("getphonenumber", event);
};

const onGetRealTimePhoneNumber = (event: any) => {
  emit("getrealtimephonenumber", event);
};

const onAgreePrivacyAuthorization = (event: any) => {
  emit("agreeprivacyauthorization", event);
};

const onError = (event: any) => {
  emit("error", event);
};

const onLaunchApp = (event: any) => {
  emit("launchapp", event);
};

const onOpenSetting = (event: any) => {
  emit("opensetting", event);
};

const onChooseAvatar = (event: any) => {
  emit("chooseavatar", event);
};
</script>

<style>
@import "./style.css";
</style>
