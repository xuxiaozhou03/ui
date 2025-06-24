import type { ExtractPropTypes, PropType } from "vue";

export type CircleLineCap = "butt" | "round" | "square";

export const circleProps = {
  text: String,
  lineCap: {
    type: String as PropType<CircleLineCap>,
    default: "round",
  },
  modelValue: {
    type: Number,
    default: 0,
  },
  speed: {
    type: Number,
    default: 50,
  },
  size: {
    type: Number,
    default: 100,
  },
  fill: String,
  layerColor: {
    type: String,
    default: "#fff",
  },
  color: {
    type: [String, Object] as PropType<string | Record<string, string>>,
    default: "#1989fa",
  },
  type: String,
  strokeWidth: {
    type: Number,
    default: 4,
  },
  clockwise: {
    type: Boolean,
    default: true,
  },
};

export type CircleProps = ExtractPropTypes<typeof circleProps>;
