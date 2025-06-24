<template>
  <view v-if="fixed && placeholder" :style="{ height: height + 'px' }" />
  <view
    class="van-nav-bar custom-class"
    :class="{ 'van-nav-bar--fixed': fixed, 'van-hairline--bottom': border }"
    :style="barStyle"
  >
    <view class="van-nav-bar__content">
      <view class="van-nav-bar__left" @click="onClickLeft">
        <template v-if="leftArrow || leftText">
          <van-icon
            v-if="leftArrow"
            size="16px"
            name="arrow-left"
            class="van-nav-bar__arrow"
          />
          <view v-if="leftText" class="van-nav-bar__text">{{ leftText }}</view>
        </template>
        <slot v-else name="left" />
      </view>
      <view class="van-nav-bar__title title-class van-ellipsis">
        <template v-if="title">{{ title }}</template>
        <slot v-else name="title" />
      </view>
      <view class="van-nav-bar__right" @click="onClickRight">
        <view v-if="rightText" class="van-nav-bar__text">{{ rightText }}</view>
        <slot v-else name="right" />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { navBarProps } from "./props";

defineProps(navBarProps);
const emit = defineEmits(["click-left", "click-right"]);

const height = ref(46);
const statusBarHeight = 0; // 可根据平台获取

const barStyle = computed(() => {
  return {
    zIndex: navBarProps.zIndex,
    paddingTop: navBarProps.safeAreaInsetTop ? statusBarHeight + "px" : 0,
    ...navBarProps.customStyle,
  };
});

function onClickLeft() {
  emit("click-left");
}
function onClickRight() {
  emit("click-right");
}
</script>

<style>
.van-nav-bar {
  background-color: var(--nav-bar-background-color, #fff);
  box-sizing: initial;
  height: var(--nav-bar-height, 46px);
  line-height: var(--nav-bar-height, 46px);
  position: relative;
  text-align: center;
  -webkit-user-select: none;
  user-select: none;
}
.van-nav-bar__content {
  height: 100%;
  position: relative;
}
.van-nav-bar__text {
  color: var(--nav-bar-text-color, #1989fa);
  display: inline-block;
  margin: 0 calc(var(--padding-md, 16px) * -1);
  padding: 0 var(--padding-md, 16px);
  vertical-align: middle;
}
.van-nav-bar__text--hover {
  background-color: #f2f3f5;
}
.van-nav-bar__arrow {
  color: var(--nav-bar-icon-color, #1989fa) !important;
  font-size: var(--nav-bar-arrow-size, 16px) !important;
  vertical-align: middle;
}
.van-nav-bar__arrow + .van-nav-bar__text {
  margin-left: -20px;
  padding-left: 25px;
}
.van-nav-bar--fixed {
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
}
.van-nav-bar__title {
  color: var(--nav-bar-title-text-color, #323233);
  font-size: var(--nav-bar-title-font-size, 16px);
  font-weight: var(--font-weight-bold, 500);
  margin: 0 auto;
  max-width: 60%;
}
.van-nav-bar__left,
.van-nav-bar__right {
  align-items: center;
  bottom: 0;
  display: flex;
  font-size: var(--font-size-md, 14px);
  position: absolute;
  top: 0;
}
.van-nav-bar__left {
  left: var(--padding-md, 16px);
}
.van-nav-bar__right {
  right: var(--padding-md, 16px);
}
</style>
