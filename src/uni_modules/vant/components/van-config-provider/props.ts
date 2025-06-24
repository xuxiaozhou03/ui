import type { ExtractPropTypes, PropType } from "vue";

export const configProviderProps = {
  themeVars: {
    type: Object as PropType<Record<string, string | number>>,
    default: () => ({}),
  },
};

export type ConfigProviderProps = ExtractPropTypes<typeof configProviderProps>;
