import type { ExtractPropTypes, PropType } from "vue";

export type GoodsActionButtonType =
  | "danger"
  | "warning"
  | "info"
  | "primary"
  | "default";
export type GoodsActionButtonSize = "normal" | "large";

export const goodsActionButtonProps = {
  text: String,
  color: String,
  size: {
    type: String as PropType<GoodsActionButtonSize>,
    default: "normal",
  },
  loading: Boolean,
  disabled: Boolean,
  type: {
    type: String as PropType<GoodsActionButtonType>,
    default: "default",
  },
  plain: Boolean,
  openType: String,
  id: String,
  buttonId: String,
  lang: String,
  customStyle: String,
  businessId: String,
  sessionFrom: String,
  appParameter: String,
  sendMessageImg: String,
  sendMessagePath: String,
  showMessageCard: Boolean,
  sendMessageTitle: String,
};

export type GoodsActionButtonProps = ExtractPropTypes<
  typeof goodsActionButtonProps
>;
