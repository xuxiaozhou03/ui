<template>
  <demo-block title="基础用法">
    <van-area
      :value="value"
      :loading="loading"
      :area-list="areaList"
      @change="onChange"
      @confirm="onConfirm"
      @cancel="onCancel"
    />
  </demo-block>
  <van-toast id="van-toast" />
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import Toast from "../../toast/toast";

const areaList = ref({});
const loading = ref(true);
const value = ref(330302);

const db = wx.cloud?.database();

onMounted(() => {
  db?.collection("region")
    .limit(1)
    .get()
    .then((res) => {
      if (res.data && res.data.length > 0) {
        loading.value = false;
        areaList.value = res.data[0];
      }
    })
    .catch((err) => {
      console.log(err);
      loading.value = false;
    });
});

function onChange(event: any) {
  const { values } = event.detail;
  Toast({
    context: this,
    message: values.map((item: any) => item.name).join("-"),
  });
}

function onConfirm(event: any) {
  console.log(event);
}

function onCancel(event: any) {
  console.log(event);
}
</script>
<style></style>
