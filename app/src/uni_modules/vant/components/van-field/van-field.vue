<template>
  <wxs src="../wxs/utils.wxs" module="utils" />
<wxs src="./index.wxs" module="computed" />

<van-cell
  size="{{ size }}"
  icon="{{ leftIcon }}"
  center="{{ center }}"
  border="{{ border }}"
  is-link="{{ isLink }}"
  required="{{ required }}"
  clickable="{{ clickable }}"
  title-width="{{ titleWidth }}"
  title-style="margin-right: 12px;"
  custom-style="{{ customStyle }}"
  arrow-direction="{{ arrowDirection }}"
  custom-class="custom-class van-field"
>
  <slot name="left-icon" slot="icon" />
  <label for="{{ name }}" wx:if="{{ label }}" class="label-class {{ utils.bem('field__label', { disabled }) }}" slot="title">
    {{ label }}
  </label>
  <slot wx:else name="label" slot="title" />
  <view class="{{ utils.bem('field__body', [type]) }}">
    <view class="{{ utils.bem('field__control', [inputAlign, 'custom']) }}" bindtap="onClickInput">
      <slot name="input" />
    </view>
    <include wx:if="{{ type === 'textarea' }}" src="./textarea.wxml" />
    <include wx:else src="./input.wxml" />

    <van-icon
      wx:if="{{ showClear }}"
      name="{{ clearIcon }}"
      class="van-field__clear-root van-field__icon-root"
      catch:touchstart="onClear"
    />
    <view class="van-field__icon-container" bind:tap="onClickIcon">
      <van-icon
        wx:if="{{ rightIcon || icon }}"
        name="{{ rightIcon || icon }}"
        class="van-field__icon-root {{ iconClass }}"
        custom-class="right-icon-class"
      />
      <slot name="right-icon" />
      <slot name="icon" />
    </view>
    <view class="van-field__button">
      <slot name="button" />
    </view>
  </view>
  <label for="{{ name }}" wx:if="{{ showWordLimit && maxlength }}" class="van-field__word-limit">
    <view class="{{ utils.bem('field__word-num', { full: value.length >= maxlength }) }}">{{ value.length >= maxlength ? maxlength : value.length }}</view>/{{ maxlength }}
  </label>
  <label for="{{ name }}"  wx:if="{{ errorMessage }}" class="{{ utils.bem('field__error-message', [errorMessageAlign, { disabled, error }]) }}">
    {{ errorMessage }}
  </label>
</van-cell>

</template>
<script lang="ts" setup>
  import { nextTick } from '../common/utils';
import { VantComponent } from '../common/component';
import { commonProps, inputProps, textareaProps } from './props';
import { InputDetails } from './types';

VantComponent({
  field: true,

  classes: ['input-class', 'right-icon-class', 'label-class'],

  props: {
    ...commonProps,
    ...inputProps,
    ...textareaProps,
    size: String,
    icon: String,
    label: String,
    error: Boolean,
    center: Boolean,
    isLink: Boolean,
    leftIcon: String,
    rightIcon: String,
    autosize: null,
    required: Boolean,
    iconClass: String,
    clickable: Boolean,
    inputAlign: String,
    customStyle: String,
    errorMessage: String,
    arrowDirection: String,
    showWordLimit: Boolean,
    errorMessageAlign: String,
    readonly: {
      type: Boolean,
      observer: 'setShowClear',
    },
    clearable: {
      type: Boolean,
      observer: 'setShowClear',
    },
    clearTrigger: {
      type: String,
      value: 'focus',
    },
    border: {
      type: Boolean,
      value: true,
    },
    titleWidth: {
      type: String,
      value: '6.2em',
    },
    clearIcon: {
      type: String,
      value: 'clear',
    },
    extraEventParams: {
      type: Boolean,
      value: false,
    },
  },

  data: {
    focused: false,
    innerValue: '',
    showClear: false,
  },

  watch: {
    value(this: WechatMiniprogram.Component.TrivialInstance, value) {
      if (value !== this.value) {
        this.setData({ innerValue: value });
        this.value = value;

        this.setShowClear();
      }
    },
    clearTrigger() {
      this.setShowClear();
    },
  },

  created() {
    this.value = this.data.value;
    this.setData({ innerValue: this.value });
  },

  methods: {
    formatValue(value: string) {
      const { maxlength } = this.data;

      if (maxlength !== -1 && value.length > maxlength) {
        return value.slice(0, maxlength);
      }

      return value;
    },

    onInput(event: WechatMiniprogram.Input | WechatMiniprogram.TextareaInput) {
      const { value = '' } = event.detail || {};

      const formatValue = this.formatValue(value);

      this.value = formatValue;

      this.setShowClear();

      return this.emitChange({
        ...event.detail,
        value: formatValue,
      });
    },

    onFocus(
      event: WechatMiniprogram.InputFocus | WechatMiniprogram.TextareaFocus
    ) {
      this.focused = true;
      this.setShowClear();
      this.$emit('focus', event.detail);
    },

    onBlur(
      event: WechatMiniprogram.InputBlur | WechatMiniprogram.TextareaBlur
    ) {
      this.focused = false;
      this.setShowClear();
      this.$emit('blur', event.detail);
    },

    onClickIcon() {
      this.$emit('click-icon');
    },

    onClickInput(event: WechatMiniprogram.TouchEvent) {
      this.$emit('click-input', event.detail);
    },

    onClear() {
      this.setData({ innerValue: '' });
      this.value = '';
      this.setShowClear();

      nextTick(() => {
        this.emitChange({ value: '' });
        this.$emit('clear', '');
      });
    },

    onConfirm(
      event: WechatMiniprogram.InputConfirm | WechatMiniprogram.TextareaConfirm
    ) {
      const { value = '' } = event.detail || {};
      this.value = value;
      this.setShowClear();
      this.$emit('confirm', value);
    },

    setValue(value: string) {
      this.value = value;
      this.setShowClear();

      if (value === '') {
        this.setData({ innerValue: '' });
      }

      this.emitChange({ value });
    },

    onLineChange(event: WechatMiniprogram.TextareaLineChange) {
      this.$emit('linechange', event.detail);
    },

    onKeyboardHeightChange(
      event:
        | WechatMiniprogram.InputKeyboardHeightChange
        | WechatMiniprogram.TextareaKeyboardHeightChange
    ) {
      this.$emit('keyboardheightchange', event.detail);
    },

    onBindNicknameReview(event) {
      this.$emit('nicknamereview', event.detail);
    },

    emitChange(detail: InputDetails) {
      const { extraEventParams } = this.data;

      this.setData({ value: detail.value });

      let result: InputDetails | undefined;

      const data = extraEventParams
        ? {
            ...detail,
            callback: (data: InputDetails) => {
              result = data;
            },
          }
        : detail.value;

      this.$emit('input', data);
      this.$emit('change', data);

      return result;
    },

    setShowClear() {
      const { clearable, readonly, clearTrigger } = this.data;
      const { focused, value } = this;

      let showClear = false;

      if (clearable && !readonly) {
        const hasValue = !!value;
        const trigger =
          clearTrigger === 'always' || (clearTrigger === 'focus' && focused);

        showClear = hasValue && trigger;
      }

      this.setView({ showClear });
    },

    noop() {},
  },
});

  // 转换为 Vue 3 的 computed 属性
  /* eslint-disable */
