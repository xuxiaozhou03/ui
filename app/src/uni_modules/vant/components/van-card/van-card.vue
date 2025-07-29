<template>
  <wxs src="../wxs/utils.wxs" module="utils" />

<view class="custom-class van-card">
  <view class="{{ utils.bem('card__header', { center: centered }) }}">
    <view class="van-card__thumb" bind:tap="onClickThumb">
      <image
        wx:if="{{ thumb }}"
        src="{{ thumb }}"
        mode="{{ thumbMode }}"
        lazy-load="{{ lazyLoad }}"
        class="van-card__img thumb-class"
      />
      <slot wx:else name="thumb" />
      <van-tag
        wx:if="{{ tag }}"
        mark
        type="danger"
        custom-class="van-card__tag"
      >
        {{ tag }}
      </van-tag>
      <slot wx:else name="tag" />
    </view>

    <view class="van-card__content {{ utils.bem('card__content', { center: centered }) }}">
      <view>
        <view wx:if="{{ title }}" class="van-card__title title-class">{{ title }}</view>
        <slot wx:else name="title" />

        <view wx:if="{{ desc }}" class="van-card__desc desc-class">{{ desc }}</view>
        <slot wx:else name="desc" />

        <slot name="tags" />
      </view>

      <view class="van-card__bottom">
        <slot name="price-top" />
        <view wx:if="{{ price || price === 0 }}" class="van-card__price price-class">
          <text>{{ currency }}</text>
          <text class="van-card__price-integer">{{ integerStr }}</text>
          <text class="van-card__price-decimal">{{ decimalStr }}</text>
        </view>
        <slot wx:else name="price" />
        <view wx:if="{{ originPrice || originPrice === 0 }}" class="van-card__origin-price origin-price-class">{{ currency }} {{ originPrice }}</view>
        <slot wx:else name="origin-price" />
        <view wx:if="{{ num }}" class="van-card__num num-class">x {{ num }}</view>
        <slot wx:else  name="num" />
        <slot name="bottom" />
      </view>
    </view>
  </view>

  <view class="van-card__footer">
    <slot name="footer" />
  </view>
</view>

</template>
<script lang="ts" setup>
  import { link } from '../mixins/link';
import { VantComponent } from '../common/component';

VantComponent({
  classes: [
    'num-class',
    'desc-class',
    'thumb-class',
    'title-class',
    'price-class',
    'origin-price-class',
  ],

  mixins: [link],

  props: {
    tag: String,
    num: String,
    desc: String,
    thumb: String,
    title: String,
    price: {
      type: String,
      observer: 'updatePrice',
    },
    centered: Boolean,
    lazyLoad: Boolean,
    thumbLink: String,
    originPrice: String,
    thumbMode: {
      type: String,
      value: 'aspectFit',
    },
    currency: {
      type: String,
      value: '¥',
    },
  },

  methods: {
    updatePrice() {
      const { price } = this.data;
      const priceArr = price.toString().split('.');
      this.setData({
        integerStr: priceArr[0],
        decimalStr: priceArr[1] ? `.${priceArr[1]}` : '',
      });
    },

    onClickThumb() {
      this.jumpLink('thumbLink');
    },
  },
});

  // 转换为 Vue 3 的 computed 属性
  
</script>
<style>
  @import '../common/index.wxss';.van-card{background-color:var(--card-background-color,#fafafa);box-sizing:border-box;color:var(--card-text-color,#323233);font-size:var(--card-font-size,12px);padding:var(--card-padding,8px 16px);position:relative}.van-card__header{display:flex}.van-card__header--center{align-items:center;justify-content:center}.van-card__thumb{flex:none;height:var(--card-thumb-size,88px);margin-right:var(--padding-xs,8px);position:relative;width:var(--card-thumb-size,88px)}.van-card__thumb:empty{display:none}.van-card__img{border-radius:8px;height:100%;width:100%}.van-card__content{display:flex;flex:1;flex-direction:column;justify-content:space-between;min-height:var(--card-thumb-size,88px);min-width:0;position:relative}.van-card__content--center{justify-content:center}.van-card__desc,.van-card__title{word-wrap:break-word}.van-card__title{font-weight:700;line-height:var(--card-title-line-height,16px)}.van-card__desc{color:var(--card-desc-color,#646566);line-height:var(--card-desc-line-height,20px)}.van-card__bottom{line-height:20px}.van-card__price{color:var(--card-price-color,#ee0a24);display:inline-block;font-size:var(--card-price-font-size,12px);font-weight:700}.van-card__price-integer{font-size:var(--card-price-integer-font-size,16px)}.van-card__price-decimal,.van-card__price-integer{font-family:var(--card-price-font-family,Avenir-Heavy,PingFang SC,Helvetica Neue,Arial,sans-serif)}.van-card__origin-price{color:var(--card-origin-price-color,#646566);display:inline-block;font-size:var(--card-origin-price-font-size,10px);margin-left:5px;text-decoration:line-through}.van-card__num{float:right}.van-card__tag{left:0;position:absolute!important;top:2px}.van-card__footer{flex:none;text-align:right;width:100%}
</style>
