<template>
  <div
    class="van-picker-column custom-class"
    :style="rootStyle"
    @touchstart="onTouchStart"
    @touchmove.prevent="onTouchMove"
    @touchend="onTouchEnd"
    @touchcancel="onTouchEnd"
  >
    <div :style="wrapperStyle">
      <div
        v-for="(option, index) in options"
        :key="index"
        :data-index="index"
        :style="{ height: itemHeight + 'px' }"
        :class="[
          'van-ellipsis',
          bem('picker-column__item', {
            disabled: isDisabled(option),
            selected: index === currentIndex,
          }),
          index === currentIndex ? 'active-class' : ''
        ]"
        @click="onClickItem(index)"
      >
        {{ getOptionText(option) }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { pickerColumnProps } from './props';
import { bem, addUnit } from '../../utils';

const props = defineProps(pickerColumnProps);
const emit = defineEmits(['change']);

const DEFAULT_DURATION = 200;

const options = ref(props.initialOptions || []);
const currentIndex = ref(props.defaultIndex || 0);
const offset = ref(0);
const duration = ref(0);
const startY = ref(0);
const startOffset = ref(0);

watch(() => props.initialOptions, (val) => {
  options.value = val || [];
});
watch(() => props.defaultIndex, (val) => {
  setIndex(val);
});

function isObj(x: any) {
  const type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}
function isDisabled(option: any) {
  return isObj(option) && option.disabled;
}
function getOptionText(option: any) {
  return isObj(option) && props.valueKey in option ? option[props.valueKey] : option;
}

function getCount() {
  return options.value.length;
}
function adjustIndex(index: number) {
  const count = getCount();
  index = Math.max(0, Math.min(index, count - 1));
  for (let i = index; i < count; i++) {
    if (!isDisabled(options.value[i])) return i;
  }
  for (let i = index - 1; i >= 0; i--) {
    if (!isDisabled(options.value[i])) return i;
  }
  return 0;
}
function setIndex(index: number, userAction = false) {
  index = adjustIndex(index);
  const newOffset = -index * props.itemHeight;
  if (index !== currentIndex.value) {
    offset.value = newOffset;
    currentIndex.value = index;
    if (userAction) emit('change', index);
  } else {
    offset.value = newOffset;
  }
}
function onClickItem(index: number) {
  setIndex(index, true);
}
function onTouchStart(event: TouchEvent) {
  startY.value = event.touches[0].clientY;
  startOffset.value = offset.value;
  duration.value = 0;
}
function onTouchMove(event: TouchEvent) {
  const deltaY = event.touches[0].clientY - startY.value;
  offset.value = Math.max(
    Math.min(startOffset.value + deltaY, props.itemHeight),
    -(getCount() * props.itemHeight)
  );
}
function onTouchEnd() {
  if (offset.value !== startOffset.value) {
    duration.value = DEFAULT_DURATION;
    const index = Math.max(
      0,
      Math.min(Math.round(-offset.value / props.itemHeight), getCount() - 1)
    );
    setIndex(index, true);
  }
}

const rootStyle = computed(() => ({
  height: addUnit(props.itemHeight * props.visibleItemCount),
}));
const wrapperStyle = computed(() => {
  const y = offset.value + (props.itemHeight * (props.visibleItemCount - 1)) / 2;
  return {
    transition: `transform ${duration.value}ms`,
    lineHeight: addUnit(props.itemHeight),
    transform: `translate3d(0, ${addUnit(y)}, 0)`
  };
});
</script>

<style>
.van-picker-column{color:var(--picker-option-text-color,#000);font-size:var(--picker-option-font-size,16px);overflow:hidden;text-align:center}.van-picker-column__item{padding:0 5px}.van-picker-column__item--selected{color:var(--picker-option-selected-text-color,#323233);font-weight:var(--font-weight-bold,500)}.van-picker-column__item--disabled{opacity:var(--picker-option-disabled-opacity,.3)}
</style>
