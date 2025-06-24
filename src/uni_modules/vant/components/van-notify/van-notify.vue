<template>
  <transition name="slide-down">
    <div
      v-if="show"
      class="van-notify__container"
      :style="rootStyle"
      @click="onTap"
    >
      <div :class="['van-notify', `van-notify--${type}`]" :style="notifyStyle">
        <div
          v-if="safeAreaInsetTop"
          :style="{ height: statusBarHeight + 'px' }"
        />
        <span>{{ message }}</span>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { notifyProps } from "./props";

defineProps(notifyProps);

const show = ref(false);
const statusBarHeight = 0; // 可根据平台获取
const rootStyle = computed(() => ({}));
const notifyStyle = computed(() => ({}));
function onTap() {}
</script>

<style>
.van-notify__container {
  /* ...保留原样式... */
}
</style>
