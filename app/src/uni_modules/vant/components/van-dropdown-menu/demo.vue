<template>
  <demo-block custom-class="white" title="基础用法">
  <van-dropdown-menu>
    <van-dropdown-item value="{{ value1 }}" options="{{ option1 }}" />
    <van-dropdown-item value="{{ value2 }}" options="{{ option2 }}" />
  </van-dropdown-menu>
</demo-block>

<demo-block custom-class="white" title="自定义菜单内容">
  <van-dropdown-menu>
    <van-dropdown-item value="{{ value1 }}" options="{{ option1 }}" />
    <van-dropdown-item id="item" title="{{ itemTitle }}">
      <van-cell title="{{ switchTitle1 }}">
        <van-switch
          slot="right-icon"
          size="24px"
          style="height: 26px"
          checked="{{ switch1 }}"
          active-color="#ee0a24"
          bind:change="onSwitch1Change"
        />
      </van-cell>
      <van-cell title="{{ switchTitle2 }}">
        <van-switch
          slot="right-icon"
          size="24px"
          style="height: 26px"
          checked="{{ switch2 }}"
          active-color="#ee0a24"
          bind:change="onSwitch2Change"
        />
      </van-cell>
      <view style="padding: 5px 16px;">
        <van-button type="danger" block round bind:click="onConfirm">
          确认
        </van-button>
      </view>
    </van-dropdown-item>
  </van-dropdown-menu>
</demo-block>

<demo-block custom-class="white" title="自定义选中状态颜色">
  <van-dropdown-menu active-color="#1989fa">
    <van-dropdown-item value="{{ value1 }}" options="{{ option1 }}" />
    <van-dropdown-item value="{{ value2 }}" options="{{ option2 }}" />
  </van-dropdown-menu>
</demo-block>

<demo-block custom-class="white" title="向上展开">
  <van-dropdown-menu direction="up">
    <van-dropdown-item value="{{ value1 }}" options="{{ option1 }}" />
    <van-dropdown-item value="{{ value2 }}" options="{{ option2 }}" />
  </van-dropdown-menu>
</demo-block>

<demo-block custom-class="white" title="禁用菜单">
  <van-dropdown-menu>
    <van-dropdown-item value="{{ value1 }}" disabled options="{{ option1 }}" />
    <van-dropdown-item value="{{ value2 }}" disabled options="{{ option2 }}" />
  </van-dropdown-menu>
</demo-block>

<demo-block custom-class="white" title="异步打开/关闭">
  <van-dropdown-menu>
    <van-dropdown-item value="{{ value1 }}" options="{{ option1 }}" use-before-toggle bind:before-toggle="onBeforeChange" />
  </van-dropdown-menu>
</demo-block>


</template>
<script lang="ts" setup>
import { VantComponent } from '../../common/component';

VantComponent({
  data: {
    switchTitle1: '包邮',
    switchTitle2: '团购',
    itemTitle: '筛选',
    option1: [
      { text: '全部商品', value: 0 },
      { text: '新款商品', value: 1 },
      { text: '活动商品', value: 2 },
    ],
    option2: [
      { text: '默认排序', value: 'a' },
      { text: '好评排序', value: 'b' },
      { text: '销量排序', value: 'c' },
    ],
    switch1: true,
    switch2: false,
    value1: 0,
    value2: 'a',
  },

  methods: {
    onConfirm() {
      this.selectComponent('#item').toggle();
    },

    onSwitch1Change({ detail }) {
      this.setData({ switch1: detail });
    },

    onSwitch2Change({ detail }) {
      this.setData({ switch2: detail });
    },
    onBeforeChange({ detail: { status, callback } }) {
      wx.showModal({
        title: '异步打开/关闭',
        content: `确定要${status ? '打开' : '关闭'}下拉菜单吗？`,
        success: (res) => {
          if (res.confirm) {
            callback(true);
          } else if (res.cancel) {
            callback(false);
          }
        },
      });
    },
  },
});

</script>

