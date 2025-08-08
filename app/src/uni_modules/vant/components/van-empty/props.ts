import type { ExtractPropTypes } from "vue";
export const EmptyProps = {}

export type EmptyPropsType = ExtractPropTypes<typeof EmptyProps>
  