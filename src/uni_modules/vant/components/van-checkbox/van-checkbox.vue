<template>
  <view
    :class="[
      'van-checkbox',
      { 'van-checkbox--horizontal': direction === 'horizontal' },
      customClass,
    ]"
  >
    <template v-if="labelPosition === 'left'">
      <view
        :class="[
          'label-class',
          'van-checkbox__label',
          labelPosition,
          { 'van-checkbox__label--disabled': disabled || parentDisabled },
        ]"
        @tap="onClickLabel"
      >
        <slot />
      </view>
    </template>
    <view class="van-checkbox__icon-wrap" @tap="toggle">
      <template v-if="useIconSlot">
        <slot name="icon" />
      </template>
      <template v-else>
        <van-icon
          name="success"
          :size="'0.8em'"
          :class="[
            'van-checkbox__icon',
            shape,
            {
              'van-checkbox__icon--disabled': disabled || parentDisabled,
              'van-checkbox__icon--checked': modelValue,
            },
          ]"
          :style="iconStyleComputed"
        />
      </template>
    </view>
    <template v-if="labelPosition === 'right'">
      <view
        :class="[
          'label-class',
          'van-checkbox__label',
          labelPosition,
          { 'van-checkbox__label--disabled': disabled || parentDisabled },
        ]"
        @tap="onClickLabel"
      >
        <slot />
      </view>
    </template>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, inject } from "vue";
import { checkboxProps, CheckboxProps } from "./props";
import VanIcon from "../icon/van-icon.vue";

const props = defineProps<CheckboxProps>();
const emit = defineEmits(["update:modelValue", "change"]);

// 兼容 group 逻辑，简化为 inject parentDisabled/direction
const parentDisabled = inject("checkboxGroupDisabled", false);
const direction = inject("checkboxGroupDirection", "vertical");

const toggle = () => {
  if (!props.disabled && !parentDisabled) {
    emit("update:modelValue", !props.modelValue);
    emit("change", !props.modelValue);
  }
};

const onClickLabel = () => {
  if (!props.disabled && !props.labelDisabled && !parentDisabled) {
    emit("update:modelValue", !props.modelValue);
    emit("change", !props.modelValue);
  }
};

function addUnit(value?: string | number) {
  if (value == null) return undefined;
  return typeof value === "number" ? `${value}px` : value;
}

const iconStyleComputed = computed(() => {
  const styles: Record<string, string | undefined> = {
    "font-size": addUnit(props.iconSize),
  };
  if (
    props.checkedColor &&
    props.modelValue &&
    !props.disabled &&
    !parentDisabled
  ) {
    styles["border-color"] = props.checkedColor;
    styles["background-color"] = props.checkedColor;
  }
  return styles;
});
</script>

<style scoped>
.van-checkbox {
  align-items: center;
  display: flex;
  overflow: hidden;
  -webkit-user-select: none;
  user-select: none;
}
.van-checkbox--horizontal {
  margin-right: 12px;
}
.van-checkbox__icon-wrap,
.van-checkbox__label {
  line-height: var(--checkbox-size, 20px);
}
.van-checkbox__icon-wrap {
  flex: none;
}
.van-checkbox__icon {
  align-items: center;
  border: 1px solid var(--checkbox-border-color, #c8c9cc);
  box-sizing: border-box;
  color: transparent;
  display: flex;
  font-size: var(--checkbox-size, 20px);
  height: 1em;
  justify-content: center;
  text-align: center;
  transition-duration: var(--checkbox-transition-duration, 0.2s);
  transition-property: color, border-color, background-color;
  width: 1em;
}
.van-checkbox__icon--round {
  border-radius: 100%;
}
.van-checkbox__icon--checked {
  background-color: var(--checkbox-checked-icon-color, #1989fa);
  border-color: var(--checkbox-checked-icon-color, #1989fa);
  color: #fff;
}
.van-checkbox__icon--disabled {
  background-color: var(--checkbox-disabled-background-color, #ebedf0);
  border-color: var(--checkbox-disabled-icon-color, #c8c9cc);
}
.van-checkbox__icon--disabled.van-checkbox__icon--checked {
  color: var(--checkbox-disabled-icon-color, #c8c9cc);
}
.van-checkbox__label {
  word-wrap: break-word;
  color: var(--checkbox-label-color, #323233);
  padding-left: var(--checkbox-label-margin, 10px);
}
.van-checkbox__label--left {
  float: left;
  margin: 0 var(--checkbox-label-margin, 10px) 0 0;
}
.van-checkbox__label--disabled {
  color: var(--checkbox-disabled-label-color, #c8c9cc);
}
.van-checkbox__label:empty {
  margin: 0;
}
</style>
