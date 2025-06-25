<template>
  <demo-block title="基础用法">
    <van-submit-bar
      :price="3050"
      button-text="提交订单"
      @submit="onClickButton"
      class="van-submit-bar"
      :safe-area-inset-bottom="false"
    />
  </demo-block>

  <demo-block title="禁用状态">
    <van-submit-bar
      disabled
      :price="3050"
      button-text="提交订单"
      tip="您的收货地址不支持同城送, 我们已为您推荐快递"
      tip-icon="info-o"
      @submit="onClickButton"
      class="van-submit-bar"
      :safe-area-inset-bottom="false"
    />
  </demo-block>

  <demo-block title="加载状态">
    <van-submit-bar
      loading
      :price="3050"
      button-text="提交订单"
      @submit="onClickButton"
      class="van-submit-bar"
      :safe-area-inset-bottom="false"
    />
  </demo-block>

  <demo-block title="高级用法">
    <van-submit-bar
      :price="3050"
      button-text="提交订单"
      @submit="onClickButton"
      class="van-submit-bar"
      :tip="true"
      :safe-area-inset-bottom="false"
    >
      <template #default>
        <van-tag type="primary" class="submit-tag">标签</van-tag>
      </template>
      <template #tip>
        您的收货地址不支持同城送
        <span class="edit-address" @click="onClickLink">修改地址</span>
      </template>
    </van-submit-bar>
  </demo-block>

  <van-toast id="van-toast" />
</template>

<script setup lang="ts">
import Toast from "../../toast/toast";

function onClickButton() {
  // @ts-ignore
  Toast({ message: "点击按钮" });
}
function onClickLink() {
  // @ts-ignore
  Toast({ message: "修改地址" });
}
</script>

<style scoped>
.van-submit-bar {
  position: relative !important;
}

.edit-address {
  color: #1989fa;
  cursor: pointer;
}

.submit-tag {
  margin-left: 15px;
}
</style>
