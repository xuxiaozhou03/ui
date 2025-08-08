
  <template>
   <wxs src="../wxs/utils.wxs" module="utils" />
<wxs src="./index.wxs" module="computed" />

<view class="{{ utils.bem('radio', [direction]) }} custom-class">
  <view
    wx:if="{{ labelPosition === 'left' }}"
    class="{{ utils.bem('radio__label', [labelPosition, { disabled: disabled || parentDisabled }]) }} label-class"
    bindtap="onClickLabel"
  >
    <slot />
  </view>
  <view class="van-radio__icon-wrap" style="font-size: {{ utils.addUnit(iconSize) }}" bindtap="onChange">
    <slot wx:if="{{ useIconSlot }}" name="icon" />
    <van-icon
      wx:else
      name="success"
      class="{{ utils.bem('radio__icon', [shape, { disabled: disabled || parentDisabled, checked: value === name }]) }}"
      style="{{ computed.iconStyle({ iconSize, checkedColor, disabled, parentDisabled, value, name }) }}"
      custom-class="icon-class"
      custom-style="{{ computed.iconCustomStyle({ iconSize }) }}"
    />
  </view>
  <view
    wx:if="{{ labelPosition === 'right' }}"
    class="label-class {{ utils.bem('radio__label', [labelPosition, { disabled: disabled || parentDisabled }]) }}"
    bindtap="onClickLabel"
  >
    <slot />
  </view>
</view>

  </template>
  <script lang="ts" setup>
  import { canIUseModel } from '../common/version';
import { VantComponent } from '../common/component';
import { useParent } from '../common/relation';

VantComponent({
  field: true,

  relation: useParent('radio-group', function () {
    this.updateFromParent();
  }),

  classes: ['icon-class', 'label-class'],

  props: {
    name: null,
    value: null,
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
    direction: '',
    parentDisabled: false,
  },

  methods: {
    updateFromParent() {
      if (!this.parent) {
        return;
      }

      const { value, disabled: parentDisabled, direction } = this.parent.data;

      this.setData({
        value,
        direction,
        parentDisabled,
      });
    },

    emitChange(value: boolean) {
      const instance = this.parent || this;
      instance.$emit('input', value);
      instance.$emit('change', value);

      if (canIUseModel()) {
        instance.setData({ value });
      }
    },

    onChange() {
      if (!this.data.disabled && !this.data.parentDisabled) {
        this.emitChange(this.data.name);
      }
    },

    onClickLabel() {
      const { disabled, parentDisabled, labelDisabled, name } = this.data;
      if (!(disabled || parentDisabled) && !labelDisabled) {
        this.emitChange(name);
      }
    },
  },
});

  // 以下代码转换为 computed 属性 
 /* eslint-disable */
var style = require('../wxs/style.wxs');
var addUnit = require('../wxs/add-unit.wxs');

function iconStyle(data) {
  var styles = {
    'font-size': addUnit(data.iconSize),
  };

  if (
    data.checkedColor &&
    !(data.disabled || data.parentDisabled) &&
    data.value === data.name
  ) {
    styles['border-color'] = data.checkedColor;
    styles['background-color'] = data.checkedColor;
  }

  return style(styles);
}

function iconCustomStyle(data) {
  return style({
    'line-height': addUnit(data.iconSize),
    'font-size': '.8em',
    display: 'block',
  });
}

module.exports = {
  iconStyle: iconStyle,
  iconCustomStyle: iconCustomStyle,
};

  </script>
  
<style>
@import "./style.css";
</style>

  