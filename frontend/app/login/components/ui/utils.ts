// frontend/app/login/components/ui/utils.ts

// A simple type for things we can pass to `cn`
export type ClassValue = string | number | null | undefined | false;

/**
 * Join class names together, skipping falsy values.
 * Example: cn("a", condition && "b") -> "a b"
 */
export function cn(...inputs: ClassValue[]): string {
  return inputs.filter(Boolean).join(" ");
}
