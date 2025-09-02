import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility for combining conditional class names
 * with Tailwind-aware merging (so conflicting classes don’t stack).
 */
export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
