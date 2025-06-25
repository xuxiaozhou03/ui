<template>
  <div v-if="loading" :class="['custom-class', bem('skeleton', { animate })]">
    <div
      v-if="avatar"
      :class="['avatar-class', bem('skeleton__avatar', [avatarShape])]"
      :style="{ width: avatarSize, height: avatarSize }"
    />
    <div :class="bem('skeleton__content')">
      <div
        v-if="title"
        :class="['title-class', bem('skeleton__title')]"
        :style="{ width: titleWidth }"
      />
      <div
        v-for="(item, index) in rowArray"
        :key="index"
        :class="['row-class', bem('skeleton__row')]"
        :style="{ width: isArray ? rowWidth[index] : rowWidth }"
      />
    </div>
  </div>
  <div v-else :class="bem('skeleton__content')">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from "vue";
import { skeletonProps, SkeletonProps } from "./props";

const props = defineProps<SkeletonProps>();

const isArray = computed(() => Array.isArray(props.rowWidth));
const rowArray = computed(() => Array.from({ length: props.row }));

function bem(name: string, mods?: any) {
  // 简化版 BEM
  if (!mods) return `van-${name}`;
  let base = `van-${name}`;
  if (typeof mods === "object") {
    Object.keys(mods).forEach((k) => {
      if (mods[k]) base += ` van-${name}--${k}`;
    });
  } else if (Array.isArray(mods)) {
    mods.forEach((m) => {
      if (typeof m === "string") base += ` van-${name}--${m}`;
      else if (typeof m === "object") {
        Object.keys(m).forEach((k) => {
          if (m[k]) base += ` van-${name}--${k}`;
        });
      }
    });
  }
  return base;
}
</script>

<style>
.van-skeleton {
  box-sizing: border-box;
  display: flex;
  padding: var(--skeleton-padding, 0 16px);
  width: 100%;
}
.van-skeleton__avatar {
  background-color: var(--skeleton-avatar-background-color, #f2f3f5);
  flex-shrink: 0;
  margin-right: var(--padding-md, 16px);
}
.van-skeleton__avatar--round {
  border-radius: 100%;
}
.van-skeleton__content {
  flex: 1;
}
.van-skeleton__avatar + .van-skeleton__content {
  padding-top: var(--padding-xs, 8px);
}
.van-skeleton__row,
.van-skeleton__title {
  background-color: var(--skeleton-row-background-color, #f2f3f5);
  height: var(--skeleton-row-height, 16px);
}
.van-skeleton__title {
  margin: 0;
}
.van-skeleton__row:not(:first-child) {
  margin-top: var(--skeleton-row-margin-top, 12px);
}
.van-skeleton__title + .van-skeleton__row {
  margin-top: 20px;
}
.van-skeleton--animate {
  animation: van-skeleton-blink 1.2s ease-in-out infinite;
}
@keyframes van-skeleton-blink {
  50% {
    opacity: 0.6;
  }
}
</style>
