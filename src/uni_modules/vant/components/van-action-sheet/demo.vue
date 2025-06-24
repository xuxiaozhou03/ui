<template>
  <demo-block title="基础用法" padding>
    <van-button type="primary" @click="toggleActionSheet1">弹出菜单</van-button>
    <van-action-sheet
      v-model:show="show1"
      :actions="action1"
      @close="toggleActionSheet1"
    />
  </demo-block>

  <demo-block title="选项状态" padding>
    <van-button type="primary" @click="toggleActionSheet2">弹出菜单</van-button>
    <van-action-sheet
      v-model:show="show2"
      :actions="action2"
      @close="toggleActionSheet2"
    />
  </demo-block>

  <demo-block title="展示取消按钮" padding>
    <van-button type="primary" @click="toggleActionSheet3">弹出菜单</van-button>
    <van-action-sheet
      v-model:show="show3"
      :actions="action1"
      cancel-text="取消"
      @close="toggleActionSheet3"
    />
  </demo-block>

  <demo-block title="展示描述信息" padding>
    <van-button type="primary" @click="toggleActionSheet4">弹出菜单</van-button>
    <van-action-sheet
      v-model:show="show4"
      :actions="action1"
      description="这是一段描述信息"
      @close="toggleActionSheet4"
    />
  </demo-block>

  <demo-block title="展示标题栏" padding>
    <van-button type="primary" @click="toggleActionSheet5">弹出菜单</van-button>
    <van-action-sheet
      v-model:show="show5"
      title="标题"
      @close="toggleActionSheet5"
    >
      <view class="content">内容</view>
    </van-action-sheet>
  </demo-block>

  <demo-block title="微信开放能力" padding>
    <van-button type="primary" @click="toggleActionSheet6">弹出菜单</van-button>
    <van-action-sheet
      v-model:show="show6"
      title="标题"
      :actions="action6"
      @close="toggleActionSheet6"
      @getuserinfo="onGetUserInfo"
    />
  </demo-block>
</template>
<script lang="ts" setup>
import { ref } from "vue";

const show1 = ref(false);
const show2 = ref(false);
const show3 = ref(false);
const show4 = ref(false);
const show5 = ref(false);
const show6 = ref(false);

const action1 = [
  { name: "选项" },
  { name: "选项" },
  { name: "选项", subname: "描述信息" },
];
const action2 = [
  { name: "着色选项", color: "#ee0a24" },
  { loading: true },
  { name: "禁用选项", disabled: true },
];
const action6 = [
  { name: "获取用户信息", color: "#07c160", openType: "getUserInfo" },
];

function toggleActionSheet1() {
  show1.value = !show1.value;
}
function toggleActionSheet2() {
  show2.value = !show2.value;
}
function toggleActionSheet3() {
  show3.value = !show3.value;
}
function toggleActionSheet4() {
  show4.value = !show4.value;
}
function toggleActionSheet5() {
  show5.value = !show5.value;
}
function toggleActionSheet6() {
  show6.value = !show6.value;
}
function onGetUserInfo(e: any) {
  console.log(e.detail);
}
</script>
<style>
.content {
  padding: 20px;
}
</style>
