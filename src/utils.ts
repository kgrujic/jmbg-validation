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

const d28 = "(0[1-9]|1[0-9]|2[0-8])";
const d29 = "(0[1-9]|1[0-9]|2[0-9])";
const d30 = "(0[1-9]|1[0-9]|2[0-9]|30)";
const d31 = "(0[1-9]|1[0-9]|2[0-9]|3[0-1])";

const months = `((${d31}01)|(${d28}02)|(${d31}03)|(${d30}04)|(${d31}05)|(${d30}06)|(${d31}07)|(${d31}08)|(${d30}09)|(${d31}10)|(${d30}11)|(${d31}12))`;
const leapYearMonths = `((${d31}01)|(${d29}02)|(${d31}03)|(${d30}04)|(${d31}05)|(${d30}06)|(${d31}07)|(${d31}08)|(${d30}09)|(${d31}10)|(${d30}11)|(${d31}12))`;

const years = `((${leapYearMonths}[0-9][13579][26])|(${leapYearMonths}[0-9][02468][048])|(${months}[0-9][13579][1345789])|(${months}[0-9][02468][1235679]))`;

export const validateJmbg = (jmbg: Person["jmbg"]): MaybeJmbg => {
  return pipe([
    (value) =>
      /^\d{13}$/.test(value as Person["jmbg"])
        ? value
        : new Error("JMBG must consist of 13 digits."),
    (value) =>
      new RegExp(`^(${years}((0[1-9])|([2-5][0-9])|([7-9][0-9])))`).test(value)
        ? value
        : new Error(
            "First two digits must represent a valid day in the month."
          ),
  ])(jmbg);
};
