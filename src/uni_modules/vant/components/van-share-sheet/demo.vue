<template>
  <demo-block card title="基础用法">
    <van-cell is-link title="显示分享面板" @click="onShowShareSheet('basic')" />
    <van-share-sheet
      v-model:show="show.basic"
      title="立即分享给好友"
      :options="options"
      @close="onClose"
      @select="onSelect"
    />
  </demo-block>

  <demo-block card title="展示多行选项">
    <van-cell
      is-link
      title="显示分享面板"
      @click="onShowShareSheet('multiLine')"
    />
    <van-share-sheet
      v-model:show="show.multiLine"
      title="立即分享给好友"
      :options="multiLineOptions"
      @close="onClose"
      @select="onSelect"
    />
  </demo-block>

  <demo-block card title="自定义图标">
    <van-cell
      is-link
      title="显示分享面板"
      @click="onShowShareSheet('customIcon')"
    />
    <van-share-sheet
      v-model:show="show.customIcon"
      :options="customIconOptions"
      @close="onClose"
      @select="onSelect"
    />
  </demo-block>

  <demo-block card title="展示描述信息">
    <van-cell
      is-link
      title="显示分享面板"
      @click="onShowShareSheet('withDesc')"
    />
    <van-share-sheet
      v-model:show="show.withDesc"
      title="立即分享给好友"
      :options="optionsWithDesc"
      description="描述信息"
      @close="onClose"
      @select="onSelect"
    />
  </demo-block>

  <van-toast id="van-toast" />
</template>

<script setup lang="ts">
import { reactive } from "vue";
// import Toast from '../../toast/toast'; // 如有 Toast 组件可用

const show = reactive({
  basic: false,
  withDesc: false,
  multiLine: false,
  customIcon: false,
});

const options = [
  { name: "微信", icon: "wechat", openType: "share" },
  { name: "朋友圈", icon: "wechat-moments" },
  { name: "QQ", icon: "qq" },
  { name: "微博", icon: "weibo" },
  { name: "复制链接", icon: "link" },
  { name: "分享海报", icon: "poster" },
  { name: "二维码", icon: "qrcode" },
  { name: "小程序码", icon: "weapp-qrcode" },
];

const multiLineOptions = [
  [
    { name: "微信", icon: "wechat" },
    { name: "微博", icon: "weibo" },
    { name: "QQ", icon: "qq" },
  ],
  [
    { name: "复制链接", icon: "link" },
    { name: "分享海报", icon: "poster" },
    { name: "二维码", icon: "qrcode" },
  ],
];

const customIconOptions = [
  { name: "名称", icon: "https://img.yzcdn.cn/vant/custom-icon-fire.png" },
  { name: "名称", icon: "https://img.yzcdn.cn/vant/custom-icon-light.png" },
  { name: "名称", icon: "https://img.yzcdn.cn/vant/custom-icon-water.png" },
];

const optionsWithDesc = [
  { name: "微信", icon: "wechat" },
  { name: "微博", icon: "weibo" },
  { name: "复制链接", icon: "link", description: "描述信息" },
  { name: "分享海报", icon: "poster" },
  { name: "二维码", icon: "qrcode" },
];

function onShowShareSheet(type: keyof typeof show) {
  show[type] = true;
}

function onClose() {
  Object.keys(show).forEach((k) => (show[k] = false));
}

function onSelect(option: any) {
  // Toast({ message: option.name });
  window.alert(option.name);
  onClose();
}
</script>

<style>
.container {
  height: 100vh;
  background-color: #fff;
}
.tag,
.button {
  margin-right: 5px;
}
.van-card__footer {
  margin-top: 5px;
}
</style>
