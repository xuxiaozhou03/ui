<template>
  <demo-block title="基础用法" padding>
  <van-button type="primary" bind:click="toggleActionSheet1">弹出菜单</van-button>
  <van-action-sheet
    show="{{ show1 }}"
    actions="{{ action1 }}"
    bind:close="toggleActionSheet1"
  />
</demo-block>

<demo-block title="选项状态" padding>
  <van-button type="primary" bind:click="toggleActionSheet2">弹出菜单</van-button>
  <van-action-sheet
    show="{{ show2 }}"
    actions="{{ action2 }}"
    bind:close="toggleActionSheet2"
  />
</demo-block>

<demo-block title="展示取消按钮" padding>
  <van-button type="primary" bind:click="toggleActionSheet3">弹出菜单</van-button>
  <van-action-sheet
    show="{{ show3 }}"
    actions="{{ action1 }}"
    cancel-text="取消"
    bind:close="toggleActionSheet3"
  >
  </van-action-sheet>
</demo-block>

<demo-block title="展示描述信息" padding>
  <van-button type="primary" bind:click="toggleActionSheet4">弹出菜单</van-button>
  <van-action-sheet
    show="{{ show4 }}"
    actions="{{ action1 }}"
    description="这是一段描述信息"
    bind:close="toggleActionSheet4"
  >
  </van-action-sheet>
</demo-block>

<demo-block title="展示标题栏" padding>
  <van-button type="primary" bind:click="toggleActionSheet5">弹出菜单</van-button>
  <van-action-sheet
    show="{{ show5 }}"
    title="标题"
    bind:close="toggleActionSheet5"
  >
    <view class="content">内容</view>
  </van-action-sheet>
</demo-block>

<demo-block title="微信开放能力" padding>
  <van-button type="primary" bind:click="toggleActionSheet6">弹出菜单</van-button>
  <van-action-sheet
    show="{{ show6 }}"
    title="标题"
    bind:close="toggleActionSheet6"
    actions="{{ action6 }}"
    bind:getuserinfo="onGetUserInfo"
  >
  </van-action-sheet>
</demo-block>

</template>
<script lang="ts" setup>
  import { VantComponent } from '../../common/component';

VantComponent({
  data: {
    show1: false,
    show2: false,
    show3: false,
    show4: false,
    show5: false,
    show6: false,
    action1: [
      { name: '选项' },
      { name: '选项' },
      { name: '选项', subname: '描述信息' },
    ],
    action2: [
      { name: '着色选项', color: '#ee0a24' },
      { loading: true },
      { name: '禁用选项', disabled: true },
    ],
    action6: [
      { name: '获取用户信息', color: '#07c160', openType: 'getUserInfo' },
    ],
  },

  methods: {
    toggle(type) {
      this.setData({
        [type]: !this.data[type],
      });
    },

    toggleActionSheet1() {
      this.toggle('show1');
    },

    toggleActionSheet2() {
      this.toggle('show2');
    },

    toggleActionSheet3() {
      this.toggle('show3');
    },

    toggleActionSheet4() {
      this.toggle('show4');
    },

    toggleActionSheet5() {
      this.toggle('show5');
    },

    toggleActionSheet6() {
      this.toggle('show6');
    },

    onGetUserInfo(e) {
      console.log(e.detail);
    },
  },
});

  // 转换为 Vue 3 的 computed 属性
  
</script>
<style lang="scss" scoped>
  .content {
  padding: 20px;
}

</style>
