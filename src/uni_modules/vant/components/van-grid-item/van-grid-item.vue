<template>
  <div
    :class="[props.customClass, bem('grid-item', { square: props.square })]"
    :style="wrapperStyle"
    @click="onClick"
  >
    <div
      :class="[
        'content-class',
        bem('grid-item__content', [props.direction, {
          center: props.center,
          square: props.square,
          reverse: props.reverse,
          clickable: props.clickable,
          surround: props.border && props.gutter,
        }]),
        props.border ? 'van-hairline--surround' : ''
      ]"
      :style="contentStyle"
    >
      <template v-if="props.useSlot">
        <slot />
      </template>
      <template v-else>
        <div class="van-grid-item__icon icon-class">
          <van-icon
            v-if="props.icon"
            :name="props.icon"
            :color="props.iconColor"
            :class-prefix="props.iconPrefix"
            :dot="props.dot"
            :info="props.badge || props.info"
            :size="props.iconSize"
          />
          <slot v-else name="icon" />
        </div>
        <div class="van-grid-item__text text-class">
          <span v-if="props.text">{{ props.text }}</span>
          <slot v-else name="text" />
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { gridItemProps } from './props';
import { bem, addUnit } from '../../utils';

const props = defineProps(gridItemProps);
const emit = defineEmits(['click']);

const wrapperStyle = computed(() => {
  const width = 100 / (props.columnNum || 1) + '%';
  return {
    width,
    paddingTop: props.square ? width : undefined,
    paddingRight: props.gutter ? addUnit(props.gutter) : undefined,
    marginTop:
      props.index !== undefined && props.index >= (props.columnNum || 1) && !props.square
        ? addUnit(props.gutter)
        : undefined,
  };
});

const contentStyle = computed(() => {
  return props.square
    ? {
        right: addUnit(props.gutter),
        bottom: addUnit(props.gutter),
        height: 'auto',
      }
    : undefined;
});

function onClick(event: Event) {
  emit('click', event);
  // 如需跳转链接可在此补充
}
</script>

<style>
.van-grid-item{box-sizing:border-box;float:left;position:relative}.van-grid-item--square{height:0}.van-grid-item__content{background-color:var(--grid-item-content-background-color,#fff);box-sizing:border-box;display:flex;flex-direction:column;height:100%;padding:var(--grid-item-content-padding,16px 8px)}.van-grid-item__content:after{border-width:0 1px 1px 0;z-index:1}.van-grid-item__content--surround:after{border-width:1px}.van-grid-item__content--center{align-items:center;justify-content:center}.van-grid-item__content--square{left:0;position:absolute;right:0;top:0}.van-grid-item__content--horizontal{flex-direction:row}.van-grid-item__content--horizontal .van-grid-item__text{margin:0 0 0 8px}.van-grid-item__content--reverse{flex-direction:column-reverse}.van-grid-item__content--reverse .van-grid-item__text{margin:0 0 8px}.van-grid-item__content--horizontal.van-grid-item__content--reverse{flex-direction:row-reverse}.van-grid-item__content--horizontal.van-grid-item__content--reverse .van-grid-item__text{margin:0 8px 0 0}.van-grid-item__content--clickable:active{background-color:var(--grid-item-content-active-color,#f2f3f5)}.van-grid-item__icon{align-items:center;display:flex;font-size:var(--grid-item-icon-size,26px);height:var(--grid-item-icon-size,26px)}.van-grid-item__text{word-wrap:break-word;color:var(--grid-item-text-color,#646566);font-size:var(--grid-item-text-font-size,12px)}.van-grid-item__icon+.van-grid-item__text{margin-top:8px}
</style>
