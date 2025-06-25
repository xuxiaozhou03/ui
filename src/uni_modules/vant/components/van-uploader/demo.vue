<template>
  <demo-block title="基础用法" padding>
    <van-uploader
      name="1"
      :file-list="fileList1"
      @after-read="afterRead(1)"
      @delete="onDelete(1)"
      @click-preview="clickPreview"
    />
  </demo-block>

  <demo-block title="上传视频" padding>
    <van-uploader
      name="7"
      accept="video"
      :file-list="fileList7"
      @after-read="afterRead(7)"
      @delete="onDelete(7)"
    />
  </demo-block>

  <demo-block title="文件预览" padding>
    <van-uploader
      name="2"
      :file-list="fileList2"
      multiple
      @after-read="afterRead(2)"
      @delete="onDelete(2)"
      @click-preview="clickPreview"
    />
  </demo-block>

  <demo-block title="隐藏上传按钮" padding>
    <van-uploader
      name="2"
      :file-list="fileList2"
      multiple
      :show-upload="false"
      @after-read="afterRead(2)"
      @delete="onDelete(2)"
      @click-preview="clickPreview"
    />
  </demo-block>

  <demo-block title="上传状态" padding>
    <van-uploader
      name="8"
      :file-list="fileList8"
      multiple
      :max-count="2"
      @after-read="afterRead(8)"
      @delete="onDelete(8)"
      @click-preview="clickPreview"
    />
  </demo-block>

  <demo-block title="限制上传数量" padding>
    <van-uploader
      name="3"
      :file-list="fileList3"
      multiple
      :max-count="2"
      @after-read="afterRead(3)"
      @delete="onDelete(3)"
      @click-preview="clickPreview"
    />
  </demo-block>

  <demo-block title="自定义上传样式" padding>
    <van-uploader
      name="4"
      :file-list="fileList4"
      :max-count="2"
      @after-read="afterRead(4)"
      @delete="onDelete(4)"
      @click-preview="clickPreview"
      use-slot
    >
      <van-button icon="photo" type="primary">上传图片</van-button>
    </van-uploader>
  </demo-block>

  <demo-block title="上传前校验" padding>
    <van-uploader
      name="5"
      :file-list="fileList5"
      @before-read="beforeRead(5)"
      @after-read="afterRead(5)"
      @delete="onDelete(5)"
      @click-preview="clickPreview"
      use-before-read
    />
  </demo-block>

  <demo-block title="云存储上传" padding>
    <van-uploader
      name="6"
      :file-list="fileList6"
      @before-read="beforeRead(6)"
      @after-read="afterRead(6)"
      @delete="onDelete(6)"
      @click-preview="clickPreview"
      use-before-read
    />
    <div class="demo-margin-bottom">
      <van-button type="primary" @click="uploadToCloud"
        >上传至云存储</van-button
      >
    </div>
  </demo-block>
</template>
<script setup lang="ts">
import { ref } from "vue";

const fileList1 = ref<any[]>([]);
const fileList2 = ref<any[]>([
  { url: "https://img.yzcdn.cn/vant/leaf.jpg" },
  { url: "https://img.yzcdn.cn/vant/tree.jpg" },
]);
const fileList3 = ref<any[]>([{ url: "https://img.yzcdn.cn/vant/sand.jpg" }]);
const fileList4 = ref<any[]>([]);
const fileList5 = ref<any[]>([]);
const fileList6 = ref<any[]>([]);
const fileList7 = ref<any[]>([]);
const fileList8 = ref<any[]>([
  {
    url: "https://img.yzcdn.cn/vant/leaf.jpg",
    status: "uploading",
    message: "上传中",
  },
  {
    url: "https://img.yzcdn.cn/vant/tree.jpg",
    status: "failed",
    message: "上传失败",
  },
]);
const cloudPath = ref<any[]>([]);

function beforeRead(name: number) {
  return ({ file, callback }: any) => {
    if (file.url.indexOf("jpeg") < 0) {
      window.alert("请选择jpg图片上传");
      callback(false);
      return;
    }
    callback(true);
  };
}
function afterRead(name: number) {
  return ({ file }: any) => {
    const list = getFileList(name);
    list.value = list.value.concat(file);
  };
}
function onDelete(name: number) {
  return ({ index }: any) => {
    const list = getFileList(name);
    list.value.splice(index, 1);
  };
}
function clickPreview() {}
function uploadToCloud() {
  window.alert("模拟上传至云存储");
}
function getFileList(name: number) {
  switch (name) {
    case 1:
      return fileList1;
    case 2:
      return fileList2;
    case 3:
      return fileList3;
    case 4:
      return fileList4;
    case 5:
      return fileList5;
    case 6:
      return fileList6;
    case 7:
      return fileList7;
    case 8:
      return fileList8;
    default:
      return fileList1;
  }
}
</script>
<style scoped></style>
