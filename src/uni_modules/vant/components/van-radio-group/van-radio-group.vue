
    <template>
    

<view class="{{ utils.bem('radio-group', [direction]) }}">
  <slot></slot>
</view>

    </template>
    <script lang="ts" setup>
    import { cn, bem, commonProps } from "../../utils";
    import { VantComponent } from '../common/component';
import { useChildren } from '../common/relation';

VantComponent({
  field: true,

  relation: useChildren('radio'),

  props: {
    value: {
      type: null,
      observer: 'updateChildren',
    },
    direction: String,
    disabled: {
      type: Boolean,
      observer: 'updateChildren',
    },
  },

  methods: {
    updateChildren() {
      this.children.forEach((child) => child.updateFromParent());
    },
  },
});


    
    </script>
    <style>
    .van-radio-group--horizontal{display:flex;flex-wrap:wrap}
    </style>
  