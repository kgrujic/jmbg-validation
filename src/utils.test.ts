import { validateJmbg } from "./utils";

describe("validate JMBG", () => {
  test("length", () => {
    expect(validateJmbg("1")).toBeInstanceOf(Error);
    const input = "1234567890123";
    expect(validateJmbg(input)).toBeInstanceOf(Error);
    expect(validateJmbg("320569874521")).toBeInstanceOf(Error);
  });
  test("months", () => {
    expect(validateJmbg("0434567890123")).toBeInstanceOf(Error);
    expect(validateJmbg("1500567890123")).toBeInstanceOf(Error);
    expect(validateJmbg("3002567890123")).toBeInstanceOf(Error);
  });
});
