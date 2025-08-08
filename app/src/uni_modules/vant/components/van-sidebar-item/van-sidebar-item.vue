
  <template>
   <wxs src="../wxs/utils.wxs" module="utils" />

<view
  class="{{ utils.bem('sidebar-item', { selected, disabled }) }} {{ selected ? 'active-class' : '' }} {{ disabled ? 'disabled-class' : '' }} custom-class"
  hover-class="van-sidebar-item--hover"
  hover-stay-time="70"
  bind:tap="onClick"
>
  <view class="van-sidebar-item__text">
    <van-info
      wx:if="{{ badge != null || info !== null || dot }}"
      dot="{{ dot }}"
      info="{{ badge != null ? badge : info }}"
    />
    <view wx:if="{{ title }}">{{ title }}</view>
    <slot wx:else name="title" />
  </view>
</view>

  </template>
  <script lang="ts" setup>
  import { VantComponent } from '../common/component';
import { useParent } from '../common/relation';

VantComponent({
  classes: ['active-class', 'disabled-class'],

  relation: useParent('sidebar'),

  props: {
    dot: Boolean,
    badge: null,
    info: null,
    title: String,
    disabled: Boolean,
  },

  methods: {
    onClick() {
      const { parent } = this;

      if (!parent || this.data.disabled) {
        return;
      }

      const index = parent.children.indexOf(this);

      parent.setActive(index).then(() => {
        this.$emit('click', index);
        parent.$emit('change', index);
      });
    },

    setActive(selected: boolean) {
      return this.setData({ selected });
    },
  },
});

  
  </script>
  
<style>
@import "./style.css";
</style>

  