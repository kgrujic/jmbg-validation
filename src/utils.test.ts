import { validateJmbg } from "./utils";

describe("validate JMBG", () => {
  test("length", () => {
    expect(validateJmbg("1")).toBeInstanceOf(Error);
    expect(validateJmbg("012345678912")).toBeInstanceOf(Error);
  });
  test("years", () => {
    expect(validateJmbg("2902001890123")).toBeInstanceOf(Error);
    expect(typeof validateJmbg("2902996890123")).toBe("string");
  });
  test("region", () => {
    expect(validateJmbg("2902001000123")).toBeInstanceOf(Error);
    expect(typeof validateJmbg("2902996010123")).toBe("string");
    expect(validateJmbg("2902996690123")).toBeInstanceOf(Error);
    expect(validateJmbg("2902996600123")).toBeInstanceOf(Error);
    expect(typeof validateJmbg("2902996700123")).toBe("string");
  });
});
