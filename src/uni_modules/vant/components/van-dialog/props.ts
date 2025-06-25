import { commonProps } from "../../utils";
import type { PropType, ExtractPropTypes } from "vue";

export const vanDialogProps = {
  ...commonProps,
  show: Boolean,
  title: String,
  message: String,
  theme: {
    type: String as PropType<"default" | "round-button">,
    default: "default",
  },
  confirmButtonId: String,
  className: String,
  customStyle: String,
  asyncClose: Boolean,
  messageAlign: String,
  beforeClose: Function as PropType<
    (action: string) => boolean | Promise<boolean>
  >,
  overlayStyle: String,
  useSlot: Boolean,
  useTitleSlot: Boolean,
  useConfirmButtonSlot: Boolean,
  useCancelButtonSlot: Boolean,
  showCancelButton: Boolean,
  closeOnClickOverlay: Boolean,
  confirmButtonOpenType: String,
  width: [String, Number],
  zIndex: {
    type: Number,
    default: 2000,
  },
  confirmButtonText: {
    type: String,
    default: "确认",
  },
  cancelButtonText: {
    type: String,
    default: "取消",
  },
  confirmButtonColor: {
    type: String,
    default: "#ee0a24",
  },
  cancelButtonColor: {
    type: String,
    default: "#323233",
  },
  showConfirmButton: {
    type: Boolean,
    default: true,
  },
  overlay: {
    type: Boolean,
    default: true,
  },
  transition: {
    type: String,
    default: "scale",
  },
  rootPortal: {
    type: Boolean,
    default: false,
  },
  // 其它 button/open-type 相关 props可继续补充
};

export type VanDialogProps = ExtractPropTypes<typeof vanDialogProps>;
