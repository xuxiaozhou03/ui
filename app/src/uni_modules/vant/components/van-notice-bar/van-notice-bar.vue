
  <template>
   <wxs src="../wxs/utils.wxs" module="utils" />
<wxs src="./index.wxs" module="computed" />

<view
  wx:if="{{ show }}"
  class="custom-class {{ utils.bem('notice-bar', { withicon: mode, wrapable }) }}"
  style="{{ computed.rootStyle({ color, backgroundColor, background }) }}"
  bind:tap="onClick"
>
  <van-icon
    wx:if="{{ leftIcon }}"
    name="{{ leftIcon }}"
    class="van-notice-bar__left-icon"
  />
  <slot wx:else name="left-icon" />

  <view class="van-notice-bar__wrap">
    <view class="van-notice-bar__content {{ scrollable === false && !wrapable ? 'van-ellipsis' : '' }}" animation="{{ animationData }}">
      {{ text }}
      <slot wx:if="{{ !text }}"></slot>
    </view>
  </view>

  <van-icon
    wx:if="{{ mode === 'closeable' }}"
    class="van-notice-bar__right-icon"
    name="cross"
    catch:tap="onClickIcon"
  />
  <navigator
    wx:elif="{{ mode === 'link' }}"
    url="{{ url }}"
    open-type="{{ openType }}"
  >
    <van-icon class="van-notice-bar__right-icon" name="arrow" />
  </navigator>
  <slot wx:else name="right-icon" />
</view>

  </template>
  <script lang="ts" setup>
  import { VantComponent } from '../common/component';
import { getRect, requestAnimationFrame } from '../common/utils';

VantComponent({
  props: {
    text: {
      type: String,
      value: '',
      observer: 'init',
    },
    mode: {
      type: String,
      value: '',
    },
    url: {
      type: String,
      value: '',
    },
    openType: {
      type: String,
      value: 'navigate',
    },
    delay: {
      type: Number,
      value: 1,
    },
    speed: {
      type: Number,
      value: 60,
      observer: 'init',
    },
    scrollable: null,
    leftIcon: {
      type: String,
      value: '',
    },
    color: String,
    backgroundColor: String,
    background: String,
    wrapable: Boolean,
  },

  data: {
    show: true,
  },

  created() {
    this.resetAnimation = wx.createAnimation({
      duration: 0,
      timingFunction: 'linear',
    });
  },

  destroyed() {
    this.timer && clearTimeout(this.timer);
  },

  mounted() {
    this.init();
  },

  methods: {
    init() {
      requestAnimationFrame(() => {
        Promise.all([
          getRect(this, '.van-notice-bar__content'),
          getRect(this, '.van-notice-bar__wrap'),
        ]).then((rects) => {
          const [contentRect, wrapRect] = rects;
          const { speed, scrollable, delay } = this.data;
          if (
            contentRect == null ||
            wrapRect == null ||
            !contentRect.width ||
            !wrapRect.width ||
            scrollable === false
          ) {
            return;
          }

          if (scrollable || wrapRect.width < contentRect.width) {
            const duration =
              ((wrapRect.width + contentRect.width) / speed) * 1000;

            this.wrapWidth = wrapRect.width;
            this.contentWidth = contentRect.width;
            this.duration = duration;
            this.animation = wx.createAnimation({
              duration,
              timingFunction: 'linear',
              delay,
            });

            this.scroll(true);
          }
        });
      });
    },

    scroll(isInit = false) {
      this.timer && clearTimeout(this.timer);
      this.timer = null;

      this.setData({
        animationData: this.resetAnimation
          .translateX(isInit ? 0 : this.wrapWidth)
          .step()
          .export(),
      });

      requestAnimationFrame(() => {
        this.setData({
          animationData: this.animation
            .translateX(-this.contentWidth)
            .step()
            .export(),
        });
      });

      this.timer = setTimeout(() => {
        this.scroll();
      }, this.duration + this.data.delay);
    },

    onClickIcon(event) {
      if (this.data.mode === 'closeable') {
        this.timer && clearTimeout(this.timer);
        this.timer = null;

        this.setData({ show: false });
        this.$emit('close', event.detail);
      }
    },

    onClick(event: WechatMiniprogram.TouchEvent) {
      this.$emit('click', event);
    },
  },
});

  // 以下代码转换为 computed 属性 
 /* eslint-disable */
var style = require('../wxs/style.wxs');
var addUnit = require('../wxs/add-unit.wxs');

function rootStyle(data) {
  return style({
    color: data.color,
    'background-color': data.backgroundColor,
    background: data.background,
  });
}

module.exports = {
  rootStyle: rootStyle,
};

  </script>
  
<style>
@import "./style.css";
</style>

  