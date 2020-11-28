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
});
