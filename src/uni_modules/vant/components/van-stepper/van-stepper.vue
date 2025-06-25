<template>
  <div :class="[bem('stepper', [theme]), 'custom-class']">
    <div
      v-if="showMinus"
      :style="buttonStyle"
      :class="[
        'minus-class',
        bem('stepper__minus', {
          disabled: disabled || disableMinus || currentValue <= min,
        }),
      ]"
      @mousedown="onTap('minus')"
      @touchstart="onTouchStart('minus', $event)"
      @touchend="onTouchEnd"
    >
      <slot name="minus" />
    </div>
    <input
      :type="integer ? 'number' : 'text'"
      :class="[
        'input-class',
        bem('stepper__input', { disabled: disabled || disableInput }),
      ]"
      :style="inputStyle"
      v-model="inputValue"
      :disabled="disabled || disableInput"
      @focus="onFocus"
      @blur="onBlur"
    />
    <div
      v-if="showPlus"
      :style="buttonStyle"
      :class="[
        'plus-class',
        bem('stepper__plus', {
          disabled: disabled || disablePlus || currentValue >= max,
        }),
      ]"
      @mousedown="onTap('plus')"
      @touchstart="onTouchStart('plus', $event)"
      @touchend="onTouchEnd"
    >
      <slot name="plus" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, defineProps, defineEmits } from "vue";
import { stepperProps, StepperProps } from "./props";

const props = defineProps({
  ...stepperProps,
  min: { type: Number, default: 1 },
  max: { type: Number, default: Number.MAX_SAFE_INTEGER },
  step: { type: Number, default: 1 },
  showPlus: { type: Boolean, default: true },
  showMinus: { type: Boolean, default: true },
  disablePlus: Boolean,
  disableMinus: Boolean,
  longPress: { type: Boolean, default: true },
  theme: String,
  alwaysEmbed: Boolean,
  asyncChange: Boolean,
  disableInput: Boolean,
  decimalLength: Number,
  buttonSize: String,
});
const emit = defineEmits<{
  (e: "update:modelValue", value: number): void;
  (e: "change", value: number): void;
  (e: "focus", val: any): void;
  (e: "blur", val: any): void;
  (e: "overlimit", type: string): void;
  (e: "plus"): void;
  (e: "minus"): void;
}>();

const inputValue = ref(props.value ?? props.min);
const currentValue = computed(() => Number(inputValue.value));
const min = computed(() => props.min);
const max = computed(() => props.max);
const step = computed(() => props.step);
const integer = computed(() => !!props.integer);
const disabled = computed(() => !!props.disabled);
const disableInput = computed(() => !!props.disableInput);
const showPlus = computed(() => props.showPlus !== false);
const showMinus = computed(() => props.showMinus !== false);
const disablePlus = computed(() => !!props.disablePlus);
const disableMinus = computed(() => !!props.disableMinus);
const theme = computed(() => props.theme);
const buttonSize = computed(() => props.buttonSize);
const inputWidth = computed(() => props.inputWidth);

watch(
  () => props.value,
  (val) => {
    inputValue.value = val;
  }
);

function bem(name: string, mods?: any) {
  if (!mods) return `van-${name}`;
  let base = `van-${name}`;
  if (Array.isArray(mods)) {
    mods.forEach((m) => {
      if (typeof m === "string") base += ` van-${name}--${m}`;
      else if (typeof m === "object") {
        Object.keys(m).forEach((k) => {
          if (m[k]) base += ` van-${name}--${k}`;
        });
      }
    });
  } else if (typeof mods === "object") {
    Object.keys(mods).forEach((k) => {
      if (mods[k]) base += ` van-${name}--${k}`;
    });
  }
  return base;
}

const buttonStyle = computed(() => ({
  width: buttonSize.value,
  height: buttonSize.value,
}));
const inputStyle = computed(() => ({
  width: inputWidth.value,
  height: buttonSize.value,
}));

function isDisabled(type: string) {
  if (type === "plus") {
    return (
      disabled.value || disablePlus.value || currentValue.value >= max.value
    );
  }
  return (
    disabled.value || disableMinus.value || currentValue.value <= min.value
  );
}

function onFocus(e: any) {
  emit("focus", e);
}
function onBlur(e: any) {
  let val = format(e.target.value);
  inputValue.value = val;
  emit("update:modelValue", val);
  emit("change", val);
  emit("blur", e);
}
function onTap(type: string) {
  if (isDisabled(type)) {
    emit("overlimit", type);
    return;
  }
  let diff = type === "minus" ? -step.value : step.value;
  let val = format(Number(inputValue.value) + diff);
  inputValue.value = val;
  emit("update:modelValue", val);
  emit("change", val);
  emit(type);
}
let longPressTimer: any = null;
function onTouchStart(type: string, e: Event) {
  if (!props.longPress) return;
  clearTimeout(longPressTimer);
  longPressTimer = setTimeout(() => {
    onTap(type);
    longPressStep(type);
  }, 600);
}
function longPressStep(type: string) {
  longPressTimer = setTimeout(() => {
    onTap(type);
    longPressStep(type);
  }, 200);
}
function onTouchEnd() {
  if (!props.longPress) return;
  clearTimeout(longPressTimer);
}
function format(val: any) {
  let value = String(val).replace(/[^0-9.-]/g, "");
  if (integer.value && value.indexOf(".") !== -1) {
    value = value.split(".")[0];
  }
  value = value === "" ? 0 : +value;
  value = Math.max(Math.min(max.value, value), min.value);
  if (props.decimalLength != null) {
    value = value.toFixed(props.decimalLength);
  }
  return value;
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
  display: inline-block;
  height: var(--stepper-input-height, 28px);
  margin: 1px;
  padding: var(--padding-base, 4px);
  position: relative;
  vertical-align: middle;
  width: var(--stepper-input-height, 28px);
}
.van-stepper__minus:before,
.van-stepper__plus:before {
  height: 1px;
  width: 9px;
}
.van-stepper__minus:after,
.van-stepper__plus:after {
  height: 9px;
  width: 1px;
}
.van-stepper__minus:empty.van-stepper__minus:after,
.van-stepper__minus:empty.van-stepper__minus:before,
.van-stepper__minus:empty.van-stepper__plus:after,
.van-stepper__minus:empty.van-stepper__plus:before,
.van-stepper__plus:empty.van-stepper__minus:after,
.van-stepper__plus:empty.van-stepper__minus:before,
.van-stepper__plus:empty.van-stepper__plus:after,
.van-stepper__plus:empty.van-stepper__plus:before {
  background-color: currentColor;
  bottom: 0;
  content: "";
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
}
.van-stepper__minus--hover,
.van-stepper__plus--hover {
  background-color: var(--stepper-active-color, #e8e8e8);
}
.van-stepper__minus--disabled,
.van-stepper__plus--disabled {
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
.van-stepper__minus {
  border-radius: var(--stepper-border-radius, var(--stepper-border-radius, 4px))
    0 0 var(--stepper-border-radius, var(--stepper-border-radius, 4px));
}
.van-stepper__minus:after {
  display: none;
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
