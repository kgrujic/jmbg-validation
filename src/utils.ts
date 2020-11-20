import { Person } from "./models";

type MaybeJmbg = Person["jmbg"] | Error;

type PipeWith = <A, B>(
  composer: (f: (a: A) => A | B, r: A | B) => A | B
) => (fs: Array<(a: A) => A | B>) => (a: A | B) => A | B;
const pipeWith: PipeWith = (composer) => (fs) => (a) =>
  fs.reduce((r, f) => composer(f, r), a);

const pipe = pipeWith(
  (f: (value: Person["jmbg"]) => MaybeJmbg, res: MaybeJmbg) =>
    res instanceof Error ? res : f(res)
);

export const validateJmbg = (jmbg: Person["jmbg"]): MaybeJmbg => {
  return pipe([
    (value) =>
      /^\d{13}$/.test(value as Person["jmbg"])
        ? value
        : new Error("JMBG must consist of 13 digits."),
    (value: Person["jmbg"]) =>
      /^((0[1-9])|(1[0-9])|(2[0-9])|(3[0-1]))/.test(value)
        ? value
        : new Error(
            "First two digits must represent a valid day in the month."
          ),
  ])(jmbg);
};
