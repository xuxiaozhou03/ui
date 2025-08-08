
  <template>
   <wxs src="../wxs/utils.wxs" module="utils" />
<wxs src="./index.wxs" module="computed" />

<view
  class="custom-class {{ utils.bem('tag', [type, size, { mark, plain, round }]) }}"
  style="{{ computed.rootStyle({ plain, color, textColor }) }}"
>
  <slot />
  <van-icon
    wx:if="{{ closeable }}"
    name="cross"
    custom-class="van-tag__close"
    bind:click="onClose"
  />
</view>

  </template>
  <script lang="ts" setup>
  import { VantComponent } from '../common/component';

VantComponent({
  props: {
    size: String,
    mark: Boolean,
    color: String,
    plain: Boolean,
    round: Boolean,
    textColor: String,
    type: {
      type: String,
      value: 'default',
    },
    closeable: Boolean,
  },

  methods: {
    onClose() {
      this.$emit('close');
    },
  },
});

  // 以下代码转换为 computed 属性 
 /* eslint-disable */
var style = require('../wxs/style.wxs');

function rootStyle(data) {
  return style({
    'background-color': data.plain ? '' : data.color,
    color: data.textColor || data.plain ? data.textColor || data.color : '',
  });
}

module.exports = {
  rootStyle: rootStyle,
};

  </script>
  
<style>
@import "./style.css";
</style>

  