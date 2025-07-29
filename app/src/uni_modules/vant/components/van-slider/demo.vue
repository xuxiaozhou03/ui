<template>
  <demo-block title="基础用法">
  <van-slider
    value="50"
    custom-class="slider"
    bind:change="onChange"
  />
</demo-block>

<demo-block title="双滑块">
  <van-slider
    range
    value="{{ [20, 60 ] }}"
    custom-class="slider"
    bind:change="onChange"
  />
</demo-block>

<demo-block title="指定选择范围">
  <van-slider
    custom-class="slider"
    min="-50"
    max="50"
    bind:change="onChange"
  />
</demo-block>

<demo-block title="禁用">
  <van-slider
    custom-class="slider"
    value="50"
    disabled
  />
</demo-block>

<demo-block title="指定步长">
  <van-slider
    custom-class="slider"
    value="50"
    step="10"
    bind:change="onChange"
  />
</demo-block>

<demo-block title="自定义样式">
  <van-slider
    value="50"
    custom-class="slider"
    bar-height="4px"
    active-color="#ee0a24"
  />
</demo-block>

<demo-block title="自定义按钮">
  <van-slider
    value="{{ currentValue }}"
    custom-class="slider"
    use-button-slot
    active-color="#ee0a24"
    bind:drag="onDrag"
  >
    <view class="custom-button" slot="button">
      {{ currentValue }}
    </view>
  </van-slider>
</demo-block>

<demo-block title="垂直方向">
  <view style="height: 150px; padding-left: 30px;">
    <van-slider
      value="{{ 50 }}"
      vertical
      custom-class="slider"
      bind:change="onChange"
    />
    <van-slider
      value="{{ [20, 60 ] }}"
      vertical
      range
      custom-class="slider"
      bind:change="onChange"
    />
  </view>
</demo-block>

</template>
<script lang="ts" setup>
  import { VantComponent } from '../../common/component';

VantComponent({
  data: {
    currentValue: 50,
  },

  methods: {
    onChange(event) {
      wx.showToast({
        icon: 'none',
        title: `当前值：${event.detail}`,
      });
    },

    onDrag(event) {
      this.setData({
        currentValue: event.detail.value,
      });
    },
  },
});

  // 转换为 Vue 3 的 computed 属性
  
</script>
<style lang="scss" scoped>
  .slider {
  margin: 0 15px 30px;
}

.custom-button {
  width: 26px;
  color: #fff;
  font-size: 10px;
  line-height: 18px;
  text-align: center;
  border-radius: 100px;
  background-color: #ee0a24;
}

</style>
