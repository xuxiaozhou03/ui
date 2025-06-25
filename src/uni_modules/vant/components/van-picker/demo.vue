<template>
  <demo-block title="基础用法">
    <van-picker :columns="column1" @change="onChange1" />
  </demo-block>

  <demo-block title="默认选中项">
    <van-picker :columns="column1" :default-index="2" @change="onChange1" />
  </demo-block>

  <demo-block title="展示顶部栏">
    <van-picker
      show-toolbar
      title="标题"
      :columns="column1"
      @change="onChange1"
      @confirm="onConfirm"
      @cancel="onCancel"
    />
  </demo-block>

  <demo-block title="多列联动">
    <van-picker :columns="column4" @change="onChange2" />
  </demo-block>

  <demo-block title="禁用选项">
    <van-picker :columns="column2" />
  </demo-block>

  <demo-block title="加载状态">
    <van-picker loading :columns="column4" />
  </demo-block>

  <van-toast id="van-toast" />
</template>
<script setup lang="ts">
import { ref } from "vue";
import Toast from "../../toast/toast";

const column1 = ref(["杭州", "宁波", "温州", "嘉兴", "湖州"]);
const column2 = ref([
  { text: "杭州", disabled: true },
  { text: "宁波" },
  { text: "温州" },
]);
const column3 = ref({
  浙江: ["杭州", "宁波", "温州", "嘉兴", "湖州"],
  福建: ["福州", "厦门", "莆田", "三明", "泉州"],
});
const column4 = ref([
  {
    values: ["浙江", "福建"],
    className: "column1",
  },
  {
    values: ["杭州", "宁波", "温州", "嘉兴", "湖州"],
    className: "column2",
    defaultIndex: 2,
  },
]);

function onChange1({ detail }: any) {
  const { value, index } = detail;
  Toast({ message: `Value: ${value}, Index：${index}` });
}

function onConfirm({ detail }: any) {
  const { value, index } = detail;
  Toast({ message: `Value: ${value}, Index：${index}` });
}

function onCancel() {
  Toast({ message: "取消" });
}

function onChange2({ detail }: any) {
  const { picker, value } = detail;
  // 这里需要访问 picker 实例，vue3 需用 ref 获取组件实例
  // 这里只做演示，实际用法需根据 picker 组件实现调整
  // picker.setColumnValues(1, column3.value[value[0]]);
  Toast({ message: `联动: ${value}` });
}
</script>
<style></style>
