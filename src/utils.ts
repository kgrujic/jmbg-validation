import { Person } from "./models";

type MaybeJmbg = Person["jmbg"] | Error;

const pipeWith = <A, B>(composer: (f: (a: A) => A | B, r: A | B) => A | B) => (
  fs: Array<(a: A) => A | B>
) => (a: A): A | B => fs.reduce((r, f) => composer(f, r), a as A | B);

const pipeWithError = pipeWith(
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

const region = "((0[1-9])|([2-5][0-9])|([7-9][0-9]))";

const hasValidLength = (value: Person["jmbg"]) =>
  /^\d{13}$/.test(value) ? value : new Error("JMBG must consist of 13 digits.");

const hasValidDate = (value: Person["jmbg"]) =>
  new RegExp(`^${years}${region}[0-9][0-9][0-9][0-9]$`).test(value)
    ? value
    : new Error("The first 7 digits must represent a valid date.");

const hasValidControlNumber = (value: Person["jmbg"]) => {
  //     a  b  v  g  d  dj e  zh z  i  j  k  l
  const [a, b, c, d, e, f, g, h, i, j, k, l, m] = value.split("").map(Number);
  const result =
    11 -
    ((7 * (a + g) +
      6 * (b + h) +
      5 * (c + i) +
      4 * (d + j) +
      3 * (e + k) +
      2 * (f + l)) %
      11);

  const controlNumber = result > 9 ? 0 : result;

  return m === controlNumber
    ? value
    : new Error(
        `Expected control number to be ${controlNumber} but received ${m}.`
      );
};

export const validateJmbg = pipeWithError([
  hasValidLength,
  hasValidDate,
  hasValidControlNumber,
]);
