
  <template>
   <wxs src="../wxs/utils.wxs" module="utils" />

<view
  wx:if="{{ info !== null && info !== '' || dot }}"
  class="van-info {{ utils.bem('info', { dot }) }} custom-class"
  style="{{ customStyle }}"
>{{ dot ? '' : info }}</view>

  </template>
  <script lang="ts" setup>
  import { VantComponent } from '../common/component';

VantComponent({
  props: {
    dot: Boolean,
    info: null,
    customStyle: String,
  },
});

  
  </script>
  
<style>
@import "./style.css";
</style>

  