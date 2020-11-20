import { FormikProps } from "formik";
import { Person } from "./models";

export const validateJmbg = (
  setError: (error: Parameters<FormikProps<Person>["setFieldError"]>[1]) => void
) => (value: Person["jmbg"]): boolean => {
  if (/^\d{13}$/.test(value)) {
    if (/^(0[1-9])|(1[0-9])|(2[0-9])|(3[0-1])/.test(value)) {
      return true;
    } else {
      setError("First two digits must represent a valid day in the month.");
      return false;
    }
  } else {
    setError("JMBG must consist of 13 digits.");
    return false;
  }
};
