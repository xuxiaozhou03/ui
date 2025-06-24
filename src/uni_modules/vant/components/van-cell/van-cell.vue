
    <template>
    


<view
  class="custom-class {{ utils.bem('cell', [size, { center, required, borderless: !border, clickable: isLink || clickable }]) }}"
  hover-class="van-cell--hover hover-class"
  hover-stay-time="70"
  style="{{ customStyle }}"
  bind:tap="onClick"
>
  <van-icon
    wx:if="{{ icon }}"
    name="{{ icon }}"
    class="van-cell__left-icon-wrap"
    custom-class="van-cell__left-icon"
  />
  <slot wx:else name="icon" />

  <view
    style="{{ computed.titleStyle({ titleWidth, titleStyle }) }}"
    class="van-cell__title title-class"
  >

    <block wx:if="{{ title }}">{{ title }}</block>
    <slot wx:else name="title" />

    <view wx:if="{{ label || useLabelSlot }}" class="van-cell__label label-class">
      <slot wx:if="{{ useLabelSlot }}" name="label" />
      <block wx:elif="{{ label }}">{{ label }}</block>
    </view>
  </view>

  <view class="van-cell__value value-class">
    <block wx:if="{{ value || value === 0 }}">{{ value }}</block>
    <slot wx:else />
  </view>

  <van-icon
    wx:if="{{ isLink }}"
    name="{{ arrowDirection ? 'arrow' + '-' + arrowDirection : 'arrow' }}"
    class="van-cell__right-icon-wrap right-icon-class"
    custom-class="van-cell__right-icon"
  />
  <slot wx:else name="right-icon" />

  <slot name="extra" />
</view>

    </template>
    <script lang="ts" setup>
    import { cn, bem, commonProps } from "../../utils";
    import { link } from '../mixins/link';
import { VantComponent } from '../common/component';

VantComponent({
  classes: [
    'title-class',
    'label-class',
    'value-class',
    'right-icon-class',
    'hover-class',
  ],

  mixins: [link],

  props: {
    title: null,
    value: null,
    icon: String,
    size: String,
    label: String,
    center: Boolean,
    isLink: Boolean,
    required: Boolean,
    clickable: Boolean,
    titleWidth: String,
    customStyle: String,
    arrowDirection: String,
    useLabelSlot: Boolean,
    border: {
      type: Boolean,
      value: true,
    },
    titleStyle: String,
  },

  methods: {
    onClick(event: WechatMiniprogram.TouchEvent) {
      this.$emit('click', event.detail);
      this.jumpLink();
    },
  },
});


    // 把下面代码变成 computed 属性
    



function titleStyle(data) {
  return style([
    {
      'max-width': addUnit(data.titleWidth),
      'min-width': addUnit(data.titleWidth),
    },
    data.titleStyle,
  ]);
}

module.exports = {
  titleStyle: titleStyle,
};

    </script>
    <style>
    .van-cell{background-color:var(--cell-background-color,#fff);box-sizing:border-box;color:var(--cell-text-color,#323233);display:flex;font-size:var(--cell-font-size,14px);line-height:var(--cell-line-height,24px);padding:var(--cell-vertical-padding,10px) var(--cell-horizontal-padding,16px);position:relative;width:100%}.van-cell:after{border-bottom:1px solid #ebedf0;bottom:0;box-sizing:border-box;content:" ";left:16px;pointer-events:none;position:absolute;right:16px;transform:scaleY(.5);transform-origin:center}.van-cell--borderless:after{display:none}.van-cell-group{background-color:var(--cell-background-color,#fff)}.van-cell__label{color:var(--cell-label-color,#969799);font-size:var(--cell-label-font-size,12px);line-height:var(--cell-label-line-height,18px);margin-top:var(--cell-label-margin-top,3px)}.van-cell__value{color:var(--cell-value-color,#969799);overflow:hidden;text-align:right;vertical-align:middle}.van-cell__title,.van-cell__value{flex:1}.van-cell__title:empty,.van-cell__value:empty{display:none}.van-cell__left-icon-wrap,.van-cell__right-icon-wrap{align-items:center;display:flex;font-size:var(--cell-icon-size,16px);height:var(--cell-line-height,24px)}.van-cell__left-icon-wrap{margin-right:var(--padding-base,4px)}.van-cell__right-icon-wrap{color:var(--cell-right-icon-color,#969799);margin-left:var(--padding-base,4px)}.van-cell__left-icon{vertical-align:middle}.van-cell__left-icon,.van-cell__right-icon{line-height:var(--cell-line-height,24px)}.van-cell--clickable.van-cell--hover{background-color:var(--cell-active-color,#f2f3f5)}.van-cell--required{overflow:visible}.van-cell--required:before{color:var(--cell-required-color,#ee0a24);content:"*";font-size:var(--cell-font-size,14px);left:var(--padding-xs,8px);position:absolute}.van-cell--center{align-items:center}.van-cell--large{padding-bottom:var(--cell-large-vertical-padding,12px);padding-top:var(--cell-large-vertical-padding,12px)}.van-cell--large .van-cell__title{font-size:var(--cell-large-title-font-size,16px)}.van-cell--large .van-cell__value{font-size:var(--cell-large-value-font-size,16px)}.van-cell--large .van-cell__label{font-size:var(--cell-large-label-font-size,14px)}
    </style>
  