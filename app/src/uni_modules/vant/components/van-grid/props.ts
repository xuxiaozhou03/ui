import type { ExtractPropTypes, InjectionKey } from "vue";
import { commonProps } from "../../utils";

export const gridProps = {
  square: Boolean,
  gutter: {
    type: [Number, String],
    default: 0,
  },
  clickable: Boolean,
  columnNum: {
    type: Number,
    default: 4,
  },
  center: {
    type: Boolean,
    default: true,
  },
  border: {
    type: Boolean,
    default: true,
  },
  direction: String,
  iconSize: String,
  reverse: {
    type: Boolean,
    default: false,
  },
  customClass: commonProps.customClass,
};

export type GridProps = ExtractPropTypes<typeof gridProps>;

export const gridKey: InjectionKey<GridProps> = Symbol("van-grid");
