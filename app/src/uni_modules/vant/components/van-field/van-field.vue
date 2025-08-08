
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

  // 以下代码转换为 computed 属性 
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
@import "./style.css";
</style>

  