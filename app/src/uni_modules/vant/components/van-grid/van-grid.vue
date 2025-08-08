
  <template>
   <wxs src="./index.wxs" module="computed" />

<view
  class="van-grid custom-class {{ border && !gutter ? 'van-hairline--top' : '' }}"
  style="{{ computed.rootStyle({ gutter }) }}"
>
  <slot />
</view>

  </template>
  <script lang="ts" setup>
  import { VantComponent } from '../common/component';
import { useChildren } from '../common/relation';

VantComponent({
  relation: useChildren('grid-item'),

  props: {
    square: {
      type: Boolean,
      observer: 'updateChildren',
    },
    gutter: {
      type: null,
      value: 0,
      observer: 'updateChildren',
    },
    clickable: {
      type: Boolean,
      observer: 'updateChildren',
    },
    columnNum: {
      type: Number,
      value: 4,
      observer: 'updateChildren',
    },
    center: {
      type: Boolean,
      value: true,
      observer: 'updateChildren',
    },
    border: {
      type: Boolean,
      value: true,
      observer: 'updateChildren',
    },
    direction: {
      type: String,
      observer: 'updateChildren',
    },
    iconSize: {
      type: String,
      observer: 'updateChildren',
    },
    reverse: {
      type: Boolean,
      value: false,
      observer: 'updateChildren',
    },
  },

  methods: {
    updateChildren() {
      this.children.forEach((child) => {
        child.updateStyle();
      });
    },
  },
});

  // 以下代码转换为 computed 属性 
 /* eslint-disable */
var style = require('../wxs/style.wxs');
var addUnit = require('../wxs/add-unit.wxs');

function rootStyle(data) {
  return style({
    'padding-left': addUnit(data.gutter),
  });
}

module.exports = {
  rootStyle: rootStyle,
};

  </script>
  
<style>
@import "./style.css";
</style>

  