<template>
  <demo-block title="基础用法" padding>
    <van-cell title="Fade" @click="onClickFade" is-link />
    <van-cell title="Fade Up" @click="onClickFadeUp" is-link />
    <van-cell title="Fade Down" @click="onClickFadeDown" is-link />
    <van-cell title="Fade Left" @click="onClickFadeLeft" is-link />
    <van-cell title="Fade Right" @click="onClickFadeRight" is-link />
    <van-cell title="Slide Up" @click="onClickSlideUp" is-link />
    <van-cell title="Slide Down" @click="onClickSlideDown" is-link />
    <van-cell title="Slide Left" @click="onClickSlideLeft" is-link />
    <van-cell title="Slide Right" @click="onClickSlideRight" is-link />
    <van-cell title="Custom" @click="onClickCustom" is-link />

    <van-transition :show="show" :name="name" class="block" />

    <van-transition
      :show="showCustom"
      :name="''"
      :duration="{ enter: 300, leave: 1000 }"
      class="block"
      enter-class="van-enter-class"
      enter-active-class="van-enter-active-class"
      leave-active-class="van-leave-active-class"
      leave-to-class="van-leave-to-class"
      @before-enter="onBeforeEnter"
      @enter="onEnter"
      @after-enter="onAfterEnter"
      @before-leave="onBeforeLeave"
      @leave="onLeave"
      @after-leave="onAfterLeave"
    />
  </demo-block>
</template>
<script setup lang="ts">
import { ref } from "vue";

const show = ref(false);
const name = ref("fade");
const showCustom = ref(false);

function trigger(val: string) {
  name.value = val;
  show.value = true;
  setTimeout(() => {
    show.value = false;
  }, 500);
}
function onClickFade() {
  trigger("fade");
}
function onClickFadeUp() {
  trigger("fade-up");
}
function onClickFadeDown() {
  trigger("fade-down");
}
function onClickFadeLeft() {
  trigger("fade-left");
}
function onClickFadeRight() {
  trigger("fade-right");
}
function onClickSlideUp() {
  trigger("slide-up");
}
function onClickSlideDown() {
  trigger("slide-down");
}
function onClickSlideLeft() {
  trigger("slide-left");
}
function onClickSlideRight() {
  trigger("slide-right");
}
function onClickCustom() {
  showCustom.value = true;
  setTimeout(() => {
    showCustom.value = false;
  }, 1000);
}
function onBeforeEnter() {
  console.log("before enter");
}
function onEnter() {
  console.log("enter");
}
function onAfterEnter() {
  console.log("after enter");
}
function onBeforeLeave() {
  console.log("before leave");
}
function onLeave() {
  console.log("leave");
}
function onAfterLeave() {
  console.log("after leave");
}
</script>
<style scoped>
.block {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 100px;
  height: 100px;
  margin: -50px 0 0 -50px;
  background-color: #1989fa;
}

.van-enter-active-class,
.van-leave-active-class {
  transition-property: background-color, transform;
}

.van-enter-class,
.van-leave-to-class {
  background-color: red;
  transform: rotate(-360deg) translate3d(-100%, -100%, 0);
}
</style>
