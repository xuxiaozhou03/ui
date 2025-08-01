<template>
  <div
    :class="['van-grid-item', { 'van-grid-item--square': square }, customClass]"
    :style="wrapperStyle"
    @click="onClick"
  >
    <div
      :class="
        cn([
          bem('grid-item__content', [
            direction,
            { center, square, reverse, clickable, surround: border && gutter },
          ]),
          border ? 'van-hairline--surround' : '',
          contentClass,
        ])
      "
      :style="contentStyle"
    >
      <slot v-if="useSlot" />
      <template v-else>
        <div :class="cn('van-grid-item__icon', iconClass)">
          <van-icon
            v-if="icon"
            :name="icon"
            :color="iconColor"
            :class-prefix="iconPrefix"
            :dot="dot"
            :info="badge || info"
            :size="iconSize"
          />
          <slot v-else name="icon" />
        </div>
        <div :class="cn('van-grid-item__text', textClass)">
          <span v-if="text">{{ text }}</span>
          <slot v-else name="text" />
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { CSSProperties } from "vue";
import { addUnit, cn, bem } from "../../utils";
import { gridItemProps } from "./props";
import { useInjectParent } from "../../composables/useRelation";
import { gridKey } from "../van-grid/props";

const props = defineProps(gridItemProps);
const emit = defineEmits<{ (e: "click"): void }>();

const parent = useInjectParent(gridKey);

// const index = computed(() => parent?.children?.indexOf?.(props) ?? 0);
const columnNum = computed(() => parent?.columnNum ?? 4);
const border = computed(() => parent?.border ?? true);
const square = computed(() => parent?.square ?? props.square);
const gutter = computed(() => parent?.gutter ?? 0);
const clickable = computed(() => parent?.clickable ?? false);
const center = computed(() => parent?.center ?? true);
const direction = computed(() => parent?.direction ?? "");
const reverse = computed(() => parent?.reverse ?? false);
const iconSize = computed(() => parent?.iconSize ?? undefined);

const wrapperStyle = computed<CSSProperties>(() => {
  const width = `${100 / columnNum.value}%`;
  return {
    width,
    paddingTop: square.value ? width : undefined,
    paddingRight: addUnit(gutter.value),
    // marginTop:
    //   index.value >= columnNum.value && !square.value
    //     ? addUnit(gutter.value)
    //     : undefined,
  };
});

const contentStyle = computed<CSSProperties>(() => {
  return square.value
    ? {
        right: addUnit(gutter.value),
        bottom: addUnit(gutter.value),
        height: "auto",
      }
    : {};
});

function onClick() {
  emit("click");
}
</script>

<style scoped>
.van-grid-item {
  box-sizing: border-box;
  float: left;
  position: relative;
}
.van-grid-item--square {
  height: 0;
}
.van-grid-item__content {
  background-color: var(--grid-item-content-background-color, #fff);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: var(--grid-item-content-padding, 16px 8px);
}
.van-grid-item__content:after {
  border-width: 0 1px 1px 0;
  z-index: 1;
}
.van-grid-item__content--surround:after {
  border-width: 1px;
}
.van-grid-item__content--center {
  align-items: center;
  justify-content: center;
}
.van-grid-item__content--square {
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
}
.van-grid-item__content--horizontal {
  flex-direction: row;
}
.van-grid-item__content--horizontal .van-grid-item__text {
  margin: 0 0 0 8px;
}
.van-grid-item__content--reverse {
  flex-direction: column-reverse;
}
.van-grid-item__content--reverse .van-grid-item__text {
  margin: 0 0 8px;
}
.van-grid-item__content--horizontal.van-grid-item__content--reverse {
  flex-direction: row-reverse;
}
.van-grid-item__content--horizontal.van-grid-item__content--reverse
  .van-grid-item__text {
  margin: 0 8px 0 0;
}
.van-grid-item__content--clickable:active {
  background-color: var(--grid-item-content-active-color, #f2f3f5);
}
.van-grid-item__icon {
  align-items: center;
  display: flex;
  font-size: var(--grid-item-icon-size, 26px);
  height: var(--grid-item-icon-size, 26px);
}
.van-grid-item__text {
  word-wrap: break-word;
  color: var(--grid-item-text-color, #646566);
  font-size: var(--grid-item-text-font-size, 12px);
}
.van-grid-item__icon + .van-grid-item__text {
  margin-top: 8px;
}
</style>
