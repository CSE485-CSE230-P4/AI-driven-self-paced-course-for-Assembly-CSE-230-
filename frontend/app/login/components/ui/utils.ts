// frontend/app/login/components/ui/utils.ts

// A simple type for things we can pass to `cn`
export type ClassValue =
  | string
  | number
  | null
  | undefined
  | false
  | Record<string, boolean | null | undefined>;

/**
 * Join class names together, skipping falsy values.
 * Supports strings, numbers, and objects with boolean values.
 * Example: cn("a", condition && "b", { "c": true, "d": false }) -> "a b c"
 */
export function cn(...inputs: (ClassValue | ClassValue[])[]): string {
  const classes: string[] = [];

  for (const input of inputs) {
    if (!input) continue;

    if (typeof input === "string" || typeof input === "number") {
      classes.push(String(input));
    } else if (Array.isArray(input)) {
      const inner = cn(...input);
      if (inner) classes.push(inner);
    } else if (typeof input === "object") {
      for (const [key, value] of Object.entries(input)) {
        if (value) classes.push(key);
      }
    }
  }

  return classes.filter(Boolean).join(" ");
}
