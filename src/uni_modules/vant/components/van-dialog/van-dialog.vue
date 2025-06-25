<template>
  <van-popup
    v-model:show="props.show"
    :z-index="props.zIndex"
    :overlay="props.overlay"
    :transition="props.transition"
    :class="
      cn(
        'van-dialog',
        `van-dialog--${props.theme}`,
        props.className,
        'custom-class'
      )
    "
    :style="rootStyle"
    :overlay-style="props.overlayStyle"
    :close-on-click-overlay="props.closeOnClickOverlay"
    :root-portal="props.rootPortal"
    @close="onClickOverlay"
  >
    <div
      v-if="props.title || props.useTitleSlot"
      :class="
        bem('dialog__header', { isolated: !(props.message || props.useSlot) })
      "
    >
      <template v-if="props.useTitleSlot">
        <slot name="title" />
      </template>
      <template v-else>{{ props.title }}</template>
    </div>

    <template v-if="props.useSlot">
      <slot />
    </template>
    <div
      v-else-if="props.message"
      :class="
        bem('dialog__message', [
          props.theme,
          props.messageAlign,
          { hasTitle: props.title },
        ])
      "
    >
      <span class="van-dialog__message-text">{{ props.message }}</span>
    </div>

    <van-goods-action
      v-if="props.theme === 'round-button'"
      class="van-dialog__footer--round-button"
    >
      <van-goods-action-button
        v-if="props.showCancelButton"
        size="large"
        :loading="loading.cancel"
        class="van-dialog__button van-hairline--right van-dialog__cancel cancle-button-class"
        :style="{ color: props.cancelButtonColor }"
        @click="onCancel"
      >
        {{ props.cancelButtonText }}
      </van-goods-action-button>
      <van-goods-action-button
        v-if="props.showConfirmButton"
        size="large"
        class="van-dialog__button van-dialog__confirm confirm-button-class"
        :loading="loading.confirm"
        :style="{ color: props.confirmButtonColor }"
        @click="onConfirm"
      >
        {{ props.confirmButtonText }}
      </van-goods-action-button>
    </van-goods-action>

    <div
      v-else-if="props.showCancelButton || props.showConfirmButton"
      class="van-hairline--top van-dialog__footer"
    >
      <template v-if="props.showCancelButton">
        <slot v-if="props.useCancelButtonSlot" name="cancel-button" />
        <van-button
          v-else
          size="large"
          :loading="loading.cancel"
          class="van-dialog__button van-hairline--right van-dialog__cancel cancle-button-class"
          :style="{ color: props.cancelButtonColor }"
          @click="onCancel"
        >
          {{ props.cancelButtonText }}
        </van-button>
      </template>
      <template v-if="props.showConfirmButton">
        <slot v-if="props.useConfirmButtonSlot" name="confirm-button" />
        <van-button
          v-else
          size="large"
          class="van-dialog__button van-dialog__confirm confirm-button-class"
          :loading="loading.confirm"
          :style="{ color: props.confirmButtonColor }"
          @click="onConfirm"
        >
          {{ props.confirmButtonText }}
        </van-button>
      </template>
    </div>
  </van-popup>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { vanDialogProps, VanDialogProps } from "./props";
import { cn, bem, addUnit } from "../../utils";

const props = defineProps(vanDialogProps);
const emit = defineEmits<{
  (e: "update:show", val: boolean): void;
  (e: "close", action: string): void;
  (e: "confirm"): void;
  (e: "cancel"): void;
  // 其它事件类型可补充
}>();

const loading = ref({ confirm: false, cancel: false });

function stopLoading() {
  loading.value = { confirm: false, cancel: false };
}

function close(action: string) {
  emit("update:show", false);
  stopLoading();
  emit("close", action);
}

function handleAction(action: "confirm" | "cancel") {
  emit(action);
  if (!props.asyncClose && !props.beforeClose) {
    close(action);
    return;
  }
  loading.value[action] = true;
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

const rootStyle = computed(() => ({
  width: props.width ? addUnit(props.width) : undefined,
  ...props.customStyle,
}));
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
