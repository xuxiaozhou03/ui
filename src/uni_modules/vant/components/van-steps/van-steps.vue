<template>
  <div :class="['custom-class', bem('steps', [direction])]">
    <div class="van-step__wrapper">
      <div
        v-for="(item, index) in steps"
        :key="index"
        @click="onClick(index)"
        :class="[
          bem('step', [direction, status(index, active)]),
          'van-hairline',
        ]"
        :style="
          status(index, active) === 'inactive' ? { color: inactiveColor } : {}
        "
      >
        <div
          class="van-step__title"
          :style="index === active ? { color: activeColor } : {}"
        >
          <div>{{ item.text }}</div>
          <div class="desc-class">{{ item.desc }}</div>
        </div>
        <div class="van-step__circle-container">
          <template v-if="index !== active">
            <van-icon
              v-if="item.inactiveIcon || inactiveIcon"
              :color="
                status(index, active) === 'inactive'
                  ? inactiveColor
                  : activeColor
              "
              :name="item.inactiveIcon || inactiveIcon"
              class="van-step__icon"
            />
            <div
              v-else
              class="van-step__circle"
              :style="{
                backgroundColor: index < active ? activeColor : inactiveColor,
              }"
            />
          </template>
          <van-icon
            v-else
            :name="item.activeIcon || activeIcon"
            :color="activeColor"
            class="van-step__icon"
          />
        </div>
        <div
          v-if="index !== steps.length - 1"
          class="van-step__line"
          :style="{
            backgroundColor: index < active ? activeColor : inactiveColor,
          }"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmits } from "vue";
import { stepsProps, StepsProps } from "./props";
import VanIcon from "../van-icon/van-icon.vue";

const props = defineProps({
  ...stepsProps,
  activeIcon: { type: String, default: "checked" },
  inactiveIcon: String,
});
const emit = defineEmits<{
  (e: "update:active", value: number): void;
  (e: "click-step", value: number): void;
}>();

const steps = computed(() => props.steps ?? []);
const active = computed({
  get: () => props.active ?? 0,
  set: (val) => emit("update:active", val),
});
const direction = computed(() => props.direction ?? "horizontal");
const activeColor = computed(() => props.activeColor ?? "#07c160");
const inactiveColor = computed(() => props.inactiveColor ?? "#969799");
const activeIcon = computed(() => props.activeIcon ?? "checked");
const inactiveIcon = computed(() => props.inactiveIcon);

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

function status(index: number, active: number) {
  if (index < active) return "finish";
  if (index === active) return "process";
  return "inactive";
}

function onClick(index: number) {
  emit("click-step", index);
}
</script>

<style>
.van-steps {
  background-color: var(--steps-background-color, #fff);
  overflow: hidden;
}
.van-steps--horizontal {
  padding: 10px;
}
.van-steps--horizontal .van-step__wrapper {
  display: flex;
  overflow: hidden;
  position: relative;
}
.van-steps--vertical {
  padding-left: 10px;
}
.van-steps--vertical .van-step__wrapper {
  padding: 0 0 0 20px;
}
.van-step {
  color: var(--step-text-color, #969799);
  flex: 1;
  font-size: var(--step-font-size, 14px);
  position: relative;
}
.van-step--finish {
  color: var(--step-finish-text-color, #323233);
}
.van-step__circle {
  background-color: var(--step-circle-color, #969799);
  border-radius: 50%;
  height: var(--step-circle-size, 5px);
  width: var(--step-circle-size, 5px);
}
.van-step--horizontal {
  padding-bottom: 14px;
}
.van-step--horizontal:first-child .van-step__title {
  transform: none;
}
.van-step--horizontal:first-child .van-step__circle-container {
  padding: 0 8px 0 0;
  transform: translate3d(0, 50%, 0);
}
.van-step--horizontal:last-child {
  position: absolute;
  right: 0;
  width: auto;
}
.van-step--horizontal:last-child .van-step__title {
  text-align: right;
  transform: none;
}
.van-step--horizontal:last-child .van-step__circle-container {
  padding: 0 0 0 8px;
  right: 0;
  transform: translate3d(0, 50%, 0);
}
.van-step--horizontal .van-step__circle-container {
  background-color: #fff;
  bottom: 6px;
  padding: 0 var(--padding-xs, 8px);
  position: absolute;
  transform: translate3d(-50%, 50%, 0);
  z-index: 1;
}
.van-step--horizontal .van-step__title {
  display: inline-block;
  font-size: var(--step-horizontal-title-font-size, 12px);
  transform: translate3d(-50%, 0, 0);
}
.van-step--horizontal .van-step__line {
  background-color: var(--step-line-color, #ebedf0);
  bottom: 6px;
  height: 1px;
  left: 0;
  position: absolute;
  right: 0;
  transform: translate3d(0, 50%, 0);
}
.van-step--horizontal.van-step--process {
  color: var(--step-process-text-color, #323233);
}
.van-step--horizontal.van-step--process .van-step__icon {
  display: block;
  font-size: var(--step-icon-size, 12px);
  line-height: 1;
}
.van-step--vertical {
  line-height: 18px;
  padding: 10px 10px 10px 0;
}
.van-step--vertical:after {
  border-bottom-width: 1px;
}
.van-step--vertical:last-child:after {
  border-bottom-width: none;
}
.van-step--vertical:first-child:before {
  background-color: #fff;
  content: "";
  height: 20px;
  left: -15px;
  position: absolute;
  top: 0;
  width: 1px;
  z-index: 1;
}
.van-step--vertical .van-step__circle,
.van-step--vertical .van-step__icon,
.van-step--vertical .van-step__line {
  left: -14px;
  position: absolute;
  top: 19px;
  transform: translate3d(-50%, -50%, 0);
  z-index: 2;
}
.van-step--vertical .van-step__icon {
  background-color: var(--steps-background-color, #fff);
  font-size: var(--step-icon-size, 12px);
  line-height: 1;
}
.van-step--vertical .van-step__line {
  background-color: var(--step-line-color, #ebedf0);
  height: 100%;
  transform: translate3d(-50%, 0, 0);
  width: 1px;
  z-index: 1;
}
</style>
