<template>
  <demo-block title="基础用法">
    <van-sticky>
      <van-button type="primary" style="margin-left: 15px">
        基础用法
      </van-button>
    </van-sticky>
  </demo-block>

  <demo-block title="吸顶距离">
    <van-sticky :offset-top="50">
      <van-button type="info" style="margin-left: 115px"> 吸顶距离 </van-button>
    </van-sticky>
  </demo-block>

  <demo-block title="指定容器">
    <div ref="containerRef" class="sticky-container">
      <van-sticky :container="getContainer">
        <van-button type="warning" style="margin-left: 215px">
          指定容器
        </van-button>
      </van-sticky>
    </div>
  </demo-block>

  <demo-block title="嵌套在 scroll-view 内使用">
    <div
      ref="scrollerRef"
      style="height: 200px; background-color: #fff; overflow-y: auto"
    >
      <div style="height: 400px; padding-top: 50px">
        <van-sticky :scroll-top="scrollTop" :offset-top="offsetTop">
          <van-button type="warning"> 嵌套在 scroll-view 内 </van-button>
        </van-sticky>
      </div>
    </div>
  </demo-block>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const containerRef = ref<HTMLElement | null>(null);
const scrollerRef = ref<HTMLElement | null>(null);
const scrollTop = ref(0);
const offsetTop = ref(0);

function getContainer() {
  return containerRef.value;
}

function onScroll() {
  if (scrollerRef.value) {
    scrollTop.value = scrollerRef.value.scrollTop;
    offsetTop.value = scrollerRef.value.getBoundingClientRect().top;
  }
}

onMounted(() => {
  if (scrollerRef.value) {
    scrollerRef.value.addEventListener("scroll", onScroll);
  }
});
</script>

<style scoped>
.van-button {
  margin-left: 16px;
}

.sticky-container {
  position: relative;
  z-index: -1;
  height: 150px;
  background-color: #fff;
}
</style>
