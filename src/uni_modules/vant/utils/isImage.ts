export function isImage(name?: string) {
  return !!name && name.indexOf("/") !== -1;
}
