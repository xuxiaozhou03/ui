<template>
  <demo-block title="基本用法">
  <van-search
    model:value="{{ value }}"
    placeholder="请输入搜索关键词"
    bind:search="onSearch"
  />
</demo-block>

<demo-block title="事件监听">
  <van-search
    model:value="{{ value }}"
    show-action
    placeholder="请输入搜索关键词"
    bind:search="onSearch"
    bind:cancel="onCancel"
    bind:clear="onClear"
  />
</demo-block>

<demo-block title="搜索框内容对齐">
  <van-search
    model:value="{{ value }}"
    input-align="center"
    placeholder="请输入搜索关键词"
  />
</demo-block>

<demo-block title="禁用搜索框">
  <van-search
    disabled
    model:value="{{ value }}"
    placeholder="请输入搜索关键词"
  />
</demo-block>

<demo-block title="自定义背景色">
  <van-search
    model:value="{{ value }}"
    shape="round"
    background="#4fc08d"
    placeholder="请输入搜索关键词"
  />
</demo-block>

<demo-block title="自定义按钮">
  <van-search
    model:value="{{ value }}"
    label="地址"
    shape="round"
    placeholder="请输入搜索关键词"
    use-action-slot
    bind:search="onSearch"
  >
    <view slot="action" bind:tap="onClick">搜索</view>
  </van-search>
</demo-block>

</template>
<script lang="ts" setup>
  import { VantComponent } from '../../common/component';

VantComponent({
  data: {
    value: '',
  },

  methods: {
    onChange(e) {
      this.setData({
        value: e.detail,
      });
    },

    onSearch() {
      if (this.data.value) {
        wx.showToast({
          title: '搜索：' + this.data.value,
          icon: 'none',
        });
      }
    },

    onClick() {
      if (this.data.value) {
        wx.showToast({
          title: '搜索：' + this.data.value,
          icon: 'none',
        });
      }
    },

    onCancel() {
      wx.showToast({
        title: '取消',
        icon: 'none',
      });
    },

    onClear() {
      wx.showToast({
        title: '清空',
        icon: 'none',
      });
    },
  },
});

  // 转换为 Vue 3 的 computed 属性
  
</script>
<style lang="scss" scoped>
  
</style>
