<template>
  <div class="van-submit-bar custom-class">
    <slot name="top" />
    <div class="van-submit-bar__tip" v-if="tipIcon || hasTip">
      <van-icon
        v-if="tipIcon"
        size="12px"
        :name="tipIcon"
        class="van-submit-bar__tip-icon"
      />
      <span v-if="hasTip" class="van-submit-bar__tip-text">{{ tip }}</span>
      <slot name="tip" />
    </div>
    <div class="bar-class van-submit-bar__bar">
      <slot />
      <div v-if="hasPrice" class="van-submit-bar__text">
        <span>{{ label || "合计：" }}</span>
        <span class="van-submit-bar__price price-class">
          <span class="van-submit-bar__currency">{{ currency }} </span>
          <span class="van-submit-bar__price-integer">{{ integerStr }}</span
          ><span>{{ decimalStr }}</span>
        </span>
        <span class="van-submit-bar__suffix-label">{{ suffixLabel }}</span>
      </div>
      <van-button
        round
        :type="buttonType"
        :loading="loading"
        :disabled="disabled"
        class="van-submit-bar__button"
        custom-class="button-class"
        custom-style="width: 100%;"
        @click="onSubmit"
      >
        <template v-if="!loading">{{ buttonText }}</template>
      </van-button>
    </div>
    <div v-if="safeAreaInsetBottom" class="van-submit-bar__safe" />
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmits } from "vue";
import { submitBarProps } from "./props";

const props = defineProps(submitBarProps);
const emit = defineEmits<{
  (e: "submit", detail?: any): void;
}>();

const hasPrice = computed(() => typeof props.price === "number");
const hasTip = computed(
  () => typeof props.tip === "string" && props.tip !== ""
);
const decimalLength = computed(() => props.decimalLength ?? 2);
const priceStrArr = computed(() => {
  if (typeof props.price === "number") {
    return (props.price / 100).toFixed(decimalLength.value).split(".");
  }
  return ["", ""];
});
const integerStr = computed(() => priceStrArr.value[0]);
const decimalStr = computed(() =>
  decimalLength.value && priceStrArr.value[1] ? `.${priceStrArr.value[1]}` : ""
);

function onSubmit(event: Event) {
  emit("submit", event);
}
</script>

<style>
.van-submit-bar {
  background-color: var(--submit-bar-background-color, #fff);
  bottom: 0;
  left: 0;
  position: fixed;
  -webkit-user-select: none;
  user-select: none;
  width: 100%;
  z-index: var(--submit-bar-z-index, 100);
}
.van-submit-bar__tip {
  background-color: var(--submit-bar-tip-background-color, #fff7cc);
  color: var(--submit-bar-tip-color, #f56723);
  font-size: var(--submit-bar-tip-font-size, 12px);
  line-height: var(--submit-bar-tip-line-height, 1.5);
  padding: var(--submit-bar-tip-padding, 10px);
}
.van-submit-bar__tip:empty {
  display: none;
}
.van-submit-bar__tip-icon {
  margin-right: 4px;
  vertical-align: middle;
}
.van-submit-bar__tip-text {
  display: inline;
  vertical-align: middle;
}
.van-submit-bar__bar {
  align-items: center;
  background-color: var(--submit-bar-background-color, #fff);
  display: flex;
  font-size: var(--submit-bar-text-font-size, 14px);
  height: var(--submit-bar-height, 50px);
  justify-content: flex-end;
  padding: var(--submit-bar-padding, 0 16px);
}
.van-submit-bar__safe {
  height: constant(safe-area-inset-bottom);
  height: env(safe-area-inset-bottom);
}
.van-submit-bar__text {
  color: var(--submit-bar-text-color, #323233);
  flex: 1;
  font-weight: var(--font-weight-bold, 500);
  padding-right: var(--padding-sm, 12px);
  text-align: right;
}
.van-submit-bar__price {
  color: var(--submit-bar-price-color, #ee0a24);
  font-size: var(--submit-bar-price-font-size, 12px);
  font-weight: var(--font-weight-bold, 500);
}
.van-submit-bar__price-integer {
  font-family: Avenir-Heavy, PingFang SC, Helvetica Neue, Arial, sans-serif;
  font-size: 20px;
}
.van-submit-bar__currency {
  font-size: var(--submit-bar-currency-font-size, 12px);
}
.van-submit-bar__suffix-label {
  margin-left: 5px;
}
.van-submit-bar__button {
  --button-default-height: var(--submit-bar-button-height, 40px) !important;
  --button-line-height: var(--submit-bar-button-height, 40px) !important;
  font-weight: var(--font-weight-bold, 500);
  width: var(--submit-bar-button-width, 110px);
}
</style>
