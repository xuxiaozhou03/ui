<template>
  <div
    :class="['van-stepper', theme ? 'van-stepper--' + theme : '', customClass]"
  >
    <button
      v-if="showMinus"
      type="button"
      :style="buttonStyle"
      :class="[
        'van-stepper__minus',
        {
          'van-stepper__minus--disabled':
            disabled || disableMinus || +currentValue <= +min,
        },
        minusClass,
      ]"
      @mousedown="onTouchStart('minus')"
      @mouseup="onTouchEnd"
      @mouseleave="onTouchEnd"
      @touchstart="onTouchStart('minus')"
      @touchend="onTouchEnd"
      @click="onTap('minus')"
      :disabled="disabled || disableMinus || +currentValue <= +min"
    >
      <slot name="minus">-</slot>
    </button>
    <input
      :type="integer ? 'number' : 'text'"
      :class="['van-stepper__input', inputClass]"
      :style="inputStyle"
      v-model="currentValue"
      :disabled="disabled || disableInput"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
    />
    <button
      v-if="showPlus"
      type="button"
      :style="buttonStyle"
      :class="[
        'van-stepper__plus',
        {
          'van-stepper__plus--disabled':
            disabled || disablePlus || +currentValue >= +max,
        },
        plusClass,
      ]"
      @mousedown="onTouchStart('plus')"
      @mouseup="onTouchEnd"
      @mouseleave="onTouchEnd"
      @touchstart="onTouchStart('plus')"
      @touchend="onTouchEnd"
      @click="onTap('plus')"
      :disabled="disabled || disablePlus || +currentValue >= +max"
    >
      <slot name="plus">+</slot>
    </button>
  </div>
</template>
<script lang="ts" setup>
import {
  ref,
  computed,
  defineProps,
  defineEmits,
  watch,
  type CSSProperties,
} from "vue";
import { stepperProps } from "./props";

const props = defineProps(stepperProps);

const emit = defineEmits([
  "update:modelValue",
  "change",
  "focus",
  "blur",
  "overlimit",
  "plus",
  "minus",
]);

const currentValue = ref(props.modelValue ?? props.min);
const isLongPress = ref(false);
let longPressTimer: any = null;

watch(
  () => props.modelValue,
  (val) => {
    currentValue.value = format(val);
  }
);

function add(num1: number, num2: number) {
  const cardinal = 10 ** 10;
  return Math.round((num1 + num2) * cardinal) / cardinal;
}

function filter(value: any) {
  value = String(value).replace(/[^0-9.-]/g, "");
  if (props.integer && value.indexOf(".") !== -1) {
    value = value.split(".")[0];
  }
  return value;
}

function format(value: any) {
  value = filter(value);
  value = value === "" ? 0 : +value;
  value = Math.max(Math.min(+props.max, value), +props.min);
  if (props.decimalLength !== undefined && props.decimalLength !== null) {
    value = value.toFixed(props.decimalLength);
  }
  return value;
}

const buttonStyle = computed(() => {
  const style: CSSProperties = {};
  if (props.buttonSize) {
    style.width = props.buttonSize;
    style.height = props.buttonSize;
  }
  return style;
});

const inputStyle = computed(() => {
  const style: CSSProperties = {};
  if (props.inputWidth) style.width = props.inputWidth;
  if (props.buttonSize) style.height = props.buttonSize;
  return style;
});

function onInput(e: Event) {
  const target = e.target as HTMLInputElement;
  let value = target.value;
  if (value === "") return;
  value = format(value);
  emitChange(value);
}

function emitChange(value: any) {
  if (!props.asyncChange) {
    currentValue.value = value;
    emit("update:modelValue", value);
  }
  emit("change", value);
}

function onFocus(e: FocusEvent) {
  emit("focus", e);
}

function onBlur(e: FocusEvent) {
  const target = e.target as HTMLInputElement;
  const value = format(target.value);
  currentValue.value = value;
  emitChange(value);
  emit("blur", { ...e, value });
}

function onTap(type: "plus" | "minus") {
  if (isDisabled(type)) {
    emit("overlimit", type);
    return;
  }
  const diff = type === "minus" ? -Number(props.step) : +Number(props.step);
  const value = format(add(+currentValue.value, diff));
  emitChange(value);
  emit(type);
}

