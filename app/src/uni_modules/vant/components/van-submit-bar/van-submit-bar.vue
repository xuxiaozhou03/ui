
  <template>
   <wxs src="../wxs/utils.wxs" module="utils" />

<view class="van-submit-bar custom-class">
  <slot name="top" />

  <view class="van-submit-bar__tip">
    <van-icon
      wx:if="{{ tipIcon }}"
      size="12px"
      name="{{ tipIcon }}"
      custom-class="van-submit-bar__tip-icon"
    />
    <view wx:if="{{ hasTip }}" class="van-submit-bar__tip-text">
      {{ tip }}
    </view>
    <slot name="tip" />
  </view>

  <view class="bar-class van-submit-bar__bar">
    <slot />
    <view wx:if="{{ hasPrice }}" class="van-submit-bar__text">
      <text>{{ label || '合计：' }}</text>
      <text class="van-submit-bar__price price-class">
        <text class="van-submit-bar__currency">{{ currency }} </text>
        <text class="van-submit-bar__price-integer">{{ integerStr }}</text><text>{{decimalStr}}</text>
      </text>
      <text class="van-submit-bar__suffix-label">{{ suffixLabel }}</text>
    </view>
    <van-button
      round
      type="{{ buttonType }}"
      loading="{{ loading }}"
      disabled="{{ disabled }}"
      class="van-submit-bar__button"
      custom-class="button-class"
      custom-style="width: 100%;"
      bind:click="onSubmit"
    >
      {{ loading ? '' : buttonText }}
    </van-button>
  </view>

  <view wx:if="{{ safeAreaInsetBottom }}" class="van-submit-bar__safe" />
</view>

  </template>
  <script lang="ts" setup>
  import { VantComponent } from '../common/component';

VantComponent({
  classes: ['bar-class', 'price-class', 'button-class'],

  props: {
    tip: {
      type: null,
      observer: 'updateTip',
    },
    tipIcon: String,
    type: Number,
    price: {
      type: null,
      observer: 'updatePrice',
    },
    label: String,
    loading: Boolean,
    disabled: Boolean,
    buttonText: String,
    currency: {
      type: String,
      value: '¥',
    },
    buttonType: {
      type: String,
      value: 'danger',
    },
    decimalLength: {
      type: Number,
      value: 2,
      observer: 'updatePrice',
    },
    suffixLabel: String,
    safeAreaInsetBottom: {
      type: Boolean,
      value: true,
    },
  },

  methods: {
    updatePrice() {
      const { price, decimalLength } = this.data;
      const priceStrArr =
        typeof price === 'number' &&
        (price / 100).toFixed(decimalLength).split('.');
      this.setData({
        hasPrice: typeof price === 'number',
        integerStr: priceStrArr && priceStrArr[0],
        decimalStr: decimalLength && priceStrArr ? `.${priceStrArr[1]}` : '',
      });
    },

    updateTip() {
      this.setData({ hasTip: typeof this.data.tip === 'string' });
    },

    onSubmit(event: WechatMiniprogram.CustomEvent) {
      this.$emit('submit', event.detail);
    },
  },
});

  
  </script>
  
<style>
@import "./style.css";
</style>

  