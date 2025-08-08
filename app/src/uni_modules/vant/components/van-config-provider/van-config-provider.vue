
  <template>
   <wxs src="./index.wxs" module="computed" />

<view class="van-config-provider" style="{{ computed.mapThemeVarsToCSSVars(themeVars) }}">
  <slot />
</view>

  </template>
  <script lang="ts" setup>
  import { VantComponent } from '../common/component';

VantComponent({
  props: {
    themeVars: {
      type: Object,
      value: {},
    },
  },
});

  // 以下代码转换为 computed 属性 
 /* eslint-disable */
var object = require('../wxs/object.wxs');
var style = require('../wxs/style.wxs');

function kebabCase(word) {
  var newWord = word
    .replace(getRegExp("[A-Z]", 'g'), function (i) {
      return '-' + i;
    })
    .toLowerCase()
    .replace(getRegExp("^-"), '');

  return newWord;
}

function mapThemeVarsToCSSVars(themeVars) {
  var cssVars = {};
  object.keys(themeVars).forEach(function (key) {
    var cssVarsKey = '--' + kebabCase(key);
    cssVars[cssVarsKey] = themeVars[key];
  });

  return style(cssVars);
}

module.exports = {
  kebabCase: kebabCase,
  mapThemeVarsToCSSVars: mapThemeVarsToCSSVars,
};

  </script>
  
  