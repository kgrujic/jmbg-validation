import { validateJmbg } from "./utils";

describe("validate JMBG", () => {
  test("length", () => {
    expect(validateJmbg("1")).toBeInstanceOf(Error);
    expect(validateJmbg("012345678912")).toBeInstanceOf(Error);
  });
  test("years", () => {
    expect(validateJmbg("2902001890123")).toBeInstanceOf(Error);
    const input = "2902996890121";
    expect(validateJmbg(input)).toBe(input);
  });
  test("region", () => {
    expect(validateJmbg("2902001000123")).toBeInstanceOf(Error);
    const input1 = "2902996010121";
    expect(validateJmbg(input1)).toBe(input1);
    expect(validateJmbg("2902996690123")).toBeInstanceOf(Error);
    expect(validateJmbg("2902996600123")).toBeInstanceOf(Error);
    const input2 = "2902996700128";
    expect(validateJmbg(input2)).toBe(input2);
  });
});
