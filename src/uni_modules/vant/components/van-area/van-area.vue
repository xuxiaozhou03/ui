<template>
  <van-picker
    class="van-area__picker"
    active-class="active-class"
    toolbar-class="toolbar-class"
    column-class="column-class"
    :show-toolbar="showToolbar"
    value-key="name"
    :title="title"
    :loading="loading"
    :columns="displayColumns(columns, columnsNum)"
    :item-height="itemHeight"
    :visible-item-count="visibleItemCount"
    :cancel-button-text="cancelButtonText"
    :confirm-button-text="confirmButtonText"
    @change="onChange"
    @confirm="onConfirm"
    @cancel="onCancel"
  />
</template>
<script lang="ts" setup>
import { ref, computed, watch } from "vue";
import { areaProps, type AreaProps, type AreaList } from "./props";

const props = defineProps(areaProps);
const emit = defineEmits(["change", "confirm", "cancel"]);

const columns = ref([{ values: [] }, { values: [] }, { values: [] }]);
const typeToColumnsPlaceholder = ref({ province: "", city: "", county: "" });

watch(
  () => props.columnsPlaceholder,
  (val) => {
    typeToColumnsPlaceholder.value = {
      province: val[0] || "",
      city: val[1] || "",
      county: val[2] || "",
    };
  }
);

function displayColumns(cols: any[], num: number) {
  return cols.slice(0, +num);
}

function onChange(event: any) {
  emit("change", event);
}
function onConfirm(event: any) {
  emit("confirm", event);
}
function onCancel(event: any) {
  emit("cancel", event);
}
</script>
<style></style>
