<template>
  <view :class="bem('radio', [direction])">
    <view
      v-if="labelPosition === 'left'"
      :class="[
        bem('radio__label', [labelPosition, { disabled: isDisabled }]),
        'label-class',
      ]"
      @click="onClickLabel"
    >
      <slot />
    </view>
    <view
      class="van-radio__icon-wrap"
      :style="{ fontSize: addUnit(iconSize) }"
      @click="onChange"
    >
      <template v-if="useIconSlot">
        <slot name="icon" />
      </template>
      <template v-else>
        <van-icon
          name="success"
          :class="
            bem('radio__icon', [shape, { disabled: isDisabled, checked }])
          "
          :style="iconStyle"
        />
      </template>
    </view>
    <view
      v-if="labelPosition === 'right'"
      :class="[
        'label-class',
        bem('radio__label', [labelPosition, { disabled: isDisabled }]),
      ]"
      @click="onClickLabel"
    >
      <slot />
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, inject } from "vue";
import { radioProps, RadioProps } from "./props";
import { addUnit, bem as _bem } from "../../utils";
import VanIcon from "../van-icon/van-icon.vue";

const props = defineProps<RadioProps>();
const emit = defineEmits<{
  (e: "update:modelValue", value: any): void;
  (e: "change", value: any): void;
}>();

// radio-group 注入
const radioGroup = inject<any>("vanRadioGroup", null);

const parentValue = computed(() => radioGroup?.modelValue ?? undefined);
const parentDisabled = computed(() => radioGroup?.disabled ?? false);
const direction = computed(() => radioGroup?.direction ?? "");

const checked = computed(() => {
  if (radioGroup) {
    return parentValue.value === props.name;
  }
  return props.value === props.name;
});

const isDisabled = computed(() => props.disabled || parentDisabled.value);

const iconStyle = computed(() => {
  const style: Record<string, string> = {
    fontSize: addUnit(props.iconSize),
  };
  if (props.checkedColor && !isDisabled.value && checked.value) {
    style["borderColor"] = props.checkedColor;
    style["backgroundColor"] = props.checkedColor;
  }
  return style;
});

function bem(name: string, mods?: any) {
  return _bem(name, mods);
}

function onChange() {
  if (isDisabled.value) return;
  if (radioGroup) {
    radioGroup.change(props.name);
  } else {
    emit("update:modelValue", props.name);
    emit("change", props.name);
  }
}

function onClickLabel() {
  if (isDisabled.value || props.labelDisabled) return;
  onChange();
}
</script>

<style>
.van-radio {
  align-items: center;
  display: flex;
  overflow: hidden;
  -webkit-user-select: none;
  user-select: none;
}
.van-radio__icon-wrap {
  flex: none;
}
.van-radio--horizontal {
  margin-right: var(--padding-sm, 12px);
}
.van-radio__icon {
  align-items: center;
  border: 1px solid var(--radio-border-color, #c8c9cc);
  box-sizing: border-box;
  color: transparent;
  display: flex;
  font-size: var(--radio-size, 20px);
  height: 1em;
  justify-content: center;
  text-align: center;
  transition-duration: var(--radio-transition-duration, 0.2s);
  transition-property: color, border-color, background-color;
  width: 1em;
}
.van-radio__icon--round {
  border-radius: 100%;
}
.van-radio__icon--checked {
  background-color: var(--radio-checked-icon-color, #1989fa);
  border-color: var(--radio-checked-icon-color, #1989fa);
  color: #fff;
}
.van-radio__icon--disabled {
  background-color: var(--radio-disabled-background-color, #ebedf0);
  border-color: var(--radio-disabled-icon-color, #c8c9cc);
}
.van-radio__icon--disabled.van-radio__icon--checked {
  color: var(--radio-disabled-icon-color, #c8c9cc);
}
.van-radio__label {
  word-wrap: break-word;
  color: var(--radio-label-color, #323233);
  line-height: var(--radio-size, 20px);
  padding-left: var(--radio-label-margin, 10px);
}
.van-radio__label--left {
  float: left;
  margin: 0 var(--radio-label-margin, 10px) 0 0;
}
.van-radio__label--disabled {
  color: var(--radio-disabled-label-color, #c8c9cc);
}
.van-radio__label:empty {
  margin: 0;
}
</style>
