import type { ExtractPropTypes, PropType } from "vue";

export const uploaderProps = {
  disabled: {
    type: Boolean,
    default: false,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  uploadText: {
    type: String,
    default: "",
  },
  useBeforeRead: {
    type: Boolean,
    default: false,
  },
  afterRead: Function,
  beforeRead: Function,
  previewSize: {
    type: [Number, Array] as PropType<number | [number, number]>,
    default: 80,
  },
  name: {
    type: [String, Number],
    default: "",
  },
  accept: {
    type: String,
    default: "image",
  },
  fileList: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
  maxSize: {
    type: Number,
    default: Number.MAX_VALUE,
  },
  maxCount: {
    type: Number,
    default: 100,
  },
  deletable: {
    type: Boolean,
    default: true,
  },
  showUpload: {
    type: Boolean,
    default: true,
  },
  previewImage: {
    type: Boolean,
    default: true,
  },
  previewFullImage: {
    type: Boolean,
    default: true,
  },
  videoFit: {
    type: String,
    default: "contain",
  },
  imageFit: {
    type: String,
    default: "scaleToFill",
  },
  uploadIcon: {
    type: String,
    default: "photograph",
  },
};

export type UploaderProps = ExtractPropTypes<typeof uploaderProps>;
