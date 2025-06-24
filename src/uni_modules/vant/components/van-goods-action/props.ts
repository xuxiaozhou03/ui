import type { ExtractPropTypes } from "vue";

export const goodsActionProps = {
  safeAreaInsetBottom: {
    type: Boolean,
    default: true,
  },
};

export type GoodsActionProps = ExtractPropTypes<typeof goodsActionProps>;
