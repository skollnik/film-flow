export {};

export function validate(type: string, value: string) {
  if (type === "title" || type === "director") {
    if (value.trim().length < 1) return false;
    return true;
  }
  return false;
}
