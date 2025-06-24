import type { ExtractPropTypes, PropType } from "vue";

export interface DropdownOption {
  text: string;
  value: string | number;
  icon?: string;
}

export const dropdownItemProps = {
  value: [String, Number],
  title: String,
  disabled: Boolean,
  titleClass: String,
  options: {
    type: Array as PropType<DropdownOption[]>,
    default: () => [],
  },
  popupStyle: String,
  useBeforeToggle: {
    type: Boolean,
    default: false,
  },
  rootPortal: {
    type: Boolean,
    default: false,
  },
};

export type DropdownItemProps = ExtractPropTypes<typeof dropdownItemProps>;
