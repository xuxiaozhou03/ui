<template>
  <div
    :style="rootStyle"
    :class="cn(bem('image', { round }), customClass)"
    @click="onClick"
  >
    <img
      v-if="!error"
      :src="src"
      :class="cn('van-image__img', imageClass)"
      :loading="lazyLoad ? 'lazy' : undefined"
      :style="imgStyle"
      @load="onLoad"
      @error="onError"
    />
    <div
      v-if="loading && showLoading"
      :class="cn('van-image__loading', loadingClass)"
    >
      <slot name="loading" v-if="useLoadingSlot" />
      <van-icon v-else name="photo" custom-class="van-image__loading-icon" />
    </div>
    <div v-if="error && showError" :class="cn('van-image__error', errorClass)">
      <slot name="error" v-if="useErrorSlot" />
      <van-icon v-else name="photo-fail" custom-class="van-image__error-icon" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, type CSSProperties } from "vue";
import { imageProps } from "./props";
import { bem, addUnit, cn } from "../../utils";

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
  const { width, height, radius, customStyle } = props;
  return [
    {
      width: addUnit(width),
      height: addUnit(height),
      borderRadius: addUnit(radius),
      overflow: radius ? "hidden" : undefined,
    },
    customStyle,
  ];
});

// 兼容 H5 下 mode/fill/cover/contain 等，直接用 object-fit
const imgStyle = computed<CSSProperties>(() => {
  const fit = props.fit || "fill";
  // let objectFit = "fill";
  if (fit === "widthFix" || fit === "heightFix") {
    // objectFit = "cover";
    return {
      objectFit: "cover",
    };
  } else if (
    fit === "none" ||
    fit === "cover" ||
    fit === "contain" ||
    fit === "scale-down"
  ) {
    // objectFit = fit;
    return {
      objectFit: fit,
    };
  }
  return {};
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
