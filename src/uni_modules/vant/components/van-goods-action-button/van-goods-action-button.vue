<template>
  <van-button
    :id="id"
    :button-id="buttonId"
    :lang="lang"
    :type="type"
    :size="size"
    :color="color"
    :plain="plain"
    :loading="loading"
    :disabled="disabled"
    :open-type="openType"
    :class="buttonClass"
    :style="customStyle"
    :business-id="businessId"
    :session-from="sessionFrom"
    :app-parameter="appParameter"
    :send-message-img="sendMessageImg"
    :send-message-path="sendMessagePath"
    :show-message-card="showMessageCard"
    :send-message-title="sendMessageTitle"
    @click="onClick"
  >
    {{ text }}
    <slot></slot>
  </van-button>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { goodsActionButtonProps } from "./props";
import { bem } from "../../utils";

const props = defineProps(goodsActionButtonProps);
const emit = defineEmits(["click"]);

const buttonClass = computed(() =>
  bem("goods-action-button", {
    [props.type]: !!props.type,
    first: props.isFirst,
    last: props.isLast,
    plain: props.plain,
  })
);

function onClick(event: Event) {
  emit("click", event);
  // 如需跳转链接，可在此补充
}
</script>

<style>
:host {
  flex: 1;
}
.van-goods-action-button {
  --button-warning-background-color: var(
    --goods-action-button-warning-color,
    linear-gradient(to right, #ffd01e, #ff8917)
  );
  --button-danger-background-color: var(
    --goods-action-button-danger-color,
    linear-gradient(to right, #ff6034, #ee0a24)
  );
  --button-default-height: var(--goods-action-button-height, 40px);
  --button-line-height: var(--goods-action-button-line-height, 20px);
  --button-plain-background-color: var(--goods-action-button-plain-color, #fff);
  --button-border-width: 0;
  display: block;
}
.van-goods-action-button--first {
  --button-border-radius: 999px 0 0
    var(--goods-action-button-border-radius, 999px);
  margin-left: 5px;
}
.van-goods-action-button--last {
  --button-border-radius: 0 999px
    var(--goods-action-button-border-radius, 999px) 0;
  margin-right: 5px;
}
.van-goods-action-button--first.van-goods-action-button--last {
  --button-border-radius: var(--goods-action-button-border-radius, 999px);
}
.van-goods-action-button--plain {
  --button-border-width: 1px;
}
.van-goods-action-button__inner {
  font-weight: var(--font-weight-bold, 500) !important;
  width: 100%;
}
@media (max-width: 321px) {
  .van-goods-action-button {
    font-size: 13px;
  }
}
</style>
