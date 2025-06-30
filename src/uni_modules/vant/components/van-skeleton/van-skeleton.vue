<template>
  <div v-if="loading" :class="cn(bem('skeleton', { animate }), customClass)">
    <div
      v-if="avatar"
      :class="cn(bem('skeleton__avatar', [avatarShape]), avatarClass)"
      :style="{ width: avatarSize, height: avatarSize }"
    />
    <div :class="bem('skeleton__content')">
      <div
        v-if="title"
        :class="cn(bem('skeleton__title'), titleClass)"
        :style="{ width: titleWidth }"
      />
      <div
        v-for="item in rowArray"
        :key="item.index"
        :class="cn(bem('skeleton__row'), rowClass)"
        :style="item.style"
      />
    </div>
  </div>
  <div v-else :class="bem('skeleton__content')">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from "vue";
import { skeletonProps } from "./props";
import { bem, cn } from "../../utils";

const props = defineProps(skeletonProps);

const rowArray = computed(() =>
  Array.from({ length: props.row }).map((_, index) => {
    return {
      index,
      style: {
        width: Array.isArray(props.rowWidth)
          ? props.rowWidth[index]
          : props.rowWidth,
      },
    };
  })
);
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
