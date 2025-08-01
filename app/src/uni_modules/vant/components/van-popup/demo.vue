<template>
  <demo-block title="基础用法">
    <van-cell title="展示弹出层" is-link @click="show.basic = true" />
    <van-popup
      v-model:show="show.basic"
      :custom-style="{ padding: '30px 50px' }"
    >
      内容
    </van-popup>
  </demo-block>

  <demo-block title="弹出位置">
    <van-cell title="顶部弹出" is-link @click="show.top = true" />
    <van-cell title="底部弹出" is-link @click="show.bottom = true" />
    <van-cell title="左侧弹出" is-link @click="show.left = true" />
    <van-cell title="右侧弹出" is-link @click="show.right = true" />

    <van-popup
      v-model:show="show.top"
      position="top"
      :custom-style="{ height: '20%' }"
    />
    <van-popup
      v-model:show="show.bottom"
      position="bottom"
      :custom-style="{ height: '20%' }"
    />
    <van-popup
      v-model:show="show.left"
      position="left"
      :custom-style="{ width: '20%', height: '100%' }"
    />
    <van-popup
      v-model:show="show.right"
      position="right"
      :custom-style="{ width: '20%', height: '100%' }"
    />
  </demo-block>

  <demo-block title="关闭图标">
    <van-cell title="关闭图标" is-link @click="show.closeIcon = true" />
    <van-cell title="自定义图标" is-link @click="show.customCloseIcon = true" />
    <van-cell
      title="图标位置"
      is-link
      @click="show.customIconPosition = true"
    />

    <van-popup
      v-model:show="show.closeIcon"
      closeable
      position="bottom"
      :custom-style="{ height: '20%' }"
    />

    <van-popup
      v-model:show="show.customCloseIcon"
      closeable
      close-icon="close"
      position="bottom"
      :custom-style="{ height: '20%' }"
    />

    <van-popup
      v-model:show="show.customIconPosition"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :custom-style="{ height: '20%' }"
    />
  </demo-block>

  <demo-block title="圆角弹窗">
    <van-cell title="圆角弹窗" is-link @click="show.round = true" />

    <van-popup
      v-model:show="show.round"
      round
      position="bottom"
      :custom-style="{ height: '20%' }"
    />
  </demo-block>
</template>
<script setup lang="ts">
import { reactive } from "vue";

const show = reactive({
  basic: false,
  top: false,
  bottom: false,
  left: false,
  right: false,
  round: false,
  closeIcon: false,
  customCloseIcon: false,
  customIconPosition: false,
});
</script>
