import type { CSSProperties, PropType } from "vue";

export const commonProps = {
  customClass: String,
  customStyle: {
    type: Object as PropType<CSSProperties>,
  },
};
