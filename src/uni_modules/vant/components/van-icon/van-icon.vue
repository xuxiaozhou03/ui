<template>
  <span :class="rootClass" :style="rootStyle" @click="onClick">
    <van-info
      v-if="props.info != null || props.dot"
      :dot="props.dot"
      :info="props.info"
      custom-class="van-icon__info info-class"
    />
    <img
      v-if="isImage(props.name)"
      :src="props.name"
      class="van-icon__image"
      style="object-fit: contain; width: 1em; height: 1em"
    />
  </span>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { iconProps } from "./props";

const props = defineProps(iconProps);
const emit = defineEmits(["click"]);

function isImage(name?: string) {
  return !!name && name.indexOf("/") !== -1;
}

const rootClass = computed(() => {
  const classes = [props.customClass];
  if (props.classPrefix !== "van-icon") {
    classes.push("van-icon--custom");
  }
  if (props.classPrefix) {
    classes.push(props.classPrefix);
  }
  if (isImage(props.name)) {
    classes.push("van-icon--image");
  } else if (props.classPrefix && props.name) {
    classes.push(`${props.classPrefix}-${props.name}`);
  }
  return classes.join(" ");
});

const rootStyle = computed(() => {
  return [
    {
      color: props.color,
      fontSize: props.size
        ? typeof props.size === "number"
          ? props.size + "px"
          : props.size
        : undefined,
    },
    props.customStyle,
  ];
});

function onClick(event: Event) {
  emit("click", event);
}
</script>

<style>
.van-icon {
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  font: normal normal normal 14px/1 vant-icon;
  font: normal normal normal 14px/1 var(--van-icon-font-family, "vant-icon");
  font-size: inherit;
  position: relative;
}
.van-icon,
.van-icon:before {
  display: inline-block;
}
.van-icon--custom {
  position: relative;
}
.van-icon--image {
  height: 1em;
  width: 1em;
}
.van-icon__image {
  height: 100%;
  width: 100%;
}
.van-icon__info {
  z-index: 1;
}
</style>
