<template>
  <demo-block title="基础用法">
    <van-field
      :value="baseState.result"
      is-link
      readonly
      label="地区"
      :placeholder="selectArea"
      @click="() => onClick('baseState')"
    />
    <van-popup v-model:show="baseState.show" round position="bottom">
      <van-cascader
        v-if="baseState.show"
        v-model="baseState.value"
        :title="selectArea"
        :options="options"
        @close="() => onClose('baseState')"
        @finish="(e) => onFinish('baseState', e)"
      />
    </van-popup>
  </demo-block>

  <demo-block title="自定义颜色">
    <van-field
      :value="customColorState.result"
      is-link
      readonly
      label="地区"
      :placeholder="selectArea"
      @click="() => onClick('customColorState')"
    />
    <van-popup v-model:show="customColorState.show" round position="bottom">
      <van-cascader
        v-if="customColorState.show"
        v-model="customColorState.value"
        :title="selectArea"
        :options="options"
        active-color="#ee0a24"
        @close="() => onClose('customColorState')"
        @finish="(e) => onFinish('customColorState', e)"
      />
    </van-popup>
  </demo-block>

  <demo-block title="异步加载选项">
    <van-field
      :value="asyncState.result"
      is-link
      readonly
      label="地区"
      :placeholder="selectArea"
      @click="() => onClick('asyncState')"
    />
    <van-popup v-model:show="asyncState.show" round position="bottom">
      <van-cascader
        v-if="asyncState.show"
        v-model="asyncState.value"
        :title="selectArea"
        :options="asyncState.options"
        @close="() => onClose('asyncState')"
        @change="loadDynamicOptions"
        @finish="(e) => onFinish('asyncState', e)"
      />
    </van-popup>
  </demo-block>

  <demo-block title="自定义字段名">
    <van-field
      :value="customFieldState.result"
      is-link
      readonly
      label="地区"
      :placeholder="selectArea"
      @click="() => onClick('customFieldState')"
    />
    <van-popup
      v-model:show="customFieldState.show"
      round
      position="bottom"
      safe-area-inset-bottom
    >
      <van-cascader
        v-if="customFieldState.show"
        v-model="customFieldState.value"
        :title="selectArea"
        :options="customFieldOptions"
        :field-names="fieldNames"
        @close="() => onClose('customFieldState')"
        @finish="(e) => onFinish('customFieldState', e)"
      />
    </van-popup>
  </demo-block>
</template>
<script lang="ts" setup>
import { ref, reactive } from "vue";

function deepClone<T extends Record<string, any>>(obj: T): T {
  if (obj == null) return obj;
  if (Array.isArray(obj))
    return obj.map((item) => deepClone(item)) as unknown as T;
  if (typeof obj === "object") {
    const to: Record<string, any> = {};
    Object.keys(obj).forEach((key) => {
      to[key] = deepClone(obj[key]);
    });
    return to as T;
  }
  return obj;
}

const zhCNOptions = [
  {
    text: "浙江省",
    value: "330000",
    children: [
      {
        text: "杭州市",
        value: "330100",
        children: [
          { text: "上城区", value: "330102" },
          { text: "下城区", value: "330103" },
          { text: "江干区", value: "330104" },
        ],
      },
      {
        text: "宁波市",
        value: "330200",
        children: [
          { text: "海曙区", value: "330203" },
          { text: "江北区", value: "330205" },
          { text: "北仑区", value: "330206" },
        ],
      },
      {
        text: "温州市",
        value: "330300",
        children: [
          { text: "鹿城区", value: "330302" },
          { text: "龙湾区", value: "330303" },
          { text: "瓯海区", value: "330304" },
        ],
      },
    ],
  },
  {
    text: "江苏省",
    value: "320000",
    children: [
      {
        text: "南京市",
        value: "320100",
        children: [
          { text: "玄武区", value: "320102" },
          { text: "秦淮区", value: "320104" },
          { text: "建邺区", value: "320105" },
        ],
      },
      {
        text: "无锡市",
        value: "320200",
        children: [
          { text: "锡山区", value: "320205" },
          { text: "惠山区", value: "320206" },
          { text: "滨湖区", value: "320211" },
        ],
      },
      {
        text: "徐州市",
        value: "320300",
        children: [
          { text: "鼓楼区", value: "320302" },
          { text: "云龙区", value: "320303" },
          { text: "贾汪区", value: "320305" },
        ],
      },
    ],
  },
];

const asyncOptions1 = [{ text: "浙江省", value: "330000", children: [] }];
const asyncOptions2 = [
  { text: "杭州市", value: "330100" },
  { text: "宁波市", value: "330200" },
];

function getCustomFieldOptions(options: any[]) {
  const newOptions = deepClone(options);
  const adjustFieldName = (item: any) => {
    if ("text" in item) {
      item.name = item.text;
      delete item.text;
    }
    if ("value" in item) {
      item.code = item.value;
      delete item.value;
    }
    if ("children" in item) {
      item.items = item.children;
      delete item.children;
      item.items.forEach(adjustFieldName);
    }
  };
  newOptions.forEach(adjustFieldName);
  return newOptions;
}

const selectArea = ref("请选择地区");
const options = ref(zhCNOptions);
const baseState = reactive({ show: false, value: "", result: "" });
const customColorState = reactive({ show: false, value: "", result: "" });
const asyncState = reactive({
  show: false,
  value: "",
  result: "",
  options: asyncOptions1,
});
const fieldNames = ref({ text: "name", value: "code", children: "items" });
const customFieldOptions = ref(getCustomFieldOptions(zhCNOptions));
const customFieldState = reactive({ show: false, value: "", result: "" });

function onClick(stateKey: string) {
  if (stateKey === "baseState") baseState.show = true;
  else if (stateKey === "customColorState") customColorState.show = true;
  else if (stateKey === "asyncState") asyncState.show = true;
  else if (stateKey === "customFieldState") customFieldState.show = true;
}
function onClose(stateKey: string) {
  if (stateKey === "baseState") baseState.show = false;
  else if (stateKey === "customColorState") customColorState.show = false;
  else if (stateKey === "asyncState") asyncState.show = false;
  else if (stateKey === "customFieldState") customFieldState.show = false;
}
function onFinish(stateKey: string, e: any) {
  const { selectedOptions, value } = e;
  const result = selectedOptions
    .map((option: any) => option.text || option.name)
    .join("/");
  if (stateKey === "baseState") {
    baseState.value = value;
    baseState.result = result;
    baseState.show = false;
  } else if (stateKey === "customColorState") {
    customColorState.value = value;
    customColorState.result = result;
    customColorState.show = false;
  } else if (stateKey === "asyncState") {
    asyncState.value = value;
    asyncState.result = result;
    asyncState.show = false;
  } else if (stateKey === "customFieldState") {
    customFieldState.value = value;
    customFieldState.result = result;
    customFieldState.show = false;
  }
}
function loadDynamicOptions(e: any) {
  const { value } = e;
  if (value === "330000") {
    setTimeout(() => {
      asyncState.options[0].children = asyncOptions2;
    }, 500);
  }
}
</script>
<style></style>
