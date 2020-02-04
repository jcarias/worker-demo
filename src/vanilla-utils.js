export const arraySum = (array, summingFn, initValue = 0) => {
  let accumulator = initValue;

  for (let i = 0; i < array.length; i++) {
    const currentElem = array[i];
    accumulator = summingFn(accumulator, currentElem);
  }

  return accumulator;
};

export function getRndInteger(min = 0, max = 100) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
