<template>
  <view class="van-empty">
    <view class="van-empty__image">
      <slot name="image"></slot>
      <img
        v-if="imageUrlComputed"
        class="van-empty__image__img"
        :src="imageUrlComputed"
      />
    </view>
    <view class="van-empty__description">
      <slot name="description"></slot>
      <template v-if="description">{{ description }}</template>
    </view>
    <view class="van-empty__bottom">
      <slot></slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { emptyProps, EmptyProps } from "./props";

const props = defineProps<EmptyProps>();

const PRESETS = ["error", "search", "default", "network"];
const imageUrlComputed = computed(() => {
  if (PRESETS.includes(props.image)) {
    return `https://img.yzcdn.cn/vant/empty-image-${props.image}.png`;
  }
  return props.image;
});
</script>

<style scoped>
.van-empty {
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 32px 0;
}
.van-empty__image {
  height: 160px;
  width: 160px;
}
.van-empty__image:empty {
  display: none;
}
.van-empty__image__img {
  height: 100%;
  width: 100%;
}
.van-empty__image:not(:empty) + .van-empty__image {
  display: none;
}
.van-empty__description {
  color: #969799;
  font-size: 14px;
  line-height: 20px;
  margin-top: 16px;
  padding: 0 60px;
}
.van-empty__description:empty,
.van-empty__description:not(:empty) + .van-empty__description {
  display: none;
}
.van-empty__bottom {
  margin-top: 24px;
}
</style>
