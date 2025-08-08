
  <template>
   <wxs src="../wxs/utils.wxs" module="utils" />
<wxs src="./index.wxs" module="computed" />

<view class="{{ utils.bem('checkbox', [{ horizontal: direction === 'horizontal' }]) }} custom-class">
  <view
    wx:if="{{ labelPosition === 'left' }}"
    class="label-class {{ utils.bem('checkbox__label', [labelPosition, { disabled: disabled || parentDisabled }]) }}"
    bindtap="onClickLabel"
  >
    <slot />
  </view>
  <view class="van-checkbox__icon-wrap" bindtap="toggle">
    <slot wx:if="{{ useIconSlot }}" name="icon" />
    <van-icon
      wx:else
      name="success"
      size="0.8em"
      class="{{ utils.bem('checkbox__icon', [shape, { disabled: disabled || parentDisabled, checked: value }]) }}"
      style="{{ computed.iconStyle(checkedColor, value, disabled, parentDisabled, iconSize) }}"
      custom-class="icon-class"
      custom-style="line-height: 1.25em;"
    />
  </view>
  <view
    wx:if="{{ labelPosition === 'right' }}"
    class="label-class {{ utils.bem('checkbox__label', [labelPosition, { disabled: disabled || parentDisabled }]) }}"
    bindtap="onClickLabel"
  >
    <slot />
  </view>
</view>

  </template>
  <script lang="ts" setup>
  import { useParent } from '../common/relation';
import { VantComponent } from '../common/component';

function emit(
  target: WechatMiniprogram.Component.TrivialInstance,
  value: boolean | any[]
) {
  target.$emit('input', value);
  target.$emit('change', value);
}

VantComponent({
  field: true,

  relation: useParent('checkbox-group'),

  classes: ['icon-class', 'label-class'],

  props: {
    value: Boolean,
    disabled: Boolean,
    useIconSlot: Boolean,
    checkedColor: String,
    labelPosition: {
      type: String,
      value: 'right',
    },
    labelDisabled: Boolean,
    shape: {
      type: String,
      value: 'round',
    },
    iconSize: {
      type: null,
      value: 20,
    },
  },

  data: {
    parentDisabled: false,
    direction: 'vertical',
  },

  methods: {
    emitChange(value: boolean) {
      if (this.parent) {
        this.setParentValue(this.parent, value);
      } else {
        emit(this, value);
      }
    },

    toggle() {
      const { parentDisabled, disabled, value } = this.data;
      if (!disabled && !parentDisabled) {
        this.emitChange(!value);
      }
    },

    onClickLabel() {
      const { labelDisabled, parentDisabled, disabled, value } = this.data;
      if (!disabled && !labelDisabled && !parentDisabled) {
        this.emitChange(!value);
      }
    },

    setParentValue(
      parent: WechatMiniprogram.Component.TrivialInstance,
      value: boolean
    ) {
      const parentValue = parent.data.value.slice();
      const { name } = this.data;
      const { max } = parent.data;

      if (value) {
        if (max && parentValue.length >= max) {
          return;
        }

        if (parentValue.indexOf(name) === -1) {
          parentValue.push(name);
          emit(parent, parentValue);
        }
      } else {
        const index = parentValue.indexOf(name);
        if (index !== -1) {
          parentValue.splice(index, 1);
          emit(parent, parentValue);
        }
      }
    },
  },
});

  // 以下代码转换为 computed 属性 
 /* eslint-disable */
var style = require('../wxs/style.wxs');
var addUnit = require('../wxs/add-unit.wxs');

function iconStyle(checkedColor, value, disabled, parentDisabled, iconSize) {
  var styles = {
    'font-size': addUnit(iconSize),
  };

  if (checkedColor && value && !disabled && !parentDisabled) {
    styles['border-color'] = checkedColor;
    styles['background-color'] = checkedColor;
  }

  return style(styles);
}

module.exports = {
  iconStyle: iconStyle,
};

  </script>
  
<style>
@import "./style.css";
</style>

  