<template>
  <demo-block title="基础用法" padding>
    <van-button type="primary" @click="onClickShow"> 显示遮罩层 </van-button>
    <van-overlay :show="show" @click="onClickHide" />
  </demo-block>

  <demo-block title="嵌入内容" padding>
    <van-button type="primary" @click="onClickShowEmbedded">
      嵌入内容
    </van-button>
    <van-overlay :show="showEmbedded" @click="onClickHideEmbedded">
      <div class="wrapper">
        <div class="block" @click.stop="noop" />
      </div>
    </van-overlay>
  </demo-block>
</template>
<script lang="ts" setup>
import { ref } from "vue";

const show = ref(false);
const showEmbedded = ref(false);

function onClickShow() {
  show.value = true;
}
function onClickHide() {
  show.value = false;
}
function onClickShowEmbedded() {
  showEmbedded.value = true;
}
function onClickHideEmbedded() {
  showEmbedded.value = false;
}
function noop() {}
</script>
<style>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 120px;
  height: 120px;
  background-color: #fff;
}
</style>
