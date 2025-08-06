import { Transform } from "class-transformer";

/**
 * Decorator que transforma el email a minúsculas y elimina espacios
 */
export function EmailTransform() {
  return Transform(({ value }) => {
    if (typeof value === "string") {
      return value.toLowerCase().trim();
    }
    return value;
  });
}
