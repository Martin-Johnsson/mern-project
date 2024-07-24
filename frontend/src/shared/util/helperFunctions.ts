export const validateRequire = (value: string) => value.trim().length > 0;

export const validateMinLength = (value: string, validateBy: number) =>
  value.trim().length > validateBy;

export const validateMaxLength = (value: string, validateBy: number) =>
  value.trim().length <= validateBy;

export const validateMin = (value: string, validateBy: number) =>
  +value >= validateBy;

export const validateMax = (value: string, validateBy: number) =>
  +value <= validateBy;

export const validateEmail = (value: string) => /^\S+@\S+\.\S+$/.test(value);
