
    <template>
    


<view class="van-uploader">
  <view class="van-uploader__wrapper">
    <!-- 预览样式 -->
    <view
      wx:if="{{ previewImage }}"
      wx:for="{{ lists }}"
      wx:key="index"
      class="van-uploader__preview"
      data-index="{{ index }}"
      bindtap="onClickPreview"
    >
      <image
        wx:if="{{ item.isImage }}"
        mode="{{ imageFit }}"
        src="{{ item.thumb || item.url }}"
        alt="{{ item.name || ('图片' + index) }}"
        class="van-uploader__preview-image"
        style="{{ computed.sizeStyle({ previewSize }) }}"
        data-index="{{ index }}"
        bindtap="onPreviewImage"
      />
      <video
        wx:elif="{{ item.isVideo }}"
        src="{{ item.url }}"
        title="{{ item.name || ('视频' + index) }}"
        poster="{{ item.thumb }}"
        autoplay="{{ item.autoplay }}"
        object-fit="{{videoFit}}"
        referrer-policy="{{videoReferrerPolicy}}"
        class="van-uploader__preview-image"
        style="{{ computed.sizeStyle({ previewSize }) }}"
        data-index="{{ index }}"
        bindtap="onPreviewVideo"
      >
      </video>
      <view
        wx:else
        class="van-uploader__file"
        style="{{ computed.sizeStyle({ previewSize }) }}"
        data-index="{{ index }}"
        bindtap="onPreviewFile"
      >
        <van-icon name="description" class="van-uploader__file-icon" />
        <view class="van-uploader__file-name van-ellipsis">{{ item.name || item.url }}</view>
      </view>
      <view
        wx:if="{{ item.status === 'uploading' || item.status === 'failed' }}"
        class="van-uploader__mask"
      >
       <van-icon wx:if="{{ item.status === 'failed' }}" name="close" class="van-uploader__mask-icon" />
       <van-loading wx:else custom-class="van-uploader__loading" />
       <text wx:if="{{ item.message }}" class="van-uploader__mask-message">{{ item.message }}</text>
      </view>
      <view
        wx:if="{{ deletable && item.deletable }}"
        data-index="{{ index }}"
        class="van-uploader__preview-delete"
        catch:tap="deleteItem"
      >
        <van-icon name="cross" class="van-uploader__preview-delete-icon" />
      </view>
    </view>

    <!-- 上传样式 -->
    <block wx:if="{{ isInCount }}">
      <view class="van-uploader__slot" bindtap="startUpload">
        <slot />
      </view>

      <!-- 默认上传样式 -->
      <view
        wx:if="{{ showUpload }}"
        class="van-uploader__upload {{ disabled ? 'van-uploader__upload--disabled': ''}}"
        style="{{ computed.sizeStyle({ previewSize }) }}"
        bindtap="startUpload"
      >
        <van-icon name="{{ uploadIcon }}" class="van-uploader__upload-icon" />
        <text wx:if="{{ uploadText }}" class="van-uploader__upload-text">{{ uploadText }}</text>
      </view>
    </block>
  </view>
</view>

    </template>
    <script lang="ts" setup>
    import { cn, bem, commonProps } from "../../utils";
    import { VantComponent } from '../common/component';
import { isBoolean, isPromise } from '../common/validator';
import { imageProps, mediaProps, messageFileProps, videoProps } from './shared';
import { chooseFile, File, isImageFile, isVideoFile } from './utils';

