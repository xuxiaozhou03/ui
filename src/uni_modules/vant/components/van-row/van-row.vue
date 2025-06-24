
    <template>
    

<view class="van-row custom-class" style="{{ computed.rootStyle({ gutter }) }}">
  <slot />
</view>

    </template>
    <script lang="ts" setup>
    import { cn, bem, commonProps } from "../../utils";
    import { VantComponent } from '../common/component';
import { useChildren } from '../common/relation';

VantComponent({
  relation: useChildren('col', function (target) {
    const { gutter } = this.data;

    if (gutter) {
      target.setData({ gutter });
    }
  }),

  props: {
    gutter: {
      type: Number,
      observer: 'setGutter',
    },
  },

  methods: {
    setGutter() {
      this.children.forEach((col) => {
        col.setData(this.data);
      });
    },
  },
});


    // 把下面代码变成 computed 属性
    



function rootStyle(data) {
  if (!data.gutter) {
    return '';
  }

  return style({
    'margin-right': addUnit(-data.gutter / 2),
    'margin-left': addUnit(-data.gutter / 2),
  });
}

module.exports = {
  rootStyle: rootStyle,
};

    </script>
    <style>
    .van-row:after{clear:both;content:"";display:table}
    </style>
  