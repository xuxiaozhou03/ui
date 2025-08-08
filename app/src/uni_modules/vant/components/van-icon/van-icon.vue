
  <template>
   <wxs src="./index.wxs" module="computed" />

<view
  class="{{ computed.rootClass({ classPrefix, name }) }}"
  style="{{ computed.rootStyle({ customStyle, color, size }) }}"
  bindtap="onClick"
>
  <van-info
    wx:if="{{ info !== null || dot }}"
    dot="{{ dot }}"
    info="{{ info }}"
    custom-class="van-icon__info info-class"
  />
  <image
    wx:if="{{ computed.isImage(name) }}"
    src="{{ name }}"
    mode="aspectFit"
    class="van-icon__image"
  />
</view>

  </template>
  <script lang="ts" setup>
  import { VantComponent } from '../common/component';

VantComponent({
  classes: ['info-class'],
  props: {
    dot: Boolean,
    info: null,
    size: null,
    color: String,
    customStyle: String,
    classPrefix: {
      type: String,
      value: 'van-icon',
    },
    name: String,
  },

  methods: {
    onClick() {
      this.$emit('click');
    },
  },
});

  // 以下代码转换为 computed 属性 
 /* eslint-disable */
var style = require('../wxs/style.wxs');
var addUnit = require('../wxs/add-unit.wxs');

function isImage(name) {
  return name.indexOf('/') !== -1;
}

function rootClass(data) {
  var classes = ['custom-class'];

  if (data.classPrefix !== 'van-icon') {
    classes.push('van-icon--custom')
  }

  if (data.classPrefix != null) {
    classes.push(data.classPrefix);
  }

  if (isImage(data.name)) {
    classes.push('van-icon--image');
  } else if (data.classPrefix != null) {
    classes.push(data.classPrefix + '-' + data.name);
  }

  return classes.join(' ');
}

function rootStyle(data) {
  return style([
    {
      color: data.color,
      'font-size': addUnit(data.size),
    },
    data.customStyle,
  ]);
}

module.exports = {
  isImage: isImage,
  rootClass: rootClass,
  rootStyle: rootStyle,
};

  </script>
  
<style>
@import "./style.css";
</style>

  