function isDisabled(type: "plus" | "minus") {
  if (type === "plus") {
    return (
      props.disabled || props.disablePlus || +currentValue.value >= +props.max
    );
  }
  return (
    props.disabled || props.disableMinus || +currentValue.value <= +props.min
  );
}

function onTouchStart(type: "plus" | "minus") {
  if (!props.longPress) return;
  clearTimeout(longPressTimer);
  isLongPress.value = false;
  longPressTimer = setTimeout(() => {
    isLongPress.value = true;
    onTap(type);
    longPressStep(type);
  }, 600);
}

function longPressStep(type: "plus" | "minus") {
  longPressTimer = setTimeout(() => {
    onTap(type);
    longPressStep(type);
  }, 200);
}

function onTouchEnd() {
  if (!props.longPress) return;
  clearTimeout(longPressTimer);
}
</script>
<style>
.van-stepper {
  font-size: 0;
}
.van-stepper__minus,
.van-stepper__plus {
  background-color: var(--stepper-background-color, #f2f3f5);
  border: 0;
  box-sizing: border-box;
  color: var(--stepper-button-icon-color, #323233);
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: var(--stepper-input-height, 28px);
  margin: 1px;
  padding: var(--padding-base, 4px);
  position: relative;
  vertical-align: middle;
  width: var(--stepper-input-height, 28px);
  border: none;
}
.van-stepper__minus::after,
.van-stepper__plus::after {
  display: none;
}
.van-stepper__minus--hover,
.van-stepper__plus--hover {
  background-color: var(--stepper-active-color, #e8e8e8);
}
.van-stepper__minus.van-stepper__minus--disabled,
.van-stepper__plus.van-stepper__plus--disabled {
  color: var(--stepper-button-disabled-icon-color, #c8c9cc);
}
.van-stepper__minus--disabled,
.van-stepper__minus--disabled.van-stepper__minus--hover,
.van-stepper__minus--disabled.van-stepper__plus--hover,
.van-stepper__plus--disabled,
.van-stepper__plus--disabled.van-stepper__minus--hover,
.van-stepper__plus--disabled.van-stepper__plus--hover {
  background-color: var(--stepper-button-disabled-color, #f7f8fa);
}
.van-stepper__plus {
  border-radius: 0
    var(--stepper-border-radius, var(--stepper-border-radius, 4px))
    var(--stepper-border-radius, var(--stepper-border-radius, 4px)) 0;
}
.van-stepper--round .van-stepper__input {
  background-color: initial !important;
}
.van-stepper--round .van-stepper__minus,
.van-stepper--round .van-stepper__plus {
  border-radius: 100%;
}
.van-stepper--round .van-stepper__minus:active,
.van-stepper--round .van-stepper__plus:active {
  opacity: 0.7;
}
.van-stepper--round .van-stepper__minus--disabled,
.van-stepper--round .van-stepper__minus--disabled:active,
.van-stepper--round .van-stepper__plus--disabled,
.van-stepper--round .van-stepper__plus--disabled:active {
  opacity: 0.3;
}
.van-stepper--round .van-stepper__plus {
  background-color: #ee0a24;
  color: #fff;
}
.van-stepper--round .van-stepper__minus {
  background-color: #fff;
  border: 1px solid #ee0a24;
  color: #ee0a24;
}
.van-stepper__input {
  -webkit-appearance: none;
  background-color: var(--stepper-background-color, #f2f3f5);
  border: 0;
  border-radius: 0;
  border-width: 1px 0;
  box-sizing: border-box;
  color: var(--stepper-input-text-color, #323233);
  display: inline-block;
  font-size: var(--stepper-input-font-size, 14px);
  height: var(--stepper-input-height, 28px);
  margin: 1px;
  min-height: 0;
  padding: 1px;
  text-align: center;
  vertical-align: middle;
  width: var(--stepper-input-width, 32px);
}
.van-stepper__input--disabled {
  background-color: var(--stepper-input-disabled-background-color, #f2f3f5);
  color: var(--stepper-input-disabled-text-color, #c8c9cc);
}
</style>
