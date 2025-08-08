import type { PropType, CSSProperties } from "vue";

export const commonProps = {
  customClass: String,
  customStyle: Object as PropType<CSSProperties>,
};
