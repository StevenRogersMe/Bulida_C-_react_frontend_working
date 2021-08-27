import transform from 'lodash/transform';
import isEqual from 'lodash/isEqual';
import isObject from 'lodash/isObject';

export function differenceDeep<T extends Record<string, any>>(
  object: T,
  base: T
): Partial<T> {
  return transform(object, (result: T, value: any, key: keyof T) => {
    if (!isEqual(value, base[key])) {
      result[key] =
        isObject(value) && isObject(base[key])
          ? differenceDeep(value, base[key])
          : value;
    }
  });
}
