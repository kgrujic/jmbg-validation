import regionMap from "./regionMap";
import { validateJmbg } from "./utils";

describe("validate JMBG", () => {
  test("length", () => {
    expect(validateJmbg("1")).toBeInstanceOf(Error);
    expect(validateJmbg("012345678912")).toBeInstanceOf(Error);
  });
  test("years", () => {
    expect(validateJmbg("3002000890123")).toBeInstanceOf(Error);
    expect(validateJmbg("2902001890123")).toBeInstanceOf(Error);
  });
  test("region", () => {
    expect(validateJmbg("2902996600123")).toBeInstanceOf(Error);
    expect(validateJmbg("2902996690123")).toBeInstanceOf(Error);
  });
  test("jmbg", () => {
    expect(validateJmbg("0101100710006")).toEqual({
      value: "0101100710006",
      date: new Date(2100, 0, 1),
      region: regionMap["71"],
      uniqueId: {
        sex: "male",
        index: 0,
      },
      controlNumber: 6,
    });
  });
});
