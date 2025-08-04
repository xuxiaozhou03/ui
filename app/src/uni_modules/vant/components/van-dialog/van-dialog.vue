<template>
  <van-popup
    :show="show"
    :z-index="zIndex"
    :overlay="overlay"
    :transition="transition"
    :class="['van-dialog', `van-dialog--${theme}`, className, 'custom-class']"
    :customStyle="{ width: width ? addUnit(width) : undefined, ...customStyle }"
    :overlay-style="overlayStyle"
    :close-on-click-overlay="closeOnClickOverlay"
    :root-portal="rootPortal"
    @close="onClickOverlay"
  >
    <div
      v-if="title || useTitleSlot"
      :class="[
        'van-dialog__header',
        { 'van-dialog__header--isolated': !(message || useSlot) },
      ]"
    >
      <slot v-if="useTitleSlot" name="title" />
      <template v-else>{{ title }}</template>
    </div>

    <slot v-if="useSlot" />
    <div
      v-else-if="message"
      :class="[
        'van-dialog__message',
        theme,
        messageAlign,
        { 'van-dialog__message--hasTitle': title },
      ]"
    >
      <span class="van-dialog__message-text">{{ message }}</span>
    </div>

    <van-goods-action
      v-if="theme === 'round-button'"
      class="van-dialog__footer--round-button"
    >
      <van-goods-action-button
        v-if="showCancelButton"
        size="large"
        :loading="loading.cancel"
        class="van-dialog__button van-hairline--right van-dialog__cancel cancle-button-class"
        :style="{ color: cancelButtonColor }"
        @click="onCancel"
      >
        {{ cancelButtonText }}
      </van-goods-action-button>
      <van-goods-action-button
        v-if="showConfirmButton"
        size="large"
        :loading="loading.confirm"
        class="van-dialog__button van-dialog__confirm confirm-button-class"
        :style="{ color: confirmButtonColor }"
        :button-id="confirmButtonId"
        :open-type="confirmButtonOpenType"
        :lang="lang"
        :business-id="businessId"
        :session-from="sessionFrom"
        :send-message-title="sendMessageTitle"
        :send-message-path="sendMessagePath"
        :send-message-img="sendMessageImg"
        :show-message-card="showMessageCard"
        :app-parameter="appParameter"
        @agreeprivacyauthorization="onAgreePrivacyAuthorization"
        @getRealTimePhoneNumber="onGetRealTimePhoneNumber"
        @click="onConfirm"
        @getuserinfo="onGetUserInfo"
        @contact="onContact"
        @getphonenumber="onGetPhoneNumber"
        @error="onError"
        @launchapp="onLaunchApp"
        @opensetting="onOpenSetting"
      >
        {{ confirmButtonText }}
      </van-goods-action-button>
    </van-goods-action>

    <div
      v-else-if="showCancelButton || showConfirmButton"
      class="van-hairline--top van-dialog__footer"
    >
      <template v-if="showCancelButton">
        <slot v-if="useCancelButtonSlot" name="cancel-button" />
        <van-button
          v-else
          size="large"
          :loading="loading.cancel"
          class="van-dialog__button van-hairline--right van-dialog__cancel cancle-button-class"
          :style="{ color: cancelButtonColor }"
          @click="onCancel"
        >
          {{ cancelButtonText }}
        </van-button>
      </template>

      <template v-if="showConfirmButton">
        <slot v-if="useConfirmButtonSlot" name="confirm-button" />
        <van-button
          v-else
          size="large"
          class="van-dialog__button van-dialog__confirm confirm-button-class"
          :loading="loading.confirm"
          :style="{ color: confirmButtonColor }"
          :button-id="confirmButtonId"
          :open-type="confirmButtonOpenType"
          :lang="lang"
          :business-id="businessId"
          :session-from="sessionFrom"
          :send-message-title="sendMessageTitle"
          :send-message-path="sendMessagePath"
          :send-message-img="sendMessageImg"
          :show-message-card="showMessageCard"
          :app-parameter="appParameter"
          @agreeprivacyauthorization="onAgreePrivacyAuthorization"
          @getRealTimePhoneNumber="onGetRealTimePhoneNumber"
          @click="onConfirm"
          @getuserinfo="onGetUserInfo"
          @contact="onContact"
          @getphonenumber="onGetPhoneNumber"
          @error="onError"
          @launchapp="onLaunchApp"
          @opensetting="onOpenSetting"
        >
          {{ confirmButtonText }}
        </van-button>
      </template>
    </div>
  </van-popup>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import { addUnit } from "../../utils";
