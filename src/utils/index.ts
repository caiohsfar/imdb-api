export const concatArrayWithCommaSep = (array: string[]) => {
  return array.reduce(
    (accumulator: string, currentValue: string) =>
      `${accumulator}, ${currentValue}`
  );
};

export const getArrayFromStringSeparatedWithComma = (query: string) => {
  return String(query)
    .split(",")
    .map((actor) => String(actor.toLocaleLowerCase().trim()));
};
