
    <template>
    
<wxs src="../wxs/style.wxs" module="style" />

<view
  class="{{ utils.bem('rate') }} custom-class"
  bind:touchmove="onTouchMove"
>
  <view
    class="{{ utils.bem('rate__item') }}"
    wx:for="{{ innerCountArray }}"
    wx:key="index"
    style="{{ style({ paddingRight: index !== count - 1 ? utils.addUnit(gutter) : null }) }}"
  >
    <van-icon
      name="{{ index + 1 <= innerValue ? icon : voidIcon }}"
      class="{{ utils.bem('rate__icon', [{ disabled, full: index + 1 <= innerValue }])}}"
      style="{{ style({ fontSize: utils.addUnit(size) }) }}"
      custom-class="icon-class"
      data-score="{{ index }}"
      color="{{ disabled ? disabledColor : index + 1 <= innerValue ? color : voidColor }}"
      bind:click="onSelect"
    />

    <van-icon
      wx:if="{{ allowHalf }}"
      name="{{ index + 0.5 <= innerValue ? icon : voidIcon }}"
      class="{{ utils.bem('rate__icon', ['half', { disabled, full: index + 0.5 <= innerValue }]) }}"
      style="{{ style({ fontSize: utils.addUnit(size) }) }}"
      custom-class="icon-class"
      data-score="{{ index - 0.5 }}"
      color="{{ disabled ? disabledColor : index + 0.5 <= innerValue ? color : voidColor }}"
      bind:click="onSelect"
    />
  </view>
</view>

    </template>
    <script lang="ts" setup>
    import { cn, bem, commonProps } from "../../utils";
    import { getAllRect } from '../common/utils';
import { VantComponent } from '../common/component';
import { canIUseModel } from '../common/version';

VantComponent({
  field: true,

  classes: ['icon-class'],

  props: {
    value: {
      type: Number,
      observer(value: number) {
        if (value !== this.data.innerValue) {
          this.setData({ innerValue: value });
        }
      },
    },
    readonly: Boolean,
    disabled: Boolean,
    allowHalf: Boolean,
    size: null,
    icon: {
      type: String,
      value: 'star',
    },
    voidIcon: {
      type: String,
      value: 'star-o',
    },
    color: String,
    voidColor: String,
    disabledColor: String,
    count: {
      type: Number,
      value: 5,
      observer(value: number) {
        this.setData({ innerCountArray: Array.from({ length: value }) });
      },
    },
    gutter: null,
    touchable: {
      type: Boolean,
      value: true,
    },
  },

  data: {
    innerValue: 0,
    innerCountArray: Array.from({ length: 5 }),
  },

  methods: {
    onSelect(event: WechatMiniprogram.CustomEvent) {
      const { data } = this;
      const { score } = event.currentTarget.dataset;
      if (!data.disabled && !data.readonly) {
        this.setData({ innerValue: score + 1 });

        if (canIUseModel()) {
          this.setData({ value: score + 1 });
        }

        wx.nextTick(() => {
          this.$emit('input', score + 1);
          this.$emit('change', score + 1);
        });
      }
    },

    onTouchMove(event: WechatMiniprogram.TouchEvent) {
      const { touchable } = this.data;
      if (!touchable) return;

      const { clientX } = event.touches[0];

      getAllRect(this, '.van-rate__icon').then((list) => {
        const target = list
          .sort((cur, next) => cur.dataset.score - next.dataset.score)
          .find((item) => clientX >= item.left && clientX <= item.right);

        if (target != null) {
          this.onSelect({
            ...event,
            currentTarget: (target as unknown) as WechatMiniprogram.Target,
          });
        }
      });
    },
  },
});


    
    </script>
    <style>
    .van-rate{display:inline-flex;-webkit-user-select:none;user-select:none}.van-rate__item{padding:0 var(--rate-horizontal-padding,2px);position:relative}.van-rate__item:not(:last-child){padding-right:var(--rate-icon-gutter,4px)}.van-rate__icon{color:var(--rate-icon-void-color,#c8c9cc);display:block;font-size:var(--rate-icon-size,20px);height:100%}.van-rate__icon--half{left:var(--rate-horizontal-padding,2px);overflow:hidden;position:absolute;top:0;width:.5em}.van-rate__icon--full,.van-rate__icon--half{color:var(--rate-icon-full-color,#ee0a24)}.van-rate__icon--disabled{color:var(--rate-icon-disabled-color,#c8c9cc)}
    </style>
  