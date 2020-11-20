import { Person } from "./models";

export const validateJmbg = (value: Person["jmbg"]): Error | null => {
  if (/^\d{13}$/.test(value)) {
    if (/^((0[1-9])|(1[0-9])|(2[0-9])|(3[0-1]))/.test(value)) {
      return null;
    } else {
      return new Error(
        "First two digits must represent a valid day in the month."
      );
    }
  } else {
    return new Error("JMBG must consist of 13 digits.");
  }
};
