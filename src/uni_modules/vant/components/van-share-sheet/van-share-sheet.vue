<template>
  <van-popup
    round
    class="van-share-sheet"
    position="bottom"
    v-model:show="show"
    :overlay="overlay"
    :duration="duration"
    :z-index="zIndex"
    :overlay-style="overlayStyle"
    :close-on-click-overlay="closeOnClickOverlay"
    :safe-area-inset-bottom="safeAreaInsetBottom"
    :root-portal="rootPortal"
    @close="onClose"
    @click-overlay="onClickOverlay"
  >
    <div class="van-share-sheet__header">
      <div class="van-share-sheet__title">
        <slot name="title">{{ title }}</slot>
      </div>
      <div v-if="description" class="van-share-sheet__description">
        <slot name="description">{{ description }}</slot>
      </div>
    </div>
    <template v-if="isMulti">
      <template v-for="(item, index) in options" :key="index">
        <ShareSheetOptions
          :options="item"
          :show-border="index !== 0"
          @select="onSelect"
        />
      </template>
    </template>
    <template v-else>
      <ShareSheetOptions :options="options" @select="onSelect" />
    </template>
    <button type="button" class="van-share-sheet__cancel" @click="onCancel">
      {{ cancelText }}
    </button>
  </van-popup>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { shareSheetProps, ShareSheetProps } from "./props";
import VanPopup from "../van-popup/van-popup.vue";
// 你需要实现 ShareSheetOptions 组件或用 ul/li 替代

const props = defineProps<ShareSheetProps>();
const emit = defineEmits<{
  (e: "update:show", value: boolean): void;
  (e: "close"): void;
  (e: "select", value: any): void;
  (e: "cancel"): void;
  (e: "click-overlay"): void;
}>();

const show = computed({
  get: () => props.show,
  set: (val) => emit("update:show", val),
});

const overlay = computed(() => props.overlay ?? true);
const duration = computed(() => props.duration ?? 300);
const zIndex = computed(() => props.zIndex ?? 100);
const overlayStyle = computed(() => props.overlayStyle);
const closeOnClickOverlay = computed(() => props.closeOnClickOverlay ?? true);
const safeAreaInsetBottom = computed(() => props.safeAreaInsetBottom ?? true);
const rootPortal = computed(() => props.rootPortal ?? false);
const title = computed(() => props.title);
const description = computed(() => props.description);
const cancelText = computed(() => props.cancelText ?? "取消");
const options = computed(() => props.options ?? []);

const isMulti = computed(() => {
  const opts = options.value;
  return Array.isArray(opts) && Array.isArray(opts[0]);
});

function onClickOverlay() {
  emit("click-overlay");
}
function onCancel() {
  onClose();
  emit("cancel");
}
function onSelect(option: any) {
  emit("select", option);
}
function onClose() {
  emit("close");
}
</script>

<style>
.van-share-sheet__header {
  padding: 12px 16px 4px;
  text-align: center;
}
.van-share-sheet__title {
  color: #323233;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  margin-top: 8px;
}
.van-share-sheet__title:empty,
.van-share-sheet__title:not(:empty) + .van-share-sheet__title {
  display: none;
}
.van-share-sheet__description {
  color: #969799;
  display: block;
  font-size: 12px;
  line-height: 16px;
  margin-top: 8px;
}
.van-share-sheet__description:empty,
.van-share-sheet__description:not(:empty) + .van-share-sheet__description {
  display: none;
}
.van-share-sheet__cancel {
  background: #fff;
  border: none;
  box-sizing: initial;
  display: block;
  font-size: 16px;
  height: auto;
  line-height: 48px;
  padding: 0;
  text-align: center;
  width: 100%;
}
.van-share-sheet__cancel:before {
  background-color: #f7f8fa;
  content: " ";
  display: block;
  height: 8px;
}
.van-share-sheet__cancel:after {
  display: none;
}
.van-share-sheet__cancel:active {
  background-color: #f2f3f5;
}
</style>
