
    <template>
    

<view class="van-config-provider" style="{{ computed.mapThemeVarsToCSSVars(themeVars) }}">
  <slot />
</view>

    </template>
    <script lang="ts" setup>
    import { cn, bem, commonProps } from "../../utils";
    import { VantComponent } from '../common/component';

VantComponent({
  props: {
    themeVars: {
      type: Object,
      value: {},
    },
  },
});


    // 把下面代码变成 computed 属性
    
var object = require('../wxs/object.wxs');


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
    <style>
    
    </style>
  