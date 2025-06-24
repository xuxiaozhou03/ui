import type { ExtractPropTypes, PropType } from "vue";

export const sliderProps = {
  disabled: Boolean,
  vertical: Boolean,
  range: Boolean,
  useButtonSlot: Boolean,
  activeColor: String,
  wrapperStyle: String,
  barStyle: String,
};

export type SliderProps = ExtractPropTypes<typeof sliderProps>;