import { dialogProps } from "./props";
import {
  onGetUserInfo,
  onContact,
  onGetPhoneNumber,
  onGetRealTimePhoneNumber,
  onAgreePrivacyAuthorization,
  onError,
  onLaunchApp,
  onOpenSetting,
} from "../van-button/handler";

const props = defineProps(dialogProps);

const emit = defineEmits<{
  (e: "close", action: string): void;
  (e: "confirm", payload: any): void;
  (e: "cancel", payload: any): void;
}>();

const loading = ref({ confirm: false, cancel: false });

watch(
  () => props.show,
  (val) => {
    if (!val) stopLoading();
  }
);

function stopLoading() {
  loading.value = { confirm: false, cancel: false };
}

function close(action: string) {
  emit("close", action);
  stopLoading();
}

function handleAction(action: "confirm" | "cancel") {
  if (action === "confirm") {
    emit("confirm", { dialog: null });
  } else if (action === "cancel") {
    emit("cancel", { dialog: null });
  }
  if (!props.asyncClose && !props.beforeClose) {
    close(action);
    return;
  }
  loading.value = { ...loading.value, [action]: true };
  if (props.beforeClose) {
    Promise.resolve(props.beforeClose(action)).then((value) => {
      if (value) {
        close(action);
      } else {
        stopLoading();
      }
    });
  }
}

function onConfirm() {
  handleAction("confirm");
}
function onCancel() {
  handleAction("cancel");
}
function onClickOverlay() {
  close("overlay");
}
</script>
<style>
.van-dialog {
  background-color: var(--dialog-background-color, #fff);
  border-radius: var(--dialog-border-radius, 16px);
  font-size: var(--dialog-font-size, 16px);
  overflow: hidden;
  top: 45% !important;
  width: var(--dialog-width, 320px);
}
@media (max-width: 321px) {
  .van-dialog {
    width: var(--dialog-small-screen-width, 90%);
  }
}
.van-dialog__header {
  font-weight: var(--dialog-header-font-weight, 500);
  line-height: var(--dialog-header-line-height, 24px);
  padding-top: var(--dialog-header-padding-top, 24px);
  text-align: center;
}
.van-dialog__header--isolated {
  padding: var(--dialog-header-isolated-padding, 24px 0);
}
.van-dialog__message {
  -webkit-overflow-scrolling: touch;
  font-size: var(--dialog-message-font-size, 14px);
  line-height: var(--dialog-message-line-height, 20px);
  max-height: var(--dialog-message-max-height, 60vh);
  overflow-y: auto;
  padding: var(--dialog-message-padding, 24px);
  text-align: center;
}
.van-dialog__message-text {
  word-wrap: break-word;
}
.van-dialog__message--hasTitle {
  color: var(--dialog-has-title-message-text-color, #646566);
  padding-top: var(--dialog-has-title-message-padding-top, 8px);
}
.van-dialog__message--round-button {
  color: #323233;
  padding-bottom: 16px;
}
.van-dialog__message--left {
  text-align: left;
}
.van-dialog__message--right {
  text-align: right;
}
.van-dialog__message--justify {
  text-align: justify;
}
.van-dialog__footer {
  display: flex;
}
.van-dialog__footer--round-button {
  padding: 8px 24px 16px !important;
  position: relative !important;
}
.van-dialog__button {
  flex: 1;
}
.van-dialog__cancel,
.van-dialog__confirm {
  border: 0 !important;
}
.van-dialog-bounce-enter {
  opacity: 0;
  transform: translate3d(-50%, -50%, 0) scale(0.7);
}
.van-dialog-bounce-leave-active {
  opacity: 0;
  transform: translate3d(-50%, -50%, 0) scale(0.9);
}
</style>
