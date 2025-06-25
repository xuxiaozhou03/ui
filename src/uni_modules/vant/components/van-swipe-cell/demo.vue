<template>
  <demo-block title="基础用法">
    <van-swipe-cell :right-width="65" :left-width="65">
      <template #left>
        <div class="van-swipe-cell__left">选择</div>
      </template>
      <van-cell-group>
        <van-cell title="单元格" value="内容" />
      </van-cell-group>
      <template #right>
        <div class="van-swipe-cell__right">删除</div>
      </template>
    </van-swipe-cell>
  </demo-block>

  <demo-block title="异步关闭">
    <van-swipe-cell
      :right-width="65"
      :left-width="65"
      async-close
      @close="onClose"
    >
      <template #left>
        <div class="van-swipe-cell__left">选择</div>
      </template>
      <van-cell-group>
        <van-cell title="单元格" value="内容" />
      </van-cell-group>
      <template #right>
        <div class="van-swipe-cell__right">删除</div>
      </template>
    </van-swipe-cell>
  </demo-block>

  <demo-block title="主动打开">
    <van-swipe-cell
      :right-width="65"
      :left-width="65"
      name="示例"
      @open="onOpen"
    >
      <template #left>
        <div class="van-swipe-cell__left">选择</div>
      </template>
      <van-cell-group>
        <van-cell title="单元格" value="内容" />
      </van-cell-group>
      <template #right>
        <div class="van-swipe-cell__right">删除</div>
      </template>
    </van-swipe-cell>
  </demo-block>

  <van-dialog id="van-dialog" />
  <van-notify id="van-notify" />
</template>

<script setup lang="ts">
// @ts-ignore
const Dialog = window.Dialog || {};
// @ts-ignore
const Notify = window.Notify || {};

function onClose(event: any) {
  const { position, instance } = event.detail || {};
  if (!position || !instance) return;
  if (position === "left" || position === "cell") {
    instance.close();
  } else if (position === "right") {
    // @ts-ignore
    Dialog.confirm({ message: "确定删除吗？" }).then(() => {
      instance.close();
    });
  }
}

function onOpen(event: any) {
  const { position, name } = event.detail || {};
  if (!position) return;
  // @ts-ignore
  Notify({
    type: "primary",
    message: `${name || ""}${position}部分展示open事件被触发`,
  });
}
</script>

<style scoped>
.demo-swipe-cell {
  user-select: none;
}

.van-swipe-cell__left,
.van-swipe-cell__right {
  display: inline-block;
  width: 65px;
  height: 44px;
  font-size: 15px;
  line-height: 44px;
  color: #fff;
  text-align: center;
  background-color: #ee0a24;
}
</style>
