<template>
  <span :class="rootClass" :style="rootStyle" @click="onClick">
    <van-info
      v-if="info != null || dot"
      :dot="dot"
      :info="info"
      :custom-class="cn('van-icon__info', infoClass)"
    />
    <img
      v-if="isImage(name)"
      :src="name"
      class="van-icon__image"
      mode="aspectFit"
    />
  </span>
</template>

<script setup lang="ts">
import { computed, type CSSProperties } from "vue";
import { iconProps } from "./props";
import { isImage } from "../../utils/isImage";
import { cn, addUnit } from "../../utils/index";

const props = defineProps(iconProps);
const emit = defineEmits(["click"]);

const rootClass = computed(() =>
  cn(
    props.customClass,
    props.classPrefix !== "van-icon" && "van-icon--custom",
    props.classPrefix !== null && props.classPrefix,
    isImage(props.name)
      ? "van-icon--image"
      : props.classPrefix && props.name && `${props.classPrefix}-${props.name}`
  )
);

const rootStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {};
  if (props.color) style.color = props.color;
  if (props.size) style.fontSize = addUnit(props.size) as string;
  if (props.customStyle) Object.assign(style, props.customStyle);
  return style;
});

function onClick(event: Event) {
  emit("click", event);
}
</script>

<style>
@import "./index.css";
</style>
