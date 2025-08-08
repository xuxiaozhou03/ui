
  <template>
   <wxs src="./index.wxs" module="computed" />

<view
  wx:if="{{ inited }}"
  class="van-transition custom-class {{ classes }}"
  style="{{ computed.rootStyle({ currentDuration, display, customStyle }) }}"
  bind:transitionend="onTransitionEnd"
>
  <slot />
</view>

  </template>
  <script lang="ts" setup>
  import { VantComponent } from '../common/component';
import { transition } from '../mixins/transition';

VantComponent({
  classes: [
    'enter-class',
    'enter-active-class',
    'enter-to-class',
    'leave-class',
    'leave-active-class',
    'leave-to-class',
  ],

  mixins: [transition(true)],
});

  // 以下代码转换为 computed 属性 
 /* eslint-disable */
var style = require('../wxs/style.wxs');

function rootStyle(data) {
  return style([
    {
      '-webkit-transition-duration': data.currentDuration + 'ms',
      'transition-duration': data.currentDuration + 'ms',
    },
    data.display ? null : 'display: none',
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

  