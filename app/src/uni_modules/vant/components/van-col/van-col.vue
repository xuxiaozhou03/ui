
  <template>
   <wxs src="../wxs/utils.wxs" module="utils" />
<wxs src="./index.wxs" module="computed" />

<view
  class="custom-class {{ utils.bem('col', [span]) }} {{ offset ? 'van-col--offset-' + offset : '' }}"
  style="{{ computed.rootStyle({ gutter }) }}"
>
  <slot />
</view>

  </template>
  <script lang="ts" setup>
  import { useParent } from '../common/relation';
import { VantComponent } from '../common/component';

VantComponent({
  relation: useParent('row'),

  props: {
    span: Number,
    offset: Number,
  },
});

  // 以下代码转换为 computed 属性 
 /* eslint-disable */
var style = require('../wxs/style.wxs');
var addUnit = require('../wxs/add-unit.wxs');

function rootStyle(data) {
  if (!data.gutter) {
    return '';
  }

  return style({
    'padding-right': addUnit(data.gutter / 2),
    'padding-left': addUnit(data.gutter / 2),
  });
}

module.exports = {
  rootStyle: rootStyle,
};

  </script>
  
<style>
@import "./style.css";
</style>

  