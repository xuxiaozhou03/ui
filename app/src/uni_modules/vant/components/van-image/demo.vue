<template>
  <demo-block title="基础用法" padding>
  <van-row>
    <van-image
      width="100"
      height="100"
      src="{{ src }}"
    />
  </van-row>
</demo-block>

<demo-block title="填充模式" padding>
  <van-row gutter="20">
    <van-col
      wx:for="{{ fits }}"
      wx:for-item="fit"
      wx:key="fit"
      span="8"
    >
      <van-image
        fit="{{ fit }}"
        width="100%"
        height="27vw"
        src="{{ src }}"
      />
      <view class="text">{{ fit }}</view>
    </van-col>
  </van-row>
</demo-block>

<demo-block title="圆形图片" padding>
  <van-row gutter="20">
    <van-col
      wx:for="{{ fits }}"
      wx:for-item="fit"
      wx:key="fit"
      span="8"
    >
      <van-image
        round
        fit="{{ fit }}"
        width="100%"
        height="27vw"
        src="{{ src }}"
      />
      <view class="text">{{ fit }}</view>
    </van-col>
  </van-row>
</demo-block>

<demo-block title="加载中提示" padding>
  <van-row gutter="20">
    <van-col span="8">
      <van-image
        width="100%"
        height="27vw"
      />
      <view class="text">默认提示</view>
    </van-col>

    <van-col span="8">
      <van-image
        width="100%"
        height="27vw"
        use-loading-slot
      >
        <van-loading
          slot="loading"
          type="spinner"
          size="20"
          vertical
        />
      </van-image>
      <view class="text">自定义提示</view>
    </van-col>
  </van-row>
</demo-block>

<demo-block title="加载失败提示" padding>
  <van-row gutter="20">
    <van-col span="8">
      <van-image
        width="100%"
        height="27vw"
        src="x"
      />
      <view class="text">默认提示</view>
    </van-col>

    <van-col span="8">
      <van-image
        width="100%"
        height="27vw"
        src="x"
        use-error-slot
      >
        <text slot="error">加载失败</text>
      </van-image>
      <view class="text">自定义提示</view>
    </van-col>
  </van-row>
</demo-block>

</template>
<script lang="ts" setup>
  import { VantComponent } from '../../common/component';

VantComponent({
  data: {
    fits: [
      'contain',
      'cover',
      'fill',
      'none',
      'scale-down',
      'widthFix',
      'heightFix',
    ],
    src: 'https://img.yzcdn.cn/vant/cat.jpeg',
  },
});

  // 转换为 Vue 3 的 computed 属性
  
</script>
<style lang="scss" scoped>
  .text {
  width: 100%;
  margin: 5px 0 20px;
  color: #7d7e80;
  font-size: 14px;
  text-align: center;
}

</style>
