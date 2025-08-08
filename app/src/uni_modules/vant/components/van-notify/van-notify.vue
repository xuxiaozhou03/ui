
  <template>
   <wxs src="../wxs/utils.wxs" module="utils" />
<wxs src="./index.wxs" module="computed" />

<van-transition
  name="slide-down"
  show="{{ show }}"
  custom-class="van-notify__container"
  custom-style="{{ computed.rootStyle({ zIndex, top }) }}"
  bind:tap="onTap"
>
  <view
    class="van-notify van-notify--{{ type }}"
    style="{{ computed.notifyStyle({ background, color }) }}"
  >
    <view
      wx:if="{{ safeAreaInsetTop }}"
      style="height: {{ statusBarHeight }}px"
    />
    <text>{{ message }}</text>
  </view>
</van-transition>

  </template>
  <script lang="ts" setup>
  import { VantComponent } from '../common/component';
import { WHITE } from '../common/color';
import { getSystemInfoSync } from '../common/utils';

VantComponent({
  props: {
    message: String,
    background: String,
    type: {
      type: String,
      value: 'danger',
    },
    color: {
      type: String,
      value: WHITE,
    },
    duration: {
      type: Number,
      value: 3000,
    },
    zIndex: {
      type: Number,
      value: 110,
    },
    safeAreaInsetTop: {
      type: Boolean,
      value: false,
    },
    top: null,
  },

  data: {
    show: false,
    onOpened: (null as unknown) as () => void,
    onClose: (null as unknown) as () => void,
    onClick: (null as unknown) as (detail: Record<string, null>) => void,
  },

  created() {
    const { statusBarHeight } = getSystemInfoSync();
    this.setData({ statusBarHeight });
  },

  methods: {
    show() {
      const { duration, onOpened } = this.data;

      clearTimeout(this.timer);
      this.setData({ show: true });

      wx.nextTick(onOpened);

      if (duration > 0 && duration !== Infinity) {
        this.timer = setTimeout(() => {
          this.hide();
        }, duration);
      }
    },

    hide() {
      const { onClose } = this.data;

      clearTimeout(this.timer);
      this.setData({ show: false });

      wx.nextTick(onClose);
    },

    onTap(event: WechatMiniprogram.TouchEvent) {
      const { onClick } = this.data;
      if (onClick) {
        onClick(event.detail);
      }
    },
  },
});

  // 以下代码转换为 computed 属性 
 /* eslint-disable */
var style = require('../wxs/style.wxs');
var addUnit = require('../wxs/add-unit.wxs');

function rootStyle(data) {
  return style({
    'z-index': data.zIndex,
    top: addUnit(data.top),
  });
}

function notifyStyle(data) {
  return style({
    background: data.background,
    color: data.color,
  });
}

module.exports = {
  rootStyle: rootStyle,
  notifyStyle: notifyStyle,
};

  </script>
  
<style>
@import "./style.css";
</style>

  