import { Step } from "../types";

export const classNames = (...classes: string[]) =>
  classes.filter(Boolean).join(" ");

export function flattenSteps(arr: any, level = 0): Step[] {
  if (arr.length === 0) {
    return [];
  }
  if (level === 0) {
    return arr;
  }
  let newArr: any = [];
  arr.forEach((el: any) => {
    if (el.steps) {
      newArr = newArr.concat(flattenSteps(el.steps, level - 1));
    } else {
      newArr.push(el);
    }
  });
  return newArr;
}
