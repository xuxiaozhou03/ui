<template>
  <div
    :style="rootStyle"
    :class="[props.customClass, bem('image', { round: props.round })]"
    @click="onClick"
  >
    <img
      v-if="!error"
      :src="props.src"
      :class="'image-class van-image__img'"
      :loading="props.lazyLoad ? 'lazy' : undefined"
      :draggable="false"
      :alt="''"
      :decoding="'async'"
      :crossorigin="null"
      :referrerpolicy="null"
      :style="{
        width: '100%',
        height: '100%',
        objectFit: mode,
        borderRadius: props.round ? '50%' : undefined,
      }"
      @load="onLoad"
      @error="onError"
    />
    <div
      v-if="loading && props.showLoading"
      class="loading-class van-image__loading"
    >
      <slot name="loading" v-if="props.useLoadingSlot" />
      <van-icon v-else name="photo" custom-class="van-image__loading-icon" />
    </div>
    <div v-if="error && props.showError" class="error-class van-image__error">
      <slot name="error" v-if="props.useErrorSlot" />
      <van-icon v-else name="photo-fail" custom-class="van-image__error-icon" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { imageProps } from "./props";
import { bem, addUnit } from "../../utils";

const props = defineProps(imageProps);
const emit = defineEmits(["load", "error", "click"]);

const error = ref(false);
const loading = ref(true);

watch(
  () => props.src,
  () => {
    error.value = false;
    loading.value = true;
  }
);

function onLoad(event: Event) {
  loading.value = false;
  emit("load", event);
}

function onError(event: Event) {
  loading.value = false;
  error.value = true;
  emit("error", event);
}

function onClick(event: Event) {
  emit("click", event);
}

const rootStyle = computed(() => {
  return [
    {
      width: addUnit(props.width),
      height: addUnit(props.height),
      borderRadius: addUnit(props.radius),
      overflow: props.radius ? "hidden" : undefined,
    },
    props.customStyle,
  ];
});

const FIT_MODE_MAP: Record<string, string> = {
  none: "none",
  fill: "fill",
  cover: "cover",
  contain: "contain",
  widthFix: "cover", // fallback for web
  heightFix: "cover", // fallback for web
  "scale-down": "scale-down",
};

const mode = computed(() => {
  return FIT_MODE_MAP[props.fit || "fill"] || "fill";
});
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
