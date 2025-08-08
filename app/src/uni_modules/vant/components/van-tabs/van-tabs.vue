
  <template>
   <wxs src="../wxs/utils.wxs" module="utils" />
<wxs src="./index.wxs" module="computed" />

<view class="custom-class {{ utils.bem('tabs') }}">
  <van-sticky
    disabled="{{ !sticky }}"
    z-index="{{ zIndex }}"
    offset-top="{{ offsetTop }}"
    container="{{ container }}"
    bind:scroll="onTouchScroll"
  >
    <view class="{{ utils.bem('tabs--') + type }} {{ utils.bem('tabs__wrap', { scrollable }) }} {{ type === 'line' && border ? 'van-hairline--top-bottom' : '' }} wrap-class">
      <slot name="nav-left" />

      <scroll-view
        scroll-x="{{ scrollable }}"
        scroll-with-animation="{{ scrollWithAnimation }}"
        scroll-left="{{ scrollLeft }}"
        class="{{ utils.bem('tabs__scroll', [type]) }}"
        style="{{ color ? 'border-color: ' + color : '' }}"
      >
        <view class="{{ utils.bem('tabs__nav', [type, { complete: !ellipsis }]) }} nav-class" style="{{ computed.navStyle(color, type) }}">
          <view wx:if="{{ type === 'line' }}" class="van-tabs__line" style="{{ computed.lineStyle({ color, lineOffsetLeft, lineHeight, skipTransition, duration, lineWidth, inited }) }}" />
          <view
            wx:for="{{ tabs }}"
            wx:key="index"
            data-index="{{ index }}"
            class="{{ computed.tabClass(index === currentIndex, ellipsis) }} {{ utils.bem('tab', { active: index === currentIndex, disabled: item.disabled, complete: !ellipsis }) }}"
            style="{{ computed.tabStyle({ active: index === currentIndex, ellipsis, color, type, disabled: item.disabled, titleActiveColor, titleInactiveColor, swipeThreshold, scrollable }) }}"
            bind:tap="onTap"
          >
            <view class="{{ ellipsis ? 'van-ellipsis' : '' }}" style="{{ item.titleStyle }}">
              {{ item.title }}
              <van-info
                wx:if="{{ item.info !== null || item.dot }}"
                info="{{ item.info }}"
                dot="{{ item.dot }}"
                custom-class="van-tab__title__info"
              />
            </view>
          </view>
        </view>
      </scroll-view>

      <slot name="nav-right" />
    </view>
  </van-sticky>

  <view
    class="van-tabs__content"
    bind:touchstart="onTouchStart"
    bind:touchmove="onTouchMove"
    bind:touchend="onTouchEnd"
    bind:touchcancel="onTouchEnd"
  >
    <view
      class="{{ utils.bem('tabs__track', [{ animated }]) }} van-tabs__track"
      style="{{ computed.trackStyle({ duration, currentIndex, animated }) }}"
    >
      <slot />
    </view>
  </view>
</view>

  </template>
  <script lang="ts" setup>
  import { VantComponent } from '../common/component';
import { touch } from '../mixins/touch';
import {
  getAllRect,
  getRect,
  groupSetData,
  nextTick,
  requestAnimationFrame,
} from '../common/utils';
import { isDef } from '../common/validator';
import { useChildren } from '../common/relation';

type TrivialInstance = WechatMiniprogram.Component.TrivialInstance;

