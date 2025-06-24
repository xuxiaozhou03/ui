var REGEXP = /^-?\d+(\.\d+)?$/;

function addUnit(
  value: string | number | null | undefined
): string | number | undefined {
  if (value == null || value === "" || value === undefined) {
    return undefined;
  }

  return REGEXP.test("" + value) ? value + "px" : value;
}

export default addUnit;
