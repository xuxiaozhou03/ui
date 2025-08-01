<template>
  <div :class="cn('van-panel', 'van-hairline--top-bottom', customClass)">
    <template v-if="title || desc || status">
      <van-cell
        :title="title"
        :label="desc"
        :value="status"
        :custom-class="headerClass"
        value-class="van-panel__header-value"
      />
    </template>
    <template v-else>
      <slot name="header" />
    </template>

    <div class="van-panel__content">
      <slot />
    </div>

    <div :class="cn('van-panel__footer', 'van-hairline--top', footerClass)">
      <slot name="footer" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { cn } from "../../utils";
import { panelProps } from "./props";
defineProps(panelProps);
</script>
<style>
.van-panel {
  background: var(--panel-background-color, #fff);
}
.van-panel__header-value {
  color: var(--panel-header-value-color, #ee0a24);
}
.van-panel__footer {
  padding: var(--panel-footer-padding, 8px 16px);
}
.van-panel__footer:empty {
  display: none;
}
</style>
