import { type CSSProperties } from "vue";

export const commonProps = {
  customStyle: {
    type: Object as () => CSSProperties,
  },
  customClass: String,
};
