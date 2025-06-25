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
      class="custom-image"
      image="https://img.yzcdn.cn/vant/custom-empty-image.png"
      description="描述文字"
    />
  </demo-block>

  <demo-block title="底部内容" padding>
    <van-empty description="描述文字">
      <van-button round type="danger" class="bottom-button"> 按钮 </van-button>
    </van-empty>
  </demo-block>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const activeTab = ref(0);
function onChange(event: any) {
  activeTab.value = event;
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
