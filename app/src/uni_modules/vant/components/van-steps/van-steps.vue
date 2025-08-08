
  <template>
   <wxs src="../wxs/utils.wxs" module="utils" />

<view class="custom-class {{ utils.bem('steps', [direction]) }}">
  <view class="van-step__wrapper">
    <view
      wx:for="{{ steps }}"
      wx:key="index"
      bindtap="onClick"
      data-index="{{ index }}"
      class="{{ utils.bem('step', [direction, status(index, active)]) }} van-hairline"
      style="{{ status(index, active) === 'inactive' ? 'color: ' + inactiveColor: '' }}"
    >
      <view class="van-step__title" style="{{ index === active ? 'color: ' + activeColor : '' }}">
        <view>{{ item.text }}</view>
        <view class="desc-class">{{ item.desc }}</view>
      </view>
      <view class="van-step__circle-container">
        <block wx:if="{{ index !== active }}">
          <van-icon
            wx:if="{{ item.inactiveIcon || inactiveIcon }}"
            color="{{ status(index, active) === 'inactive' ? inactiveColor: activeColor }}"
            name="{{ item.inactiveIcon || inactiveIcon }}"
            class="van-step__icon"
          />
          <view
            wx:else
            class="van-step__circle"
            style="{{ 'background-color: ' + (index < active ? activeColor : inactiveColor) }}"
          />
        </block>

        <van-icon wx:else name="{{ item.activeIcon || activeIcon }}" color="{{ activeColor }}" class="van-step__icon" />
      </view>
      <view
        wx:if="{{ index !== steps.length - 1 }}"
        class="van-step__line" style="{{ 'background-color: ' + (index < active ? activeColor : inactiveColor) }}"
      />
    </view>
  </view>
</view>

<wxs module="status">
function get(index, active) {
  if (index < active) {
    return 'finish';
  } else if (index === active) {
    return 'process';
  }

  return 'inactive';
}

module.exports = get;
</wxs>

  </template>
  <script lang="ts" setup>
  import { VantComponent } from '../common/component';
import { GREEN, GRAY_DARK } from '../common/color';

VantComponent({
  classes: ['desc-class'],

  props: {
    icon: String,
    steps: Array,
    active: Number,
    direction: {
      type: String,
      value: 'horizontal',
    },
    activeColor: {
      type: String,
      value: GREEN,
    },
    inactiveColor: {
      type: String,
      value: GRAY_DARK,
    },
    activeIcon: {
      type: String,
      value: 'checked',
    },
    inactiveIcon: String,
  },

  methods: {
    onClick(event: WechatMiniprogram.TouchEvent) {
      const { index } = event.currentTarget.dataset;
      this.$emit('click-step', index);
    },
  },
});

  
  </script>
  
<style>
@import "./style.css";
</style>

  