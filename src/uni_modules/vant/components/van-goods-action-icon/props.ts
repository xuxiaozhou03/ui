import type { ExtractPropTypes, PropType } from "vue";

export const goodsActionIconProps = {
  text: String,
  dot: Boolean,
  info: String,
  icon: String,
  size: String,
  color: String,
  classPrefix: String,
  id: String,
  lang: String,
  loading: Boolean,
  disabled: Boolean,
  openType: String,
  businessId: String,
  sessionFrom: String,
  appParameter: String,
  sendMessageImg: String,
  sendMessagePath: String,
  showMessageCard: Boolean,
  sendMessageTitle: String,
};

export type GoodsActionIconProps = ExtractPropTypes<
  typeof goodsActionIconProps
>;
