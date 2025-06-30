<template>
  <div class="van-rate custom-class" @touchmove="onTouchMove">
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
        :class="
          bem('rate__icon', [{ disabled, full: index + 1 <= innerValue }])
        "
        :style="{ fontSize: addUnit(size) }"
        class="icon-class"
        :color="
          disabled ? disabledColor : index + 1 <= innerValue ? color : voidColor
        "
        @click="onSelect(index)"
      />
      <van-icon
        v-if="allowHalf"
        :name="index + 0.5 <= innerValue ? icon : voidIcon"
        :class="
          bem('rate__icon', [
            'half',
            { disabled, full: index + 0.5 <= innerValue },
          ])
        "
        :style="{ fontSize: addUnit(size) }"
        class="icon-class"
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

<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { rateProps } from "./props";
import { cn, addUnit, bem } from "../../utils";

const props = defineProps(rateProps);
const emit = defineEmits<{
  (e: "update:modelValue", value: number): void;
  (e: "change", value: number): void;
}>();

const innerValue = ref(props.value ?? 0);
const count = computed(() => props.count ?? 5);
const disabled = computed(() => !!props.disabled);
const readonly = computed(() => !!props.readonly);
const allowHalf = computed(() => !!props.allowHalf);
const icon = computed(() => props.icon ?? "star");
const voidIcon = computed(() => props.voidIcon ?? "star-o");
const color = computed(() => props.color);
const voidColor = computed(() => props.voidColor);
const disabledColor = computed(() => props.disabledColor);
const size = computed(() => props.size);
const gutter = computed(() => props.gutter);

watch(
  () => props.value,
  (val) => {
    if (val !== innerValue.value) innerValue.value = val ?? 0;
  }
);

function onSelect(score: number) {
  if (disabled.value || readonly.value) return;
  const newValue = score + 1;
  innerValue.value = newValue;
  emit("update:modelValue", newValue);
  emit("change", newValue);
}

function onTouchMove(e: TouchEvent) {
  // 仅支持横向滑动评分，简化实现
  if (disabled.value || readonly.value) return;
  const target = (e.target as HTMLElement)?.closest(".van-rate__item");
  if (!target) return;
  const index = Array.from(target.parentElement!.children).indexOf(target);
  if (index >= 0) {
    onSelect(index);
  }
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
