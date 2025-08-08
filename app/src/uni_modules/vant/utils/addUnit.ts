function addUnit(
  value: string | number | null | undefined
): string | undefined {
  if (value == null || value === undefined) {
    return undefined;
  }

  return /^-?\d+(\.\d+)?$/.test("" + value) ? value + "px" : (value as string);
}

export default addUnit;