var style = require('../wxs/style.wxs');
var addUnit = require('../wxs/add-unit.wxs');

function inputStyle(autosize) {
  if (autosize && autosize.constructor === 'Object') {
    return style({
      'min-height': addUnit(autosize.minHeight),
      'max-height': addUnit(autosize.maxHeight),
    });
  }

  return '';
}

module.exports = {
  inputStyle: inputStyle,
};

</script>
<style>
  @import '../common/index.wxss';.van-field{--cell-icon-size:var(--field-icon-size,16px)}.van-field__label{color:var(--field-label-color,#646566)}.van-field__label--disabled{color:var(--field-disabled-text-color,#c8c9cc)}.van-field__body{align-items:center;display:flex}.van-field__body--textarea{box-sizing:border-box;line-height:1.2em;min-height:var(--cell-line-height,24px);padding:3.6px 0}.van-field__control:empty+.van-field__control{display:block}.van-field__control{background-color:initial;border:0;box-sizing:border-box;color:var(--field-input-text-color,#323233);display:none;height:var(--cell-line-height,24px);line-height:inherit;margin:0;min-height:var(--cell-line-height,24px);padding:0;position:relative;resize:none;text-align:left;width:100%}.van-field__control:empty{display:none}.van-field__control--textarea{height:var(--field-text-area-min-height,18px);min-height:var(--field-text-area-min-height,18px)}.van-field__control--error{color:var(--field-input-error-text-color,#ee0a24)}.van-field__control--disabled{background-color:initial;color:var(--field-input-disabled-text-color,#c8c9cc);opacity:1}.van-field__control--center{text-align:center}.van-field__control--right{text-align:right}.van-field__control--custom{align-items:center;display:flex;min-height:var(--cell-line-height,24px)}.van-field__placeholder{color:var(--field-placeholder-text-color,#c8c9cc);left:0;pointer-events:none;position:absolute;right:0;top:0}.van-field__placeholder--error{color:var(--field-error-message-color,#ee0a24)}.van-field__icon-root{align-items:center;display:flex;min-height:var(--cell-line-height,24px)}.van-field__clear-root,.van-field__icon-container{line-height:inherit;margin-right:calc(var(--padding-xs, 8px)*-1);padding:0 var(--padding-xs,8px);vertical-align:middle}.van-field__button,.van-field__clear-root,.van-field__icon-container{flex-shrink:0}.van-field__clear-root{color:var(--field-clear-icon-color,#c8c9cc);font-size:var(--field-clear-icon-size,16px)}.van-field__icon-container{color:var(--field-icon-container-color,#969799);font-size:var(--field-icon-size,16px)}.van-field__icon-container:empty{display:none}.van-field__button{padding-left:var(--padding-xs,8px)}.van-field__button:empty{display:none}.van-field__error-message{color:var(--field-error-message-color,#ee0a24);display:block;font-size:var(--field-error-message-text-font-size,12px);text-align:left}.van-field__error-message--center{text-align:center}.van-field__error-message--right{text-align:right}.van-field__word-limit{color:var(--field-word-limit-color,#646566);font-size:var(--field-word-limit-font-size,12px);line-height:var(--field-word-limit-line-height,16px);margin-top:var(--padding-base,4px);text-align:right}.van-field__word-num{display:inline}.van-field__word-num--full{color:var(--field-word-num-full-color,#ee0a24)}
</style>
