import { validateJmbg } from "./utils";

describe("validate JMBG", () => {
  test("length", () => {
      expect(validateJmbg('1')).toBeInstanceOf(Error);
      expect(validateJmbg('1234567890123')).toBe(null);
  });
  test("days", () => {
      expect(validateJmbg('3234567890123')).toBeInstanceOf(Error);
      expect(validateJmbg('0034567890123')).toBeInstanceOf(Error);
  });
});
