<template>
  <div class="van-empty">
    <div class="van-empty__image">
      <slot name="image" />
      <img
        v-if="imageToShow"
        class="van-empty__image__img"
        :src="imageToShow"
      />
    </div>
    <div class="van-empty__description">
      <slot name="description" />
      <template v-if="description">{{ description }}</template>
    </div>
    <div class="van-empty__bottom">
      <slot />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { emptyProps } from "./props";

const props = defineProps(emptyProps);

const PRESETS = ["error", "search", "default", "network"];
const imageToShow = computed(() => {
  if (!props.image) return "";
  if (PRESETS.includes(props.image)) {
    return `https://img.yzcdn.cn/vant/empty-image-${props.image}.png`;
  }
  return props.image;
});
</script>
<style>
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
