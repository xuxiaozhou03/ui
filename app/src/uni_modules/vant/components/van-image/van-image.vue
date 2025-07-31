<template>
  <div
    :style="rootStyle"
    :class="['van-image', { 'van-image--round': round }, customClass]"
    @click="onClick"
  >
    <img
      v-if="!error"
      :src="src"
      :class="['van-image__img', imageClass]"
      :style="{
        objectFit: props.fit as 'cover',
      }"
      :loading="lazyLoad ? 'lazy' : undefined"
      :draggable="false"
      :width="width"
      :height="height"
      @load="onLoad"
      @error="onError"
    />
    <div
      v-if="loading && showLoading"
      :class="['van-image__loading', loadingClass]"
    >
      <slot name="loading">
        <van-icon name="photo" class="van-image__loading-icon" />
      </slot>
    </div>
    <div v-if="error && showError" :class="['van-image__error', errorClass]">
      <slot name="error">
        <van-icon name="photo-fail" class="van-image__error-icon" />
      </slot>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, watch, computed, type CSSProperties } from "vue";
import { addUnit } from "../../utils";
import { imageProps } from "./props";

const props = defineProps(imageProps);

const error = ref(false);
const loading = ref(true);

watch(
  () => props.src,
  () => {
    error.value = false;
    loading.value = true;
  }
);

const rootStyle = computed(() => {
  const style: CSSProperties = {};
  if (props.width) style.width = addUnit(props.width);
  if (props.height) style.height = addUnit(props.height);
  if (props.radius) {
    style.borderRadius = addUnit(props.radius);
    style.overflow = "hidden";
  }
  return style;
});

function onLoad(e: Event) {
  loading.value = false;
  // 兼容小程序事件结构
  // @ts-ignore
  emit("load", e.detail || e);
}

function onError(e: Event) {
  loading.value = false;
  error.value = true;
  // 兼容小程序事件结构
  // @ts-ignore
  emit("error", e.detail || e);
}

function onClick(e: Event) {
  // @ts-ignore
  emit("click", e.detail || e);
}

const emit = defineEmits(["load", "error", "click"]);
</script>
<style>
.van-image {
  display: inline-block;
  position: relative;
}
.van-image--round {
  border-radius: 50%;
  overflow: hidden;
}
.van-image--round .van-image__img {
  border-radius: inherit;
}
.van-image__error,
.van-image__img,
.van-image__loading {
  display: block;
  height: 100%;
  width: 100%;
}
.van-image__error,
.van-image__loading {
  align-items: center;
  background-color: var(--image-placeholder-background-color, #f7f8fa);
  color: var(--image-placeholder-text-color, #969799);
  display: flex;
  flex-direction: column;
  font-size: var(--image-placeholder-font-size, 14px);
  justify-content: center;
  left: 0;
  position: absolute;
  top: 0;
}
.van-image__loading-icon {
  color: var(--image-loading-icon-color, #dcdee0);
  font-size: var(--image-loading-icon-size, 32px) !important;
}
.van-image__error-icon {
  color: var(--image-error-icon-color, #dcdee0);
  font-size: var(--image-error-icon-size, 32px) !important;
}
</style>
