import { validateJmbg } from "./utils";

const validate = validateJmbg(() => {})

describe("validate JMBG", () => {
  test("length", () => {
      expect(validate('1')).toBe(false);
      expect(validate('1234567890123')).toBe(true);
  });
});
