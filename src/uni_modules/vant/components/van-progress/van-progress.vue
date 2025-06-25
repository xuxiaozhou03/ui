<template>
  <div
    class="van-progress custom-class"
    :style="rootStyle"
  >
    <div
      class="van-progress__portion"
      :style="portionStyle"
    >
      <div
        v-if="showPivot && pivotTextValue"
        :style="pivotStyle"
        class="van-progress__pivot"
      >
        {{ pivotTextValue }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue';
import { progressProps } from './props';
import { addUnit } from '../../utils';

const props = defineProps(progressProps);

const right = ref(0);
const portionRef = ref<HTMLElement | null>(null);
const pivotRef = ref<HTMLElement | null>(null);

const pivotTextValue = computed(() => props.pivotText || `${props.percentage}%`);

const rootStyle = computed(() => ({
  height: props.strokeWidth ? addUnit(props.strokeWidth) : '',
  background: props.trackColor,
}));

const portionStyle = computed(() => ({
  background: props.inactive ? '#cacaca' : props.color,
  width: props.percentage ? props.percentage + '%' : '',
}));

const pivotStyle = computed(() => ({
  color: props.textColor,
  right: right.value + 'px',
  background: props.pivotColor ? props.pivotColor : props.inactive ? '#cacaca' : props.color,
}));

function setLeft() {
  nextTick(() => {
    const portion = portionRef.value;
    const pivot = pivotRef.value;
    if (portion && pivot) {
      right.value = (pivot.offsetWidth * (props.percentage - 100)) / 100;
    }
  });
}

watch(() => props.percentage, setLeft, { immediate: true });
</script>

<style>
.van-progress{background:var(--progress-background-color,#ebedf0);border-radius:var(--progress-height,4px);height:var(--progress-height,4px);position:relative}.van-progress__portion{background:var(--progress-color,#1989fa);border-radius:inherit;height:100%;left:0;position:absolute}.van-progress__pivot{background-color:var(--progress-pivot-background-color,#1989fa);border-radius:1em;box-sizing:border-box;color:var(--progress-pivot-text-color,#fff);font-size:var(--progress-pivot-font-size,10px);line-height:var(--progress-pivot-line-height,1.6);min-width:3.6em;padding:var(--progress-pivot-padding,0 5px);position:absolute;text-align:center;top:50%;transform:translateY(-50%);word-break:keep-all}
</style>
