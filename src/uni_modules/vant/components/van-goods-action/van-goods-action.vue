<template>
  <div :class="rootClass">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { goodsActionProps } from "./props";

const props = defineProps(goodsActionProps);

const rootClass = computed(() => [
  "van-goods-action",
  { "van-goods-action--safe": props.safeAreaInsetBottom },
]);
</script>

<style scoped>
.van-goods-action {
  align-items: center;
  background-color: var(--goods-action-background-color, #fff);
  bottom: 0;
  box-sizing: initial;
  display: flex;
  height: var(--goods-action-height, 50px);
  left: 0;
  position: fixed;
  right: 0;
}
.van-goods-action--safe {
  padding-bottom: env(safe-area-inset-bottom);
}
</style>