VantComponent({
  props: {
    disabled: Boolean,
    multiple: Boolean,
    uploadText: String,
    useBeforeRead: Boolean,
    afterRead: null,
    beforeRead: null,
    previewSize: {
      type: null,
      value: 80,
    },
    name: {
      type: null,
      value: '',
    },
    accept: {
      type: String,
      value: 'image',
    },
    fileList: {
      type: Array,
      value: [],
      observer: 'formatFileList',
    },
    maxSize: {
      type: Number,
      value: Number.MAX_VALUE,
    },
    maxCount: {
      type: Number,
      value: 100,
    },
    deletable: {
      type: Boolean,
      value: true,
    },
    showUpload: {
      type: Boolean,
      value: true,
    },
    previewImage: {
      type: Boolean,
      value: true,
    },
    previewFullImage: {
      type: Boolean,
      value: true,
    },
    videoFit: {
      type: String,
      value: 'contain',
    },
    imageFit: {
      type: String,
      value: 'scaleToFill',
    },
    uploadIcon: {
      type: String,
      value: 'photograph',
    },
    ...imageProps,
    ...videoProps,
    ...mediaProps,
    ...messageFileProps,
  },

  data: {
    lists: [] as File[],
    isInCount: true,
  },

  methods: {
    formatFileList() {
      const { fileList = [], maxCount } = this.data;
      const lists = fileList.map((item) => ({
        ...item,
        isImage: isImageFile(item),
        isVideo: isVideoFile(item),
        deletable: isBoolean(item.deletable) ? item.deletable : true,
      }));

      this.setData({ lists, isInCount: lists.length < maxCount });
    },

    getDetail(index?: number) {
      return {
        name: this.data.name,
        index: index == null ? this.data.fileList.length : index,
      };
    },

    startUpload() {
      const { maxCount, multiple, lists, disabled } = this.data;

      if (disabled) return;

      chooseFile({
        ...this.data,
        maxCount: maxCount - lists.length,
      })
        .then((res) => {
          this.onBeforeRead(multiple ? res : res[0]);
        })
        .catch((error) => {
          this.$emit('error', error);
        });
    },

    onBeforeRead(file: File) {
      const { beforeRead, useBeforeRead } = this.data;
      let res: boolean | Promise<void> = true;

      if (typeof beforeRead === 'function') {
        res = beforeRead(file, this.getDetail());
      }

      if (useBeforeRead) {
        res = new Promise<void>((resolve, reject) => {
          this.$emit('before-read', {
            file,
            ...this.getDetail(),
            callback: (ok: boolean) => {
              ok ? resolve() : reject();
            },
          });
        });
      }

      if (!res) {
        return;
      }

      if (isPromise(res)) {
        res.then((data: any) => this.onAfterRead(data || file));
      } else {
        this.onAfterRead(file);
      }
    },

    onAfterRead(file) {
      const { maxSize, afterRead } = this.data;
      const oversize = Array.isArray(file)
        ? file.some((item) => item.size > maxSize)
        : file.size > maxSize;

      if (oversize) {
        this.$emit('oversize', { file, ...this.getDetail() });
        return;
      }

      if (typeof afterRead === 'function') {
        afterRead(file, this.getDetail());
      }

      this.$emit('after-read', { file, ...this.getDetail() });
    },

    deleteItem(event) {
      const { index } = event.currentTarget.dataset;

      this.$emit('delete', {
        ...this.getDetail(index),
        file: this.data.fileList[index],
      });
    },

    onPreviewImage(event) {
      if (!this.data.previewFullImage) return;

      const { index } = event.currentTarget.dataset;
      const { lists, showmenu } = this.data;
      const item = lists[index];

      wx.previewImage({
        urls: lists.filter((item) => isImageFile(item)).map((item) => item.url),
        current: item.url,
        showmenu,
        fail() {
          wx.showToast({ title: '预览图片失败', icon: 'none' });
        },
      });
    },

    onPreviewVideo(event) {
      if (!this.data.previewFullImage) return;
      const { index } = event.currentTarget.dataset;
      const { lists } = this.data as { lists: File[] };

      const sources: WechatMiniprogram.MediaSource[] = [];

      const current = lists.reduce((sum, cur, curIndex) => {
        if (!isVideoFile(cur)) {
          return sum;
        }

        sources.push({ ...cur, type: 'video' });

        if (curIndex < index) {
          sum++;
        }

        return sum;
      }, 0);

      wx.previewMedia({
        sources,
        current,
        fail() {
          wx.showToast({ title: '预览视频失败', icon: 'none' });
        },
      });
    },

    onPreviewFile(event: WechatMiniprogram.TouchEvent) {
      const { index } = event.currentTarget.dataset;

      wx.openDocument({
        filePath: this.data.lists[index].url,
        showMenu: true,
      });
    },

    onClickPreview(event) {
      const { index } = event.currentTarget.dataset;
      const item: File = this.data.lists[index];

      this.$emit('click-preview', {
        ...item,
        ...this.getDetail(index),
      });
    },
  },
});


    // 把下面代码变成 computed 属性
    



