import type { ExtractPropTypes } from "vue";
import { commonProps } from "../../utils";

export const panelProps = {
  desc: String,
  title: String,
  status: String,
  customClass: commonProps.customClass,
  headerClass: commonProps.customClass,
  footerClass: commonProps.customClass,
};

export type PanelProps = ExtractPropTypes<typeof panelProps>;
