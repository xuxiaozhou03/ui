<template>
  <demo-block title="基础用法">
  <van-count-down time="{{ time }}" />
</demo-block>

<demo-block title="自定义格式">
  <van-count-down
    time="{{ time }}"
    format="DD 天 HH 时 mm 分 ss 秒"
  />
</demo-block>

<demo-block title="毫秒级渲染">
  <van-count-down
    millisecond
    time="{{ time }}"
    format="HH:mm:ss:SSS"
  />
</demo-block>

<demo-block title="自定义样式">
  <van-count-down
    use-slot
    time="{{ time }}"
    bind:change="onChange"
  >
    <text class="item">{{ timeData.hours }}</text>
    <text class="item">{{ timeData.minutes }}</text>
    <text class="item">{{ timeData.seconds }}</text>
  </van-count-down>
</demo-block>

<demo-block title="手动控制">
  <van-count-down
    class="control-count-down"
    millisecond
    time="{{ 3000 }}"
    auto-start="{{ false }}"
    format="ss:SSS"
    bind:finish="finished"
  />
  <van-grid clickable column-num="3">
    <van-grid-item text="开始" icon="play-circle-o" bindclick="start" />
    <van-grid-item text="暂停" icon="pause-circle-o" bindclick="pause" />
    <van-grid-item text="重置" icon="replay" bind:click="reset" />
  </van-grid>
</demo-block>

<van-toast id="van-toast" />

</template>
<script lang="ts" setup>
  import { VantComponent } from '../../common/component';
import Toast from '../../toast/toast';

VantComponent({
  data: {
    time: 30 * 60 * 60 * 1000,
    timeData: {},
  },

  methods: {
    onChange(e) {
      this.setData({
        timeData: e.detail,
      });
    },

    start() {
      const countDown = this.selectComponent('.control-count-down');
      countDown.start();
    },

    pause() {
      const countDown = this.selectComponent('.control-count-down');
      countDown.pause();
    },

    reset() {
      const countDown = this.selectComponent('.control-count-down');
      countDown.reset();
    },

    finished() {
      Toast({
        context: this,
        message: '倒计时结束',
      });
    },
  },
});

  // 转换为 Vue 3 的 computed 属性
  
</script>
<style lang="scss" scoped>
  .van-count-down {
  margin: 0 16px 10px;
}

.item {
  display: inline-block;
  width: 22px;
  margin-right: 5px;
  color: #fff;
  font-size: 12px;
  text-align: center;
  background-color: #1989fa;
  border-radius: 2px;
}

</style>
