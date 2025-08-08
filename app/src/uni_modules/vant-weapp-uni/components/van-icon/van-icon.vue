<template>
  <view :class="rootClass" :style="computedStyle" @tap="onClick">
    <van-info
      v-if="info !== null || dot"
      :dot="dot"
      :info="info"
      :custom-class="`van-icon__info ${props.infoClass}`"
    />
    <image
      v-if="isImage"
      :src="name"
      mode="aspectFit"
      class="van-icon__image"
    />
  </view>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { CSSProperties } from "vue";
import { addUnit, cn } from "../../utils";
import { iconProps } from "./props";

// Props 定义
const props = defineProps(iconProps);

// 事件定义
interface Emits {
  click: [];
}

const emit = defineEmits<Emits>();

// 计算属性
const isImage = computed(() => {
  return props.name ? props.name.indexOf("/") !== -1 : false;
});

const rootClass = computed(() => {
  return cn(
    props.customClass,
    props.classPrefix !== "van-icon" && "van-icon--custom",
    props.classPrefix,
    isImage.value && "van-icon--image",
    !isImage.value &&
      props.classPrefix &&
      props.name &&
      `${props.classPrefix}-${props.name}`
  );
});

const computedStyle = computed((): CSSProperties => {
  const baseStyles: CSSProperties = {};

  // 合并 customStyle
  if (props.customStyle) {
    Object.assign(baseStyles, props.customStyle);
  }

  // 设置颜色
  if (props.color) {
    baseStyles.color = props.color;
  }

  // 设置大小
  const fontSize = addUnit(props.size);
  if (fontSize) {
    baseStyles.fontSize = fontSize;
  }

  return baseStyles;
});

// 方法
const onClick = () => {
  emit("click");
};
</script>

<style>
@import "./style.css";
</style>
