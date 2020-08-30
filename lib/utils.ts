export const toPercentage = (val: number, precision: number = 2): string => {
  return (val * 100).toFixed(precision) + '%';
};

export const toKiloBytes = (val: number, precision: number = 2): string => {
  return (val / 1024).toFixed(precision) + ' KB';
};