VantComponent({
  mixins: [touch],

  classes: [
    'nav-class',
    'tab-class',
    'tab-active-class',
    'line-class',
    'wrap-class',
  ],

  relation: useChildren('tab', function () {
    this.updateTabs();
  }),

  props: {
    sticky: Boolean,
    border: Boolean,
    swipeable: Boolean,
    titleActiveColor: String,
    titleInactiveColor: String,
    color: String,
    animated: {
      type: Boolean,
      observer() {
        this.children.forEach((child, index) =>
          child.updateRender(index === this.data.currentIndex, this)
        );
      },
    },
    lineWidth: {
      type: null,
      value: 40,
      observer: 'resize',
    },
    lineHeight: {
      type: null,
      value: -1,
    },
    active: {
      type: null,
      value: 0,
      observer(name) {
        if (name !== this.getCurrentName()) {
          this.setCurrentIndexByName(name);
        }
      },
    },
    type: {
      type: String,
      value: 'line',
    },
    ellipsis: {
      type: Boolean,
      value: true,
    },
    duration: {
      type: Number,
      value: 0.3,
    },
    zIndex: {
      type: Number,
      value: 1,
    },
    swipeThreshold: {
      type: Number,
      value: 5,
      observer(value) {
        this.setData({
          scrollable: this.children.length > value || !this.data.ellipsis,
        });
      },
    },
    offsetTop: {
      type: Number,
      value: 0,
    },
    lazyRender: {
      type: Boolean,
      value: true,
    },
    useBeforeChange: {
      type: Boolean,
      value: false,
    },
  },

  data: {
    tabs: [] as Record<string, unknown>[],
    scrollLeft: 0,
    scrollable: false,
    currentIndex: 0,
    container: null as unknown as () => WechatMiniprogram.NodesRef,
    skipTransition: true,
    scrollWithAnimation: false,
    lineOffsetLeft: 0,
    inited: false,
  },

  mounted() {
    requestAnimationFrame(() => {
      this.swiping = true;
      this.setData({
        container: () => this.createSelectorQuery().select('.van-tabs'),
      });

      this.resize();
      this.scrollIntoView();
    });
  },

  methods: {
    updateTabs() {
      const { children = [], data } = this;
      this.setData({
        tabs: children.map((child: TrivialInstance) => child.data),
        scrollable:
          this.children.length > data.swipeThreshold || !data.ellipsis,
      });

      this.setCurrentIndexByName(data.active || this.getCurrentName());
    },

    trigger(eventName: string, child?: TrivialInstance) {
      const { currentIndex } = this.data;

      const data = this.getChildData(currentIndex, child);

      if (!isDef(data)) {
        return;
      }

      this.$emit(eventName, data);
    },

    onTap(event: WechatMiniprogram.TouchEvent) {
      const { index } = event.currentTarget.dataset;
      const child = this.children[index];

      if (child.data.disabled) {
        this.trigger('disabled', child);
        return;
      }

      this.onBeforeChange(index).then(() => {
        this.setCurrentIndex(index);
        nextTick(() => {
          this.trigger('click');
        });
      });
    },

    // correct the index of active tab
    setCurrentIndexByName(name) {
      const { children = [] } = this;
      const matched = children.filter(
        (child: TrivialInstance) => child.getComputedName() === name
      );

      if (matched.length) {
        this.setCurrentIndex(matched[0].index);
      }
    },

    setCurrentIndex(currentIndex) {
      const { data, children = [] } = this;

      if (
        !isDef(currentIndex) ||
        currentIndex >= children.length ||
        currentIndex < 0
      ) {
        return;
      }

      groupSetData(this, () => {
        children.forEach((item: TrivialInstance, index: number) => {
          const active = index === currentIndex;
          if (active !== item.data.active || !item.inited) {
            item.updateRender(active, this);
          }
        });
      });

      if (currentIndex === data.currentIndex) {
        if (!data.inited) {
          this.resize();
        }
        return;
      }

      const shouldEmitChange = data.currentIndex !== null;
      this.setData({ currentIndex });

      requestAnimationFrame(() => {
        this.resize();
        this.scrollIntoView();
      });

      nextTick(() => {
        this.trigger('input');
        if (shouldEmitChange) {
          this.trigger('change');
        }
      });
    },

    getCurrentName() {
      const activeTab = this.children[this.data.currentIndex];

      if (activeTab) {
        return activeTab.getComputedName();
      }
    },

    resize() {
      if (this.data.type !== 'line') {
        return;
      }

      const { currentIndex, ellipsis, skipTransition } = this.data;

      Promise.all([
        getAllRect(this, '.van-tab'),
        getRect(this, '.van-tabs__line'),
      ]).then(([rects = [], lineRect]) => {
        const rect = rects[currentIndex];

        if (rect == null) {
          return;
        }

        let lineOffsetLeft = rects
          .slice(0, currentIndex)
          .reduce((prev, curr) => prev + curr.width, 0);

        lineOffsetLeft +=
          (rect.width - lineRect.width) / 2 + (ellipsis ? 0 : 8);

        this.setData({ lineOffsetLeft, inited: true });
        this.swiping = true;

        if (skipTransition) {
          // waiting transition end
          setTimeout(() => {
            this.setData({ skipTransition: false });
          }, this.data.duration);
        }
      });
    },

    // scroll active tab into view
    scrollIntoView() {
      const { currentIndex, scrollable, scrollWithAnimation } = this.data;

      if (!scrollable) {
        return;
      }

      Promise.all([
        getAllRect(this, '.van-tab'),
        getRect(this, '.van-tabs__nav'),
      ]).then(([tabRects, navRect]) => {
        const tabRect = tabRects[currentIndex];
        const offsetLeft = tabRects
          .slice(0, currentIndex)
          .reduce((prev, curr) => prev + curr.width, 0);

        this.setData({
          scrollLeft: offsetLeft - (navRect.width - tabRect.width) / 2,
        });

        if (!scrollWithAnimation) {
          nextTick(() => {
            this.setData({ scrollWithAnimation: true });
          });
        }
      });
    },

    onTouchScroll(event: WechatMiniprogram.CustomEvent) {
      this.$emit('scroll', event.detail);
    },

    onTouchStart(event: WechatMiniprogram.TouchEvent) {
      if (!this.data.swipeable) return;
      this.swiping = true;

      this.touchStart(event);
    },

    onTouchMove(event: WechatMiniprogram.TouchEvent) {
      if (!this.data.swipeable || !this.swiping) return;

      this.touchMove(event);
    },

    // watch swipe touch end
    onTouchEnd() {
      if (!this.data.swipeable || !this.swiping) return;

      const { direction, deltaX, offsetX } = this;
      const minSwipeDistance = 50;

      if (direction === 'horizontal' && offsetX >= minSwipeDistance) {
        const index = this.getAvaiableTab(deltaX);
        if (index !== -1) {
          this.onBeforeChange(index).then(() => this.setCurrentIndex(index));
        }
      }

      this.swiping = false;
    },

    getAvaiableTab(direction: number) {
      const { tabs, currentIndex } = this.data;
      const step = direction > 0 ? -1 : 1;

      for (
        let i = step;
        currentIndex + i < tabs.length && currentIndex + i >= 0;
        i += step
      ) {
        const index = currentIndex + i;

        if (
          index >= 0 &&
          index < tabs.length &&
          tabs[index] &&
          !tabs[index].disabled
        ) {
          return index;
        }
      }

      return -1;
    },
    onBeforeChange(index: number): Promise<void> {
      const { useBeforeChange } = this.data;

      if (!useBeforeChange) {
        return Promise.resolve();
      }

      return new Promise((resolve, reject) => {
        this.$emit('before-change', {
          ...this.getChildData(index),
          callback: (status) => (status ? resolve() : reject()),
        });
      });
    },
    getChildData(index: number, child?: TrivialInstance) {
      const currentChild = child || this.children[index];

      if (!isDef(currentChild)) {
        return;
      }

      return {
        index: currentChild.index,
        name: currentChild.getComputedName(),
        title: currentChild.data.title,
      };
    },
  },
});

  // 以下代码转换为 computed 属性 
 /* eslint-disable */
