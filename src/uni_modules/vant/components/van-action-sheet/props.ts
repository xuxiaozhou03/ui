import { commonProps } from "../../utils";
import type { PropType, ExtractPropTypes } from "vue";

export interface ActionSheetAction {
  name: string;
  subname?: string;
  color?: string;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  openType?: string;
  getUserProfileDesc?: string;
}

export const actionSheetProps = {
  ...commonProps,
  show: Boolean,
  title: String,
  cancelText: String,
  description: String,
  round: { type: Boolean, default: true },
  zIndex: { type: Number, default: 100 },
  actions: { type: Array as PropType<ActionSheetAction[]>, default: () => [] },
  overlay: { type: Boolean, default: true },
  closeOnClickOverlay: { type: Boolean, default: true },
  closeOnClickAction: { type: Boolean, default: true },
  safeAreaInsetBottom: { type: Boolean, default: true },
  rootPortal: { type: Boolean, default: false },
};

export type ActionSheetProps = ExtractPropTypes<typeof actionSheetProps>;
