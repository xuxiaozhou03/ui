<template>
  <demo-block title="基础用法">
  <van-collapse value="{{ active1 }}" data-key="active1" bind:change="onChange">
    <van-collapse-item title="{{ title1 }}">{{ content1 }}</van-collapse-item>
    <van-collapse-item title="{{ title2 }}">{{ content2 }}</van-collapse-item>
    <van-collapse-item title="{{ title3 }}" disabled>{{ content3 }}</van-collapse-item>
  </van-collapse>
</demo-block>

<demo-block title="手风琴">
  <van-collapse value="{{ active2 }}" data-key="active2" accordion bind:change="onChange">
    <van-collapse-item title="{{ title1 }}">{{ content1 }}</van-collapse-item>
    <van-collapse-item title="{{ title2 }}">{{ content2 }}</van-collapse-item>
    <van-collapse-item title="{{ title3 }}">{{ content3 }}</van-collapse-item>
  </van-collapse>
</demo-block>

<demo-block title="事件监听">
  <van-collapse value="{{ active3 }}" data-key="active3" bind:change="onChange" bind:open="onOpen" bind:close="onClose">
    <van-collapse-item title="{{ title1 }}">{{ content1 }}</van-collapse-item>
    <van-collapse-item title="{{ title2 }}">{{ content2 }}</van-collapse-item>
    <van-collapse-item title="{{ title3 }}">{{ content3 }}</van-collapse-item>
  </van-collapse>
</demo-block>

<demo-block title="自定义标题内容">
  <van-collapse value="{{ active4 }}" data-key="active4" bind:change="onChange">
    <van-collapse-item>
      <view slot="title">
        {{ title1 }}
        <van-icon name="question-o" custom-class="van-icon-question" />
      </view>
      {{ content1 }}
    </van-collapse-item>
    <van-collapse-item
      title="{{ title2 }}"
      value="内容"
      icon="shop-o"
    >
      {{ content2 }}
    </van-collapse-item>
  </van-collapse>
</demo-block>

<van-toast id="van-toast" />

</template>
<script lang="ts" setup>
import { VantComponent } from '../../common/component';
import Toast from '../../toast/toast';

VantComponent({
  data: {
    active1: [0],
    active2: 0,
    active3: [],
    active4: [],
    title1: '标题1',
    title2: '标题2',
    title3: '标题3',
    content1: '代码是写出来给人看的，附带能在机器上运行',
    content2: '代码是写出来给人看的，附带能在机器上运行',
    content3: '代码是写出来给人看的，附带能在机器上运行',
  },

  methods: {
    onChange(event) {
      const { key } = event.currentTarget.dataset;
      this.setData({
        [key]: event.detail,
      });
    },

    onOpen(event) {
      Toast({
        context: this,
        message: `展开: ${event.detail}`,
      });
    },

    onClose(event) {
      Toast({
        context: this,
        message: `关闭: ${event.detail}`,
      });
    },
  },
});

</script>
<style>.van-icon-question {
  margin-left: 5px;
  font-size: 15px !important;
  color: #1989fa;
  vertical-align: -3px;
}
</style>
