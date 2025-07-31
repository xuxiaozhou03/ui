<template>
  <template v-if="loading">
    <div
      :class="[customClass, bem('skeleton', { animate })]"
      style="width: 100%"
    >
      <div
        v-if="avatar"
        :class="[avatarClass, bem('skeleton__avatar', { [avatarShape]: true })]"
        :style="{ width: avatarSizePx, height: avatarSizePx }"
      />
      <div :class="bem('skeleton__content')">
        <div
          v-if="title"
          :class="[titleClass, bem('skeleton__title')]"
          :style="{ width: titleWidth }"
        />
        <div
          v-for="(_, index) in rowArray"
          :key="index"
          :class="[rowClass, bem('skeleton__row')]"
          :style="{ width: isArray ? rowWidth[index] as string : rowWidth as string }"
        />
      </div>
    </div>
  </template>
  <div v-else :class="bem('skeleton__content')">
    <slot />
  </div>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { skeletonProps } from "./props";
import { addUnit, bem } from "../../utils";

const props = defineProps(skeletonProps);

const isArray = computed(() => Array.isArray(props.rowWidth));
const rowArray = computed(() => Array.from({ length: props.row }));
const avatarSizePx = computed(() => addUnit(props.avatarSize));
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
