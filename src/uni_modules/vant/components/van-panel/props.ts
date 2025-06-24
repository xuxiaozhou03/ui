import type { ExtractPropTypes } from "vue";

export const panelProps = {
  desc: String,
  title: String,
  status: String,
};

export type PanelProps = ExtractPropTypes<typeof panelProps>;
