<template>
  <demo-block title="基础用法">
  <van-sticky>
    <van-button type="primary" custom-style="margin-left: 15px">
      基础用法
    </van-button>
  </van-sticky>
</demo-block>

<demo-block title="吸顶距离">
  <van-sticky offset-top="{{ 50 }}">
    <van-button type="info" custom-style="margin-left: 115px">
      吸顶距离
    </van-button>
  </van-sticky>
</demo-block>

<demo-block title="指定容器">
  <view id="container" style="height: 150px; background-color: #fff;">
    <van-sticky container="{{ container }}">
      <van-button type="warning" custom-style="margin-left: 215px;">
        指定容器
      </van-button>
    </van-sticky>
  </view>
</demo-block>

<demo-block title="嵌套在 scroll-view 内使用">
  <scroll-view
    bind:scroll="onScroll"
    scroll-y
    id="scroller"
    style="height: 200px; background-color: #fff;"
  >
    <view style="height: 400px; padding-top: 50px;">
      <van-sticky scroll-top="{{ scrollTop }}" offset-top="{{ offsetTop }}">
        <van-button type="warning">
          嵌套在 scroll-view 内
        </van-button>
      </van-sticky>
    </view>
  </scroll-view>
</demo-block>

</template>
<script lang="ts" setup>
  import { VantComponent } from '../../common/component';

VantComponent({
  data: {
    container: () => {},
    scrollTop: 0,
    offsetTop: 0,
  },

  mounted() {
    this.setData({
      container: () => this.createSelectorQuery().select('#container'),
    });
  },

  methods: {
    onScroll(event) {
      this.createSelectorQuery()
        .select('#scroller')
        .boundingClientRect((res) => {
          this.setData({
            scrollTop: event.detail.scrollTop,
            offsetTop: res.top,
          });
        })
        .exec();
    },
  },
});

  // 转换为 Vue 3 的 computed 属性
  
</script>
<style>
  .van-button {
  margin-left: 16px;
}

.sticky-container {
  position: relative;
  z-index: -1;
  height: 150px;
  background-color: #fff;
}

</style>
