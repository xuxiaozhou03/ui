<template>
  <demo-block custom-class="white" title="基础用法">
    <van-dropdown-menu>
      <van-dropdown-item v-model="value1" :options="option1" />
      <van-dropdown-item v-model="value2" :options="option2" />
    </van-dropdown-menu>
  </demo-block>

  <demo-block custom-class="white" title="自定义菜单内容">
    <van-dropdown-menu>
      <van-dropdown-item v-model="value1" :options="option1" />
      <van-dropdown-item ref="itemRef" :title="itemTitle">
        <van-cell :title="switchTitle1">
          <template #right-icon>
            <van-switch
              size="24px"
              style="height: 26px"
              v-model="switch1"
              active-color="#ee0a24"
              @change="onSwitch1Change"
            />
          </template>
        </van-cell>
        <van-cell :title="switchTitle2">
          <template #right-icon>
            <van-switch
              size="24px"
              style="height: 26px"
              v-model="switch2"
              active-color="#ee0a24"
              @change="onSwitch2Change"
            />
          </template>
        </van-cell>
        <div style="padding: 5px 16px">
          <van-button type="danger" block round @click="onConfirm">
            确认
          </van-button>
        </div>
      </van-dropdown-item>
    </van-dropdown-menu>
  </demo-block>

  <demo-block custom-class="white" title="自定义选中状态颜色">
    <van-dropdown-menu active-color="#1989fa">
      <van-dropdown-item v-model="value1" :options="option1" />
      <van-dropdown-item v-model="value2" :options="option2" />
    </van-dropdown-menu>
  </demo-block>

  <demo-block custom-class="white" title="向上展开">
    <van-dropdown-menu direction="up">
      <van-dropdown-item v-model="value1" :options="option1" />
      <van-dropdown-item v-model="value2" :options="option2" />
    </van-dropdown-menu>
  </demo-block>

  <demo-block custom-class="white" title="禁用菜单">
    <van-dropdown-menu>
      <van-dropdown-item v-model="value1" disabled :options="option1" />
      <van-dropdown-item v-model="value2" disabled :options="option2" />
    </van-dropdown-menu>
  </demo-block>

  <demo-block custom-class="white" title="异步打开/关闭">
    <van-dropdown-menu>
      <van-dropdown-item
        v-model="value1"
        :options="option1"
        use-before-toggle
        :before-toggle="onBeforeChange"
      />
    </van-dropdown-menu>
  </demo-block>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const switchTitle1 = "包邮";
const switchTitle2 = "团购";
const itemTitle = "筛选";
const option1 = [
  { text: "全部商品", value: 0 },
  { text: "新款商品", value: 1 },
  { text: "活动商品", value: 2 },
];
const option2 = [
  { text: "默认排序", value: "a" },
  { text: "好评排序", value: "b" },
  { text: "销量排序", value: "c" },
];
const switch1 = ref(true);
const switch2 = ref(false);
const value1 = ref(0);
const value2 = ref("a");

function onConfirm() {
  // 这里需要通过ref访问van-dropdown-item实例并调用toggle
  // 仅演示逻辑，实际需用ref绑定
}
function onSwitch1Change(val: boolean) {
  switch1.value = val;
}
function onSwitch2Change(val: boolean) {
  switch2.value = val;
}
function onBeforeChange({
  status,
  callback,
}: {
  status: boolean;
  callback: (ok: boolean) => void;
}) {
  // 这里用window.confirm模拟
  if (window.confirm(`确定要${status ? "打开" : "关闭"}下拉菜单吗？`)) {
    callback(true);
  } else {
    callback(false);
  }
}
</script>

<style></style>
