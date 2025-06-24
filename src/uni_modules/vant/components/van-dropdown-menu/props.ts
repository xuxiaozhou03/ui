import type { ExtractPropTypes } from "vue";

export const dropdownMenuProps = {
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
    type: String,
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

export type DropdownMenuProps = ExtractPropTypes<typeof dropdownMenuProps>;
