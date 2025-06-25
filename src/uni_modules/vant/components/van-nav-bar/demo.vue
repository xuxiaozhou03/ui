<template>
  <demo-block title="基础用法">
    <van-nav-bar
      title="标题"
      right-text="按钮"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
  </demo-block>
  <demo-block title="高级用法">
    <van-nav-bar title="标题" left-text="返回" left-arrow>
      <template #right>
        <van-icon name="search" custom-class="icon" size="18" />
      </template>
    </van-nav-bar>
  </demo-block>
</template>

<script setup lang="ts">
function onClickLeft() {
  // 这里可用 Toast 或 alert 替代 wx.showToast
  alert("点击返回");
}

function onClickRight() {
  alert("点击按钮");
}
</script>

<style>
.icon {
  color: #1989fa;
}
</style>
