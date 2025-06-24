<template>
  <div class="van-uploader">
    <div class="van-uploader__wrapper">
      <template v-for="(item, index) in lists" :key="index">
        <div
          v-if="previewImage"
          class="van-uploader__preview"
          @click="onClickPreview(index)"
        >
          <img
            v-if="item.isImage"
            :src="item.thumb || item.url"
            :alt="item.name || `图片${index}`"
            class="van-uploader__preview-image"
            :style="sizeStyle"
            @click.stop="onPreviewImage(index)"
          />
          <video
            v-else-if="item.isVideo"
            :src="item.url"
            :title="item.name || `视频${index}`"
            :poster="item.thumb"
            :autoplay="item.autoplay"
            :object-fit="videoFit"
            class="van-uploader__preview-image"
            :style="sizeStyle"
            @click.stop="onPreviewVideo(index)"
          />
          <div
            v-else
            class="van-uploader__file"
            :style="sizeStyle"
            @click.stop="onPreviewFile(index)"
          >
            <van-icon name="description" class="van-uploader__file-icon" />
            <div class="van-uploader__file-name van-ellipsis">
              {{ item.name || item.url }}
            </div>
          </div>
          <div
            v-if="item.status === 'uploading' || item.status === 'failed'"
            class="van-uploader__mask"
          >
            <van-icon
              v-if="item.status === 'failed'"
              name="close"
              class="van-uploader__mask-icon"
            />
            <van-loading v-else class="van-uploader__loading" />
            <span v-if="item.message" class="van-uploader__mask-message">{{
              item.message
            }}</span>
          </div>
          <div
            v-if="deletable && item.deletable"
            class="van-uploader__preview-delete"
            @click.stop="deleteItem(index)"
          >
            <van-icon name="cross" class="van-uploader__preview-delete-icon" />
          </div>
        </div>
      </template>
      <template v-if="isInCount">
        <div class="van-uploader__slot" @click="startUpload">
          <slot />
        </div>
        <div
          v-if="showUpload"
          :class="[
            'van-uploader__upload',
            { 'van-uploader__upload--disabled': disabled },
          ]"
          :style="sizeStyle"
          @click="startUpload"
        >
          <van-icon :name="uploadIcon" class="van-uploader__upload-icon" />
          <span v-if="uploadText" class="van-uploader__upload-text">{{
            uploadText
          }}</span>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps, defineEmits, watch } from "vue";
import { uploaderProps } from "./props";

const props = defineProps(uploaderProps);
const emit = defineEmits<{
  (e: "after-read", payload: any): void;
  (e: "before-read", payload: any): void;
  (e: "oversize", payload: any): void;
  (e: "error", payload: any): void;
  (e: "delete", payload: any): void;
  (e: "click-preview", payload: any): void;
}>();

const lists = ref<any[]>([]);
const isInCount = computed(() => lists.value.length < props.maxCount);
const previewImage = computed(() => props.previewImage);
const deletable = computed(() => props.deletable);
const showUpload = computed(() => props.showUpload);
const disabled = computed(() => props.disabled);
const uploadIcon = computed(() => props.uploadIcon);
const uploadText = computed(() => props.uploadText);
const videoFit = computed(() => props.videoFit);

const sizeStyle = computed(() => {
  if (Array.isArray(props.previewSize)) {
    return {
      width: `${props.previewSize[0]}px`,
      height: `${props.previewSize[1]}px`,
    };
  }
  return {
    width: `${props.previewSize}px`,
    height: `${props.previewSize}px`,
  };
});

watch(
  () => props.fileList,
  (val) => {
    lists.value = (val || []).map((item: any) => ({
      ...item,
      isImage: item.isImage ?? /image/.test(item.type || ""),
      isVideo: item.isVideo ?? /video/.test(item.type || ""),
      deletable: typeof item.deletable === "boolean" ? item.deletable : true,
    }));
  },
  { immediate: true }
);

