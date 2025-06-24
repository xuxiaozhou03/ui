import type { ExtractPropTypes, PropType } from "vue";

export const shareSheetProps = {
  show: Boolean,
  overlayStyle: String,
  zIndex: {
    type: Number,
    default: 100,
  },
  title: String,
  cancelText: {
    type: String,
    default: "取消",
  },
  description: String,
  options: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
  overlay: {
    type: Boolean,
    default: true,
  },
  duration: Number,
  closeOnClickOverlay: Boolean,
  safeAreaInsetBottom: Boolean,
  rootPortal: Boolean,
};

export type ShareSheetProps = ExtractPropTypes<typeof shareSheetProps>;
