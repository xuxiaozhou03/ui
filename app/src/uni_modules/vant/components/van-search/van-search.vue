<template>
  <wxs src="../wxs/utils.wxs" module="utils" />

<view
  class="{{ utils.bem('search', { withaction: showAction || useActionSlot }) }} custom-class"
  style="background: {{ background }}"
>
  <view class="{{ utils.bem('search__content', [shape]) }}">
    <view class="van-search__label" wx:if="{{ label }}">{{ label }}</view>
    <slot wx:else name="label" />

    <van-field
      type="search"
      left-icon="{{ !useLeftIconSlot ? leftIcon : '' }}"
      right-icon="{{ !useRightIconSlot ? rightIcon : '' }}"
      focus="{{ focus }}"
      error="{{ error }}"
      border="{{ false }}"
      confirm-type="search"
      class="van-search__field field-class"
      value="{{ value }}"
      disabled="{{ disabled }}"
      readonly="{{ readonly }}"
      clearable="{{ clearable }}"
      clear-trigger="{{ clearTrigger }}"
      clear-icon="{{ clearIcon }}"
      maxlength="{{ maxlength }}"
      input-align="{{ inputAlign }}"
      input-class="input-class"
      placeholder="{{ placeholder }}"
      placeholder-style="{{ placeholderStyle }}"
      cursor-spacing="{{ cursorSpacing }}"
      custom-style="padding: 5px 10px 5px 0; background-color: transparent;"
      bind:blur="onBlur"
      bind:focus="onFocus"
      bind:change="onChange"
      bind:confirm="onSearch"
      bind:clear="onClear"
      bind:click-input="onClickInput"
    >
      <slot wx:if="{{ useLeftIconSlot }}" name="left-icon" slot="left-icon" />
      <slot wx:if="{{ useRightIconSlot }}" name="right-icon" slot="right-icon" />
    </van-field>
  </view>

  <view
    wx:if="{{ showAction || useActionSlot }}"
    class="van-search__action"
    hover-class="van-search__action--hover"
    hover-stay-time="70"
  >
    <slot wx:if="{{ useActionSlot }}" name="action" />
    <view wx:else bind:tap="onCancel" class="van-search__action-button cancel-class">{{ actionText }}</view>
  </view>
</view>

</template>
<script lang="ts" setup>
  import { VantComponent } from '../common/component';
import { canIUseModel } from '../common/version';

VantComponent({
  field: true,

  classes: ['field-class', 'input-class', 'cancel-class'],

  props: {
    value: {
      type: String,
      value: '',
    },
    label: String,
    focus: Boolean,
    error: Boolean,
    disabled: Boolean,
    readonly: Boolean,
    inputAlign: String,
    showAction: Boolean,
    useActionSlot: Boolean,
    useLeftIconSlot: Boolean,
    useRightIconSlot: Boolean,
    leftIcon: {
      type: String,
      value: 'search',
    },
    rightIcon: String,
    placeholder: String,
    placeholderStyle: String,
    actionText: {
      type: String,
      value: '取消',
    },
    background: {
      type: String,
      value: '#ffffff',
    },
    maxlength: {
      type: Number,
      value: -1,
    },
    shape: {
      type: String,
      value: 'square',
    },
    clearable: {
      type: Boolean,
      value: true,
    },
    clearTrigger: {
      type: String,
      value: 'focus',
    },
    clearIcon: {
      type: String,
      value: 'clear',
    },
    cursorSpacing: {
      type: Number,
      value: 0,
    },
  },

  methods: {
    onChange(event: WechatMiniprogram.CustomEvent) {
      if (canIUseModel()) {
        this.setData({ value: event.detail });
      }
      this.$emit('change', event.detail);
    },

    onCancel() {
      /**
       * 修复修改输入框值时，输入框失焦和赋值同时触发，赋值失效
       * https://github.com/youzan/vant-weapp/issues/1768
       */
      setTimeout(() => {
        if (canIUseModel()) {
          this.setData({ value: '' });
        }
        this.$emit('cancel');
        this.$emit('change', '');
      }, 200);
    },

    onSearch(event: WechatMiniprogram.CustomEvent) {
      this.$emit('search', event.detail);
    },

    onFocus(event: WechatMiniprogram.CustomEvent) {
      this.$emit('focus', event.detail);
    },

    onBlur(event: WechatMiniprogram.CustomEvent) {
      this.$emit('blur', event.detail);
    },

    onClear(event: WechatMiniprogram.CustomEvent) {
      this.$emit('clear', event.detail);
    },

    onClickInput(event) {
      this.$emit('click-input', event.detail);
    },
  },
});

  // 转换为 Vue 3 的 computed 属性
  
</script>
<style lang="scss" scoped>
  @import '../common/index.wxss';.van-search{align-items:center;box-sizing:border-box;display:flex;padding:var(--search-padding,10px 12px)}.van-search__content{background-color:var(--search-background-color,#f7f8fa);border-radius:2px;display:flex;flex:1;padding-left:var(--padding-sm,12px)}.van-search__content--round{border-radius:999px}.van-search__label{color:var(--search-label-color,#323233);font-size:var(--search-label-font-size,14px);line-height:var(--search-input-height,34px);padding:var(--search-label-padding,0 5px)}.van-search__field{flex:1}.van-search__field__left-icon{color:var(--search-left-icon-color,#969799)}.van-search--withaction{padding-right:0}.van-search__action{color:var(--search-action-text-color,#323233);font-size:var(--search-action-font-size,14px);line-height:var(--search-input-height,34px)}.van-search__action--hover{background-color:#f2f3f5}.van-search__action-button{padding:var(--search-action-padding,0 8px)}
</style>
