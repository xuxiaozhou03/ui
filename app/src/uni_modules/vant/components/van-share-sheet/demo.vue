<template>
  <demo-block card title="基础用法">
  <van-cell is-link title="显示分享面板" data-type="basic" bind:click="onShowShareSheet" />
  <van-share-sheet
    show="{{ show.basic }}"
    title="立即分享给好友"
    options="{{ options }}"
    bind:close="onClose"
    bind:select="onSelect"
  />
</demo-block>

<demo-block card title="展示多行选项">
  <van-cell is-link title="显示分享面板" data-type="multiLine" bind:click="onShowShareSheet" />
  <van-share-sheet
    show="{{ show.multiLine }}"
    title="立即分享给好友"
    options="{{ multiLineOptions }}"
    bind:close="onClose"
    bind:select="onSelect"
  />
</demo-block>

<demo-block card title="自定义图标">
  <van-cell is-link title="显示分享面板" data-type="customIcon" bind:click="onShowShareSheet" />
  <van-share-sheet
    show="{{ show.customIcon }}"
    options="{{ customIconOptions }}"
    bind:close="onClose"
    bind:select="onSelect"
  />
</demo-block>

<demo-block card title="展示描述信息">
  <van-cell is-link title="显示分享面板" data-type="withDesc" bind:click="onShowShareSheet" />
  <van-share-sheet
    show="{{ show.withDesc }}"
    title="立即分享给好友"
    options="{{ optionsWithDesc }}"
    description="描述信息"
    bind:close="onClose"
    bind:select="onSelect"
  />
</demo-block>

<van-toast id="van-toast" />

</template>
<script lang="ts" setup>
import { VantComponent } from '../../common/component';
import Toast from '../../toast/toast';

VantComponent({
  data: {
    show: {
      basic: false,
      withDesc: false,
      multiLine: false,
      customIcon: false,
    },
    options: [
      { name: '微信', icon: 'wechat', openType: 'share' },
      { name: '朋友圈', icon: 'wechat-moments' },
      { name: 'QQ', icon: 'qq' },
      { name: '微博', icon: 'weibo' },
      { name: '复制链接', icon: 'link' },
      { name: '分享海报', icon: 'poster' },
      { name: '二维码', icon: 'qrcode' },
      { name: '小程序码', icon: 'weapp-qrcode' },
    ],

    multiLineOptions: [
      [
        { name: '微信', icon: 'wechat' },
        { name: '微博', icon: 'weibo' },
        { name: 'QQ', icon: 'qq' },
      ],
      [
        { name: '复制链接', icon: 'link' },
        { name: '分享海报', icon: 'poster' },
        { name: '二维码', icon: 'qrcode' },
      ],
    ],

    customIconOptions: [
      {
        name: '名称',
        icon: 'https://img.yzcdn.cn/vant/custom-icon-fire.png',
      },
      {
        name: '名称',
        icon: 'https://img.yzcdn.cn/vant/custom-icon-light.png',
      },
      {
        name: '名称',
        icon: 'https://img.yzcdn.cn/vant/custom-icon-water.png',
      },
    ],

    optionsWithDesc: [
      { name: '微信', icon: 'wechat' },
      { name: '微博', icon: 'weibo' },
      {
        name: '复制链接',
        icon: 'link',
        description: '描述信息',
      },
      { name: '分享海报', icon: 'poster' },
      { name: '二维码', icon: 'qrcode' },
    ],
  },

  methods: {
    onShowShareSheet(event) {
      this.setData({
        [`show.${event.target.dataset.type}`]: true,
      });
    },

    onClose() {
      this.setData({
        show: {
          basic: false,
          withDesc: false,
          multiLine: false,
          customIcon: false,
        },
      });
    },

    onSelect(event) {
      Toast({ context: this, message: event.detail.name });
      this.onClose();
    },
  },
});

</script>
<style>.container {
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
