import type { ExtractPropTypes } from "vue";

export const stickyProps = {
  zIndex: {
    type: Number,
    default: 99,
  },
  offsetTop: {
    type: Number,
    default: 0,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  container: {
    type: Function as unknown as () => HTMLElement | null,
    default: null,
  },
  scrollTop: {
    type: Number,
    default: undefined,
  },
};

export type StickyProps = ExtractPropTypes<typeof stickyProps>;
