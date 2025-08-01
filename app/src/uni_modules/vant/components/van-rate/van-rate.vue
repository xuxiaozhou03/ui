<template>
  <div :class="['van-rate', customClass]" @touchmove="onTouchMove">
    <div
      v-for="(item, index) in count"
      :key="index"
      class="van-rate__item"
      :style="{
        paddingRight: index !== count - 1 ? addUnit(gutter) : undefined,
      }"
    >
      <van-icon
        :name="index + 1 <= innerValue ? icon : voidIcon"
        :custom-class="
          cn([
            'van-rate__icon',
            {
              'van-rate__icon--disabled': disabled,
              'van-rate__icon--full': index + 1 <= innerValue,
            },
            iconClass,
          ])
        "
        :style="{ fontSize: addUnit(size) }"
        :color="
          disabled ? disabledColor : index + 1 <= innerValue ? color : voidColor
        "
        @click="onSelect(index)"
      />
      <van-icon
        v-if="allowHalf"
        :name="index + 0.5 <= innerValue ? icon : voidIcon"
        :custom-class="
          cn([
            'van-rate__icon',
            'van-rate__icon--half',
            {
              'van-rate__icon--disabled': disabled,
              'van-rate__icon--full': index + 0.5 <= innerValue,
            },
            iconClass,
          ])
        "
        :style="{ fontSize: addUnit(size) }"
        :color="
          disabled
            ? disabledColor
            : index + 0.5 <= innerValue
            ? color
            : voidColor
        "
        @click="onSelect(index - 0.5)"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, defineProps, defineEmits, watch } from "vue";
import { rateProps } from "./props";
import { addUnit, cn } from "../../utils";

const props = defineProps(rateProps);

const emit = defineEmits(["update:modelValue", "change"]);

const innerValue = ref(props.modelValue);
watch(
  () => props.modelValue,
  (val) => {
    innerValue.value = val;
  }
);
function onSelect(score: number) {
  if (props.disabled || props.readonly) return;
  innerValue.value = score + 1;
  emit("update:modelValue", score + 1);
  emit("change", score + 1);
}

function onTouchMove(e: TouchEvent) {
  if (!props.touchable) return;
  // 这里可根据实际需求实现拖动评分
}
</script>
<style>
.van-rate {
  display: inline-flex;
  -webkit-user-select: none;
  user-select: none;
}
.van-rate__item {
  padding: 0 var(--rate-horizontal-padding, 2px);
  position: relative;
}
.van-rate__item:not(:last-child) {
  padding-right: var(--rate-icon-gutter, 4px);
}
.van-rate__icon {
  color: var(--rate-icon-void-color, #c8c9cc);
  display: block;
  font-size: var(--rate-icon-size, 20px);
  height: 100%;
}
.van-rate__icon--half {
  left: var(--rate-horizontal-padding, 2px);
  overflow: hidden;
  position: absolute;
  top: 0;
  width: 0.5em;
}
.van-rate__icon--full,
.van-rate__icon--half {
  color: var(--rate-icon-full-color, #ee0a24);
}
.van-rate__icon--disabled {
  color: var(--rate-icon-disabled-color, #c8c9cc);
}
</style>
