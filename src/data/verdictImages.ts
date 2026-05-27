const range = (group: string, count: number) =>
  Array.from({ length: count }, (_, index) => (
    `/verdicts/${group}/${group}-${String(index + 1).padStart(2, '0')}.png`
  ));

const stalking = range('stalking', 6);

export const verdictImages = {
  academy: range('academy', 19),
  civil: range('civil', 10),
  classAction: range('class-action', 7),
  construction: range('construction', 20),
  constructionCriminal: range('construction-criminal', 5),
  defect: range('defect', 10),
  drug: range('drug', 5),
  economicCrime: range('economic-crime', 7),
  generalCriminal: [...range('general-criminal', 10), ...stalking],
  jeonseFraud: range('jeonse-fraud', 14),
  juvenileSchool: range('juvenile-school', 5),
  realEstate: range('real-estate', 31),
  resaleCancellation: range('resale-cancellation', 22),
  sexCrime: range('sex-crime', 17),
  stalking,
  traffic: range('traffic', 10),
  voicePhishing: range('voice-phishing', 4),
} as const;

export type VerdictImageGroup = keyof typeof verdictImages;