function sizeStyle(data) {
  return "Array" === data.previewSize.constructor ? style({
    width: addUnit(data.previewSize[0]),
    height: addUnit(data.previewSize[1]),
  }) : style({
    width: addUnit(data.previewSize),
    height: addUnit(data.previewSize),
  });
}

module.exports = {
  sizeStyle: sizeStyle,
};

    </script>
    <style>
    .van-uploader{display:inline-block;position:relative}.van-uploader__wrapper{display:flex;flex-wrap:wrap}.van-uploader__slot:empty{display:none}.van-uploader__slot:not(:empty)+.van-uploader__upload{display:none!important}.van-uploader__upload{align-items:center;background-color:var(--uploader-upload-background-color,#f7f8fa);box-sizing:border-box;display:flex;flex-direction:column;height:var(--uploader-size,80px);justify-content:center;margin:0 8px 8px 0;position:relative;width:var(--uploader-size,80px)}.van-uploader__upload:active{background-color:var(--uploader-upload-active-color,#f2f3f5)}.van-uploader__upload-icon{color:var(--uploader-icon-color,#dcdee0);font-size:var(--uploader-icon-size,24px)}.van-uploader__upload-text{color:var(--uploader-text-color,#969799);font-size:var(--uploader-text-font-size,12px);margin-top:var(--padding-xs,8px)}.van-uploader__upload--disabled{opacity:var(--uploader-disabled-opacity,.5)}.van-uploader__preview{cursor:pointer;margin:0 8px 8px 0;position:relative}.van-uploader__preview-image{display:block;height:var(--uploader-size,80px);overflow:hidden;width:var(--uploader-size,80px)}.van-uploader__preview-delete,.van-uploader__preview-delete:after{height:var(--uploader-delete-icon-size,14px);position:absolute;right:0;top:0;width:var(--uploader-delete-icon-size,14px)}.van-uploader__preview-delete:after{background-color:var(--uploader-delete-background-color,rgba(0,0,0,.7));border-radius:0 0 0 12px;content:""}.van-uploader__preview-delete-icon{color:var(--uploader-delete-color,#fff);font-size:var(--uploader-delete-icon-size,14px);position:absolute;right:0;top:0;transform:scale(.7) translate(10%,-10%);z-index:1}.van-uploader__file{align-items:center;background-color:var(--uploader-file-background-color,#f7f8fa);display:flex;flex-direction:column;height:var(--uploader-size,80px);justify-content:center;width:var(--uploader-size,80px)}.van-uploader__file-icon{color:var(--uploader-file-icon-color,#646566);font-size:var(--uploader-file-icon-size,20px)}.van-uploader__file-name{box-sizing:border-box;color:var(--uploader-file-name-text-color,#646566);font-size:var(--uploader-file-name-font-size,12px);margin-top:var(--uploader-file-name-margin-top,8px);padding:var(--uploader-file-name-padding,0 4px);text-align:center;width:100%}.van-uploader__mask{align-items:center;background-color:var(--uploader-mask-background-color,rgba(50,50,51,.88));bottom:0;color:#fff;display:flex;flex-direction:column;justify-content:center;left:0;position:absolute;right:0;top:0}.van-uploader__mask-icon{font-size:var(--uploader-mask-icon-size,22px)}.van-uploader__mask-message{font-size:var(--uploader-mask-message-font-size,12px);line-height:var(--uploader-mask-message-line-height,14px);margin-top:6px;padding:0 var(--padding-base,4px)}.van-uploader__loading{color:var(--uploader-loading-icon-color,#fff)!important;height:var(--uploader-loading-icon-size,22px);width:var(--uploader-loading-icon-size,22px)}
    </style>
  