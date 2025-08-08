
  <template>
   <wxs src="../wxs/utils.wxs" module="utils" />

<view
  wx:if="{{ loading }}"
  class="custom-class {{ utils.bem('skeleton', [{animate}]) }}"
>
  <view
    wx:if="{{ avatar }}"
    class="avatar-class {{ utils.bem('skeleton__avatar', [avatarShape])}}"
    style="{{ 'width:' + avatarSize + ';height:' + avatarSize }}"
  />
  <view class="{{ utils.bem('skeleton__content')}}">
    <view
      wx:if="{{ title }}"
      class="title-class {{ utils.bem('skeleton__title') }}"
      style="{{ 'width:' + titleWidth }}"
    />
    <view
      wx:for="{{ rowArray }}"
      wx:key="index"
      wx:for-index="index"
      class="row-class {{ utils.bem('skeleton__row') }}"
      style="{{ 'width:' + (isArray ? rowWidth[index] : rowWidth) }}"
    />
  </view>
</view>
<view wx:else class="{{ utils.bem('skeleton__content')}}">
  <slot />
</view>

  </template>
  <script lang="ts" setup>
  import { VantComponent } from '../common/component';

VantComponent({
  classes: ['avatar-class', 'title-class', 'row-class'],
  props: {
    row: {
      type: Number,
      value: 0,
      observer(value: number) {
        this.setData({ rowArray: Array.from({ length: value }) });
      },
    },
    title: Boolean,
    avatar: Boolean,
    loading: {
      type: Boolean,
      value: true,
    },
    animate: {
      type: Boolean,
      value: true,
    },
    avatarSize: {
      type: String,
      value: '32px',
    },
    avatarShape: {
      type: String,
      value: 'round',
    },
    titleWidth: {
      type: String,
      value: '40%',
    },
    rowWidth: {
      type: null,
      value: '100%',
      observer(val) {
        this.setData({ isArray: val instanceof Array });
      },
    },
  },

  data: {
    isArray: false,
    rowArray: [],
  },
});

  
  </script>
  
<style>
@import "./style.css";
</style>

  