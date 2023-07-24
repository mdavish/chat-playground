import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const objectKeys = <Obj extends object>(obj: Obj): (keyof Obj)[] =>
  Object.keys(obj) as (keyof Obj)[];