var utils = require('../wxs/utils.wxs');
var style = require('../wxs/style.wxs');

function tabClass(active, ellipsis) {
  var classes = ['tab-class'];

  if (active) {
    classes.push('tab-active-class');
  }

  if (ellipsis) {
    classes.push('van-ellipsis');
  }

  return classes.join(' ');
}

function tabStyle(data) {
  var titleColor = data.active
    ? data.titleActiveColor
    : data.titleInactiveColor;

  var ellipsis = data.scrollable && data.ellipsis;

  // card theme color
  if (data.type === 'card') {
    return style({
      'border-color': data.color,
      'background-color': !data.disabled && data.active ? data.color : null,
      color: titleColor || (!data.disabled && !data.active ? data.color : null),
      'flex-basis': ellipsis ? 88 / data.swipeThreshold + '%' : null,
    });
  }

  return style({
    color: titleColor,
    'flex-basis': ellipsis ? 88 / data.swipeThreshold + '%' : null,
  });
}

function navStyle(color, type) {
  return style({
    'border-color': type === 'card' && color ? color : null,
  });
}

function trackStyle(data) {
  if (!data.animated) {
    return '';
  }

  return style({
    left: -100 * data.currentIndex + '%',
    'transition-duration': data.duration + 's',
    '-webkit-transition-duration': data.duration + 's',
  });
}

function lineStyle(data) {
  return style({
    width: utils.addUnit(data.lineWidth),
    opacity: data.inited ? 1 : 0,
    transform: 'translateX(' + data.lineOffsetLeft + 'px)',
    '-webkit-transform': 'translateX(' + data.lineOffsetLeft + 'px)',
    'background-color': data.color,
    height: data.lineHeight !== -1 ? utils.addUnit(data.lineHeight) : null,
    'border-radius':
      data.lineHeight !== -1 ? utils.addUnit(data.lineHeight) : null,
    'transition-duration': !data.skipTransition ? data.duration + 's' : null,
    '-webkit-transition-duration': !data.skipTransition
      ? data.duration + 's'
      : null,
  });
}

module.exports = {
  tabClass: tabClass,
  tabStyle: tabStyle,
  trackStyle: trackStyle,
  lineStyle: lineStyle,
  navStyle: navStyle,
};

  </script>
  
<style>
@import "./style.css";
</style>

  