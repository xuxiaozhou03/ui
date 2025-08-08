
  <template>
   <wxs src="../wxs/utils.wxs" module="utils" />
<wxs src="./index.wxs" module="computed" />

<view
  class="custom-class {{ utils.bem('divider', [{ dashed, hairline }, contentPosition]) }}"
  style="{{ computed.rootStyle({ borderColor, textColor, fontSize, customStyle }) }}"
>
  <slot />
</view>

  </template>
  <script lang="ts" setup>
  import { VantComponent } from '../common/component';

VantComponent({
  props: {
    dashed: Boolean,
    hairline: Boolean,
    contentPosition: String,
    fontSize: String,
    borderColor: String,
    textColor: String,
    customStyle: String,
  },
});

  // 以下代码转换为 computed 属性 
 /* eslint-disable */
var style = require('../wxs/style.wxs');
var addUnit = require('../wxs/add-unit.wxs');

function rootStyle(data) {
  return style([
    {
      'border-color': data.borderColor,
      color: data.textColor,
      'font-size': addUnit(data.fontSize),
    },
    data.customStyle,
  ]);
}

module.exports = {
  rootStyle: rootStyle,
};

  </script>
  
<style>
@import "./style.css";
</style>

  