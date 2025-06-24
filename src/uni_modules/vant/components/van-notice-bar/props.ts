import type { ExtractPropTypes, PropType } from "vue";

export const noticeBarProps = {
  text: {
    type: String,
    default: "",
  },
  mode: {
    type: String,
    default: "",
  },
  url: String,
  openType: String,
  color: String,
  backgroundColor: String,
  background: String,
  leftIcon: String,
  wrapable: Boolean,
  scrollable: Boolean,
  speed: Number,
  delay: Number,
};

export type NoticeBarProps = ExtractPropTypes<typeof noticeBarProps>;
