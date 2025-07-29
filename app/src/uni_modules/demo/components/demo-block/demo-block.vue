<template>
  <view :class="blockClass">
    <view v-if="title" class="demo-block__title">{{ title }}</view>
    <view v-if="card" class="demo-block__card">
      <slot />
    </view>
    <template v-else>
      <slot />
    </template>
  </view>
</template>
<script setup lang="ts">
import { commonProps } from "../../../vant/utils/props";
import { computed } from "vue";

const props = defineProps({
  title: String,
  padding: Boolean,
  card: Boolean,
  customClass: commonProps.customClass,
});

const blockClass = computed(() => [
  "demo-block",
  "van-clearfix",
  props.customClass,
  { "demo-block--padding": props.padding },
]);
</script>

<style>
.demo-block__title {
  margin: 0;
  padding: 20px 15px 15px;
  color: rgba(69, 90, 100, 0.6);
  font-weight: 400;
  font-size: 14px;
}

.demo-block__card {
  overflow: hidden;
  border-radius: 8px;
}

.demo-block--padding {
  padding: 0 15px;
}

.demo-block--padding .demo-block__title {
  padding-left: 0;
}
</style>
