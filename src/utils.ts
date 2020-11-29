import regionMap from "./regionMap";

const $ = <A, B, C>(f: (a: A) => B | Error, g: (b: B) => C | Error) => (
  a: A
): C | Error => {
  const b = f(a);
  return b instanceof Error ? b : g(b);
};

const d28 = "(0[1-9]|1[0-9]|2[0-8])";
const d29 = "(0[1-9]|1[0-9]|2[0-9])";
const d30 = "(0[1-9]|1[0-9]|2[0-9]|30)";
const d31 = "(0[1-9]|1[0-9]|2[0-9]|3[0-1])";

const months = `((${d31}01)|(${d28}02)|(${d31}03)|(${d30}04)|(${d31}05)|(${d30}06)|(${d31}07)|(${d31}08)|(${d30}09)|(${d31}10)|(${d30}11)|(${d31}12))`;
const leapYearMonths = `((${d31}01)|(${d29}02)|(${d31}03)|(${d30}04)|(${d31}05)|(${d30}06)|(${d31}07)|(${d31}08)|(${d30}09)|(${d31}10)|(${d30}11)|(${d31}12))`;

const date = `((${leapYearMonths}[0-9][13579][26])|(${leapYearMonths}[0-9][02468][048])|(${months}[0-9][13579][1345789])|(${months}[0-9][02468][1235679]))`;

type Value = string;
interface WithValue {
  value: Value;
}
interface WithDate extends WithValue {
  date: Date;
}
interface WithRegion extends WithDate {
  region: string;
}

interface WithUniqueId extends WithRegion {
  uniqueId: { sex: "female" | "male"; index: number };
}

export type Jmbg = WithUniqueId & { controlNumber: number };

const hasValidLength = (value: string): string | Error =>
  /^\d{13}$/.test(value) ? value : new Error("JMBG must consist of 13 digits.");

const hasValidDate = (value: string): WithDate | Error => {
  if (new RegExp(`^${date}......$`).test(value)) {
    const [d, d1, m, m1, y, y1, y2] = value.split("");
    return {
      value,
      date: new Date(
        Number(`${y === "9" ? 1 : 2}${y}${y1}${y2}`),
        Number(`${m}${m1}`) - 1,
        Number(`${d}${d1}`)
      ),
    };
  } else {
    return new Error(
      "The first 7 digits must represent a valid date in the following format: DDMMYYY"
    );
  }
};

const region =
  "((0[1-57-9])|(1[0-9])|(2[169])|(3[0-9])|(4[2-9])|(50)|(7[1-9])|(8[0-25-9])|(9[1-6]))";
const hasValidRegion = (withDate: WithDate): WithRegion | Error => {
  const { value } = withDate;

  if (new RegExp(`^.......${region}....$`).test(value)) {
    const [, , , , , , , r, r1] = value.split("");
    return {
      ...withDate,
      region: regionMap[`${r}${r1}` as keyof typeof regionMap],
    };
  } else {
    return new Error("Invalid region code.");
  }
};

const hasUniqueId = (withRegion: WithRegion): WithUniqueId | Error => {
  const { value } = withRegion;
  const [, uid2, uid1, uid] = value.split("").reverse();
  const isFemale = Number(uid) > 4;
  const index = Number(`${uid}${uid1}${uid2}`);
  return {
    ...withRegion,
    uniqueId: {
      sex: isFemale ? "female" : "male",
      index: isFemale ? index - 500 : index,
    },
  };
};

const hasValidControlNumber = (withUniqueId: WithUniqueId): Jmbg | Error => {
  const { value } = withUniqueId;

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
    ? { ...withUniqueId, controlNumber }
    : new Error(`Invalid control number.`);
};

export const validateJmbg = $(
  hasValidLength,
  $(hasValidDate, $(hasValidRegion, $(hasUniqueId, hasValidControlNumber)))
);
