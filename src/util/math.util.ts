export const roundTo2Digits = (inputFloat: number): string =>
  (Math.round(inputFloat * 100) / 100).toFixed(2);