function startUpload() {
  if (disabled.value) return;
  // 这里应集成 chooseFile 逻辑，或由外部传入
  emit("error", { message: "请实现 chooseFile 逻辑" });
}
function onClickPreview(index: number) {
  emit("click-preview", { ...lists.value[index], index });
}
function onPreviewImage(index: number) {
  // 这里应集成图片预览逻辑
  emit("click-preview", { ...lists.value[index], index });
}
function onPreviewVideo(index: number) {
  // 这里应集成视频预览逻辑
  emit("click-preview", { ...lists.value[index], index });
}
function onPreviewFile(index: number) {
  // 这里应集成文件预览逻辑
  emit("click-preview", { ...lists.value[index], index });
}
function deleteItem(index: number) {
  emit("delete", { file: lists.value[index], index });
}
</script>

<style>
.van-uploader {
  display: inline-block;
  position: relative;
}
.van-uploader__wrapper {
  display: flex;
  flex-wrap: wrap;
}
.van-uploader__slot:empty {
  display: none;
}
.van-uploader__slot:not(:empty) + .van-uploader__upload {
  display: none !important;
}
.van-uploader__upload {
  align-items: center;
  background-color: var(--uploader-upload-background-color, #f7f8fa);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: var(--uploader-size, 80px);
  justify-content: center;
  margin: 0 8px 8px 0;
  position: relative;
  width: var(--uploader-size, 80px);
}
.van-uploader__upload:active {
  background-color: var(--uploader-upload-active-color, #f2f3f5);
}
.van-uploader__upload-icon {
  color: var(--uploader-icon-color, #dcdee0);
  font-size: var(--uploader-icon-size, 24px);
}
.van-uploader__upload-text {
  color: var(--uploader-text-color, #969799);
  font-size: var(--uploader-text-font-size, 12px);
  margin-top: var(--padding-xs, 8px);
}
.van-uploader__upload--disabled {
  opacity: var(--uploader-disabled-opacity, 0.5);
}
.van-uploader__preview {
  cursor: pointer;
  margin: 0 8px 8px 0;
  position: relative;
}
.van-uploader__preview-image {
  display: block;
  height: var(--uploader-size, 80px);
  overflow: hidden;
  width: var(--uploader-size, 80px);
}
.van-uploader__preview-delete,
.van-uploader__preview-delete:after {
  height: var(--uploader-delete-icon-size, 14px);
  position: absolute;
  right: 0;
  top: 0;
  width: var(--uploader-delete-icon-size, 14px);
}
.van-uploader__preview-delete:after {
  background-color: var(--uploader-delete-background-color, rgba(0, 0, 0, 0.7));
  border-radius: 0 0 0 12px;
  content: "";
}
.van-uploader__preview-delete-icon {
  color: var(--uploader-delete-color, #fff);
  font-size: var(--uploader-delete-icon-size, 14px);
  position: absolute;
  right: 0;
  top: 0;
  transform: scale(0.7) translate(10%, -10%);
  z-index: 1;
}
.van-uploader__file {
  align-items: center;
  background-color: var(--uploader-file-background-color, #f7f8fa);
  display: flex;
  flex-direction: column;
  height: var(--uploader-size, 80px);
  justify-content: center;
  width: var(--uploader-size, 80px);
}
.van-uploader__file-icon {
  color: var(--uploader-file-icon-color, #646566);
  font-size: var(--uploader-file-icon-size, 20px);
}
.van-uploader__file-name {
  box-sizing: border-box;
  color: var(--uploader-file-name-text-color, #646566);
  font-size: var(--uploader-file-name-font-size, 12px);
  margin-top: var(--uploader-file-name-margin-top, 8px);
  padding: var(--uploader-file-name-padding, 0 4px);
  text-align: center;
  width: 100%;
}
.van-uploader__mask {
  align-items: center;
  background-color: var(
    --uploader-mask-background-color,
    rgba(50, 50, 51, 0.88)
  );
  bottom: 0;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
}
.van-uploader__mask-icon {
  font-size: var(--uploader-mask-icon-size, 22px);
}
.van-uploader__mask-message {
  font-size: var(--uploader-mask-message-font-size, 12px);
  line-height: var(--uploader-mask-message-line-height, 14px);
  margin-top: 6px;
  padding: 0 var(--padding-base, 4px);
}
.van-uploader__loading {
  color: var(--uploader-loading-icon-color, #fff) !important;
  height: var(--uploader-loading-icon-size, 22px);
  width: var(--uploader-loading-icon-size, 22px);
}
</style>
