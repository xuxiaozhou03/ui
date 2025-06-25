<template>
  <van-grid :column-num="2" :border="false">
    <van-grid-item use-slot>
      <h3 class="demo-sidebar-title">基础用法</h3>
      <van-sidebar class="custom-sidebar">
        <van-sidebar-item title="标签名" />
        <van-sidebar-item title="标签名" />
        <van-sidebar-item title="标签名" />
      </van-sidebar>
    </van-grid-item>

    <van-grid-item use-slot>
      <h3 class="demo-sidebar-title">徽标提示</h3>
      <van-sidebar class="custom-sidebar">
        <van-sidebar-item title="标签名" dot />
        <van-sidebar-item title="标签名" badge="5" />
        <van-sidebar-item title="标签名" badge="99+" />
      </van-sidebar>
    </van-grid-item>

    <van-grid-item use-slot>
      <h3 class="demo-sidebar-title">禁用选项</h3>
      <van-sidebar class="custom-sidebar">
        <van-sidebar-item title="标签名" />
        <van-sidebar-item title="标签名" disabled />
        <van-sidebar-item title="标签名" />
      </van-sidebar>
    </van-grid-item>

    <van-grid-item use-slot>
      <h3 class="demo-sidebar-title">监听切换事件</h3>
      <van-sidebar class="custom-sidebar" @change="onChange">
        <van-sidebar-item title="标签名 1" />
        <van-sidebar-item title="标签名 2" />
        <van-sidebar-item title="标签名 3" />
      </van-sidebar>
    </van-grid-item>
  </van-grid>

  <van-notify id="van-notify" />
</template>

<script setup lang="ts">
function onChange(index: number) {
  window.alert(`切换至第${index}项`);
}
</script>

<style>
.custom-sidebar {
  margin-left: 16px;
}

.demo-sidebar {
  background-color: #fff;
}

.demo-sidebar-title {
  margin-bottom: 16px;
  color: #969799;
  font-weight: normal;
  font-size: 14px;
}
</style>
