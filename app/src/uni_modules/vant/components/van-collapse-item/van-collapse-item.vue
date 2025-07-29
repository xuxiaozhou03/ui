<template>
  <wxs src="../wxs/utils.wxs" module="utils" />

<view class="van-collapse-item custom-class {{ index !== 0 ? 'van-hairline--top' : '' }}">
  <van-cell
    size="{{ size }}"
    title="{{ title }}"
    title-class="title-class"
    icon="{{ icon }}"
    value="{{ value }}"
    label="{{ label }}"
    is-link="{{ isLink }}"
    clickable="{{ clickable }}"
    border="{{ border && expanded }}"
    class="{{ utils.bem('collapse-item__title', { disabled, expanded }) }}"
    right-icon-class="van-cell__right-icon"
    custom-class="van-cell"
    hover-class="van-cell--hover"
    bind:click="onClick"
  >
    <slot
      name="title"
      slot="title"
    />
    <slot
      name="icon"
      slot="icon"
    />
    <slot name="value" />
    <slot
      name="right-icon"
      slot="right-icon"
    />
  </van-cell>
  <view
    class="{{ utils.bem('collapse-item__wrapper') }}"
    style="height: 0;"
    animation="{{ animation }}"
  >
    <view
      class="van-collapse-item__content content-class"
    >
      <slot />
    </view>
  </view>
</view>

</template>
<script lang="ts" setup>
  import { VantComponent } from '../common/component';
import { useParent } from '../common/relation';
import { setContentAnimate } from './animate';

VantComponent({
  classes: ['title-class', 'content-class'],

  relation: useParent('collapse'),

  props: {
    size: String,
    name: null,
    title: null,
    value: null,
    icon: String,
    label: String,
    disabled: Boolean,
    clickable: Boolean,
    border: {
      type: Boolean,
      value: true,
    },
    isLink: {
      type: Boolean,
      value: true,
    },
  },

  data: {
    expanded: false,
  },

  mounted() {
    this.updateExpanded();
    this.mounted = true;
  },

  methods: {
    updateExpanded() {
      if (!this.parent) {
        return;
      }

      const { value, accordion } = this.parent.data;
      const { children = [] } = this.parent;
      const { name } = this.data;

      const index = children.indexOf(this);
      const currentName = name == null ? index : name;

      const expanded = accordion
        ? value === currentName
        : (value || []).some((name: string | number) => name === currentName);

      if (expanded !== this.data.expanded) {
        setContentAnimate(this, expanded, this.mounted);
      }

      this.setData({ index, expanded });
    },

    onClick() {
      if (this.data.disabled) {
        return;
      }

      const { name, expanded } = this.data;
      const index = this.parent.children.indexOf(this);
      const currentName = name == null ? index : name;

      this.parent.switch(currentName, !expanded);
    },
  },
});

  // 转换为 Vue 3 的 computed 属性
  
</script>
<style>
  @import '../common/index.wxss';.van-collapse-item__title .van-cell__right-icon{transform:rotate(90deg);transition:transform var(--collapse-item-transition-duration,.3s)}.van-collapse-item__title--expanded .van-cell__right-icon{transform:rotate(-90deg)}.van-collapse-item__title--disabled .van-cell,.van-collapse-item__title--disabled .van-cell__right-icon{color:var(--collapse-item-title-disabled-color,#c8c9cc)!important}.van-collapse-item__title--disabled .van-cell--hover{background-color:#fff!important}.van-collapse-item__wrapper{overflow:hidden}.van-collapse-item__content{background-color:var(--collapse-item-content-background-color,#fff);color:var(--collapse-item-content-text-color,#969799);font-size:var(--collapse-item-content-font-size,13px);line-height:var(--collapse-item-content-line-height,1.5);padding:var(--collapse-item-content-padding,15px)}
</style>
