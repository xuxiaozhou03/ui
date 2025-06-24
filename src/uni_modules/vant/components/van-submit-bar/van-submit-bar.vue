
    <template>
    

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
    import { cn, bem, commonProps } from "../../utils";
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
    .van-submit-bar{background-color:var(--submit-bar-background-color,#fff);bottom:0;left:0;position:fixed;-webkit-user-select:none;user-select:none;width:100%;z-index:var(--submit-bar-z-index,100)}.van-submit-bar__tip{background-color:var(--submit-bar-tip-background-color,#fff7cc);color:var(--submit-bar-tip-color,#f56723);font-size:var(--submit-bar-tip-font-size,12px);line-height:var(--submit-bar-tip-line-height,1.5);padding:var(--submit-bar-tip-padding,10px)}.van-submit-bar__tip:empty{display:none}.van-submit-bar__tip-icon{margin-right:4px;vertical-align:middle}.van-submit-bar__tip-text{display:inline;vertical-align:middle}.van-submit-bar__bar{align-items:center;background-color:var(--submit-bar-background-color,#fff);display:flex;font-size:var(--submit-bar-text-font-size,14px);height:var(--submit-bar-height,50px);justify-content:flex-end;padding:var(--submit-bar-padding,0 16px)}.van-submit-bar__safe{height:constant(safe-area-inset-bottom);height:env(safe-area-inset-bottom)}.van-submit-bar__text{color:var(--submit-bar-text-color,#323233);flex:1;font-weight:var(--font-weight-bold,500);padding-right:var(--padding-sm,12px);text-align:right}.van-submit-bar__price{color:var(--submit-bar-price-color,#ee0a24);font-size:var(--submit-bar-price-font-size,12px);font-weight:var(--font-weight-bold,500)}.van-submit-bar__price-integer{font-family:Avenir-Heavy,PingFang SC,Helvetica Neue,Arial,sans-serif;font-size:20px}.van-submit-bar__currency{font-size:var(--submit-bar-currency-font-size,12px)}.van-submit-bar__suffix-label{margin-left:5px}.van-submit-bar__button{--button-default-height:var(--submit-bar-button-height,40px)!important;--button-line-height:var(--submit-bar-button-height,40px)!important;font-weight:var(--font-weight-bold,500);width:var(--submit-bar-button-width,110px)}
    </style>
  