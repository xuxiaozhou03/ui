<template>
  <van-grid column-num="{{ 2 }}" border="{{ false }}">
  <van-grid-item use-slot>
    <h3 class="demo-sidebar-title">基础用法</h3>
    <van-sidebar custom-class="custom-sidebar">
      <van-sidebar-item title="标签名" />
      <van-sidebar-item title="标签名" />
      <van-sidebar-item title="标签名" />
    </van-sidebar>
  </van-grid-item>

  <van-grid-item use-slot>
    <h3 class="demo-sidebar-title">徽标提示</h3>
    <van-sidebar custom-class="custom-sidebar">
      <van-sidebar-item title="标签名" dot />
      <van-sidebar-item title="标签名" badge="5" />
      <van-sidebar-item title="标签名" badge="99+" />
    </van-sidebar>
  </van-grid-item>

  <van-grid-item use-slot>
    <h3 class="demo-sidebar-title">禁用选项</h3>
    <van-sidebar custom-class="custom-sidebar">
      <van-sidebar-item title="标签名" />
      <van-sidebar-item title="标签名" disabled />
      <van-sidebar-item title="标签名" />
    </van-sidebar>
  </van-grid-item>

  <van-grid-item use-slot>
    <h3 class="demo-sidebar-title">监听切换事件</h3>
    <van-sidebar custom-class="custom-sidebar" bind:change="onChange">
      <van-sidebar-item title="标签名 1" />
      <van-sidebar-item title="标签名 2" />
      <van-sidebar-item title="标签名 3" />
    </van-sidebar>
  </van-grid-item>
</van-grid>

<van-notify id="van-notify" />

</template>
<script lang="ts" setup>
  import { VantComponent } from '../../common/component';
import Notify from '../../notify/notify';

VantComponent({
  methods: {
    onChange(event) {
      Notify({
        context: this,
        type: 'primary',
        message: `切换至第${event.detail}项`,
      });
    },
  },
});

  // 转换为 Vue 3 的 computed 属性
  
</script>
<style lang="scss" scoped>
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
