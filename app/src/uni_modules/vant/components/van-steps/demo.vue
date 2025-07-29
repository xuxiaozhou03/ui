<template>
  <demo-block title="基础用法">
  <van-steps
    steps="{{ steps }}"
    active="{{ active }}"
    bind:click-step="onClick"
    custom-class="demo-margin-bottom"
  />

  <van-button custom-class="demo-margin-left" bind:click="nextStep">下一步</van-button>
</demo-block>

<demo-block title="自定义样式">
  <van-steps
    steps="{{ steps }}"
    active="{{ active }}"
    active-icon="success"
    active-color="#38f"
    inactive-icon="arrow"
  />
</demo-block>

<demo-block title="自定义图标">
  <van-steps
    steps="{{ customIconSteps }}"
    active="{{ active }}"
  />
</demo-block>

<demo-block title="竖向步骤条">
  <van-steps
    steps="{{ steps }}"
    active="{{ active }}"
    direction="vertical"
    active-color="#ee0a24"
  />
</demo-block>

<van-toast id="van-toast" />

</template>
<script lang="ts" setup>
  import { VantComponent } from '../../common/component';
import Toast from '../../toast/toast';
import icons from '@vant/icons/src/config';

const steps = [
  {
    text: '步骤一',
    desc: '描述信息',
  },
  {
    text: '步骤二',
    desc: '描述信息',
  },
  {
    text: '步骤三',
    desc: '描述信息',
  },
  {
    text: '步骤四',
    desc: '描述信息',
  },
];

VantComponent({
  data: {
    active: 1,
    steps,
    customIconSteps: steps.map((item, index) => ({
      ...item,
      inactiveIcon: icons.outline[index],
      activeIcon: icons.basic[index],
    })),
  },

  methods: {
    nextStep() {
      this.setData({
        active: ++this.data.active % 4,
      });
    },

    onClick(event) {
      Toast({
        context: this,
        message: `Index: ${event.detail}`,
      });
    },
  },
});

  // 转换为 Vue 3 的 computed 属性
  
</script>
<style>
  .demo-margin-left {
  margin-left: 10px;
}

.demo-margin-bottom {
  display: block;
  margin-bottom: 15px;
}

</style>
