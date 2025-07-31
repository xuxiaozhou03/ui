<template>
  <demo-block title="基础用法" padding>
    <van-empty description="描述文字" />
  </demo-block>

  <demo-block title="图片类型">
    <div>
      <div title="通用错误">
        <van-empty image="error" description="描述文字" />
      </div>
      <div title="网络错误">
        <van-empty image="network" description="描述文字" />
      </div>
      <div title="搜索提示">
        <van-empty image="search" description="描述文字" />
      </div>
    </div>
  </demo-block>

  <demo-block title="自定义图片" padding>
    <van-empty
      custom-class="custom-image"
      image="https://img.yzcdn.cn/vant/custom-empty-image.png"
      description="描述文字"
    />
  </demo-block>

  <demo-block title="底部内容" padding>
    <van-empty description="描述文字">
      <template #default>
        <van-button round type="danger" custom-class="bottom-button">
          按钮
        </van-button>
      </template>
    </van-empty>
  </demo-block>
</template>
<script lang="ts" setup>
import { ref } from "vue";

const activeTab = ref(0);
function onChange(event: any) {
  // 兼容 vant tabs 的事件格式
  if (event && event.name !== undefined) {
    activeTab.value = event.name;
  } else if (typeof event === "number") {
    activeTab.value = event;
  }
}
</script>
<style>
.custom-image .van-empty__image {
  width: 90px;
  height: 90px;
}

.bottom-button {
  width: 160px;
  height: 40px;
}
</style>
