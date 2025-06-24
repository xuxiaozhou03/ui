<template>
  <div class="">
    <div class="">{{ title }}</div>
    <slot />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
    default: "Demo Page",
  },
});
</script>
