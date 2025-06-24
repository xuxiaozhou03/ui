<template>
  <view
    v-if="show"
    class="van-notice-bar custom-class"
    :class="{
      'van-notice-bar--withicon': mode,
      'van-notice-bar--wrapable': wrapable,
    }"
    :style="rootStyle"
    @click="onClick"
  >
    <van-icon
      v-if="leftIcon"
      :name="leftIcon"
      class="van-notice-bar__left-icon"
    />
    <slot v-else name="left-icon" />
    <view class="van-notice-bar__wrap">
      <view
        class="van-notice-bar__content"
        :class="{ 'van-ellipsis': scrollable === false && !wrapable }"
      >
        <template v-if="text">{{ text }}</template>
        <slot v-else></slot>
      </view>
    </view>
    <van-icon
      v-if="mode === 'closeable'"
      class="van-notice-bar__right-icon"
      name="cross"
      @click.stop="onClickIcon"
    />
    <a v-else-if="mode === 'link'" :href="url" :target="openType">
      <van-icon class="van-notice-bar__right-icon" name="arrow" />
    </a>
    <slot v-else name="right-icon" />
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { noticeBarProps } from "./props";

defineProps(noticeBarProps);

const show = ref(true);
const rootStyle = computed(() => ({})); // 可根据 color/background 组合
function onClick() {}
function onClickIcon() {
  show.value = false;
}
</script>

<style>
.van-notice-bar {
  align-items: center;
  background-color: var(--notice-bar-background-color, #fffbe8);
  color: var(--notice-bar-text-color, #ed6a0c);
  display: flex;
  font-size: var(--notice-bar-font-size, 14px);
  height: var(--notice-bar-height, 40px);
  line-height: var(--notice-bar-line-height, 24px);
  padding: var(--notice-bar-padding, 0 16px);
}
.van-notice-bar--withicon {
  padding-right: 40px;
  position: relative;
}
.van-notice-bar--wrapable {
  height: auto;
  padding: var(--notice-bar-wrapable-padding, 8px 16px);
}
.van-notice-bar--wrapable .van-notice-bar__wrap {
  height: auto;
}
.van-notice-bar--wrapable .van-notice-bar__content {
  position: relative;
  white-space: normal;
}
.van-notice-bar__left-icon {
  align-items: center;
  display: flex;
  margin-right: 4px;
  vertical-align: middle;
}
.van-notice-bar__left-icon,
.van-notice-bar__right-icon {
  font-size: var(--notice-bar-icon-size, 16px);
  min-width: var(--notice-bar-icon-min-width, 22px);
}
.van-notice-bar__right-icon {
  position: absolute;
  right: 15px;
  top: 10px;
}
.van-notice-bar__wrap {
  flex: 1;
  height: var(--notice-bar-line-height, 24px);
  overflow: hidden;
  position: relative;
}
.van-notice-bar__content {
  position: absolute;
  white-space: nowrap;
}
.van-notice-bar__content.van-ellipsis {
  max-width: 100%;
}
</style>
