import { commonProps } from "../../utils";
import type { PropType, ExtractPropTypes } from "vue";

export const vanDropdownMenuProps = {
  ...commonProps,
  activeColor: String,
  overlay: {
    type: Boolean,
    default: true,
  },
  zIndex: {
    type: Number,
    default: 10,
  },
  duration: {
    type: Number,
    default: 200,
  },
  direction: {
    type: String as PropType<"down" | "up">,
    default: "down",
  },
  safeAreaTabBar: {
    type: Boolean,
    default: false,
  },
  closeOnClickOverlay: {
    type: Boolean,
    default: true,
  },
  closeOnClickOutside: {
    type: Boolean,
    default: true,
  },
};

export type VanDropdownMenuProps = ExtractPropTypes<
  typeof vanDropdownMenuProps
>;
