<template>
  <demo-block title="基础用法" padding>
  <van-switch
    checked="{{ checked }}"
    bind:change="onChange"
  />
</demo-block>

<demo-block title="禁用状态" padding>
  <van-switch
    checked="{{ checked }}"
    disabled
    bind:change="onChange"
  />
</demo-block>

<demo-block title="加载状态" padding>
  <van-switch
    checked="{{ checked }}"
    loading
    bind:change="onChange"
  />
</demo-block>

<demo-block title="自定义大小" padding>
  <van-switch
    checked="{{ checked }}"
    size="24px"
    bind:change="onChange"
  />
</demo-block>

<demo-block title="自定义颜色" padding>
  <van-switch
    checked="{{ checked }}"
    active-color="#07c160"
    inactive-color="#ee0a24"
    bind:change="onChange"
  />
</demo-block>

<demo-block title="异步控制" padding>
  <van-switch
    checked="{{ checked2 }}"
    size="36px"
    bind:change="onChange2"
  />
</demo-block>

<van-dialog id="van-dialog" />

</template>
<script lang="ts" setup>
  import { VantComponent } from '../../common/component';
import Dialog from '../../dialog/dialog';

VantComponent({
  data: {
    checked: true,
    checked2: true,
  },

  methods: {
    onChange({ detail }) {
      this.setData({ checked: detail });
    },

    onChange2({ detail }) {
      Dialog.confirm({
        context: this,
        title: '提示',
        message: '是否切换开关？',
      }).then(() => {
        this.setData({ checked2: detail });
      });
    },
  },
});

  // 转换为 Vue 3 的 computed 属性
  
</script>
<style>
  
</style>
