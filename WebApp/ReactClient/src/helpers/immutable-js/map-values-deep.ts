/* eslint-disable no-use-before-define */
import mapValues from 'lodash/mapValues';
import isPlainObject from 'lodash/isPlainObject';
import { Record, RecordOf } from 'immutable';

function mapObject(
  obj: any,
  prefix: string,
  mapper: (value: any, key: string) => any
) {
  return mapValues(obj, (value, key) =>
    mapNode(value, `${prefix}${key}`, mapper)
  );
}

function mapRecord(
  record: Record<any>,
  prefix: string,
  mapper: (value: any, key: string) => any
) {
  return Array.from(record[Symbol.iterator]()).reduce(
    (merged, [key, value]) => {
      merged[key] = mapNode(value, `${prefix}${key.toString()}`, mapper);
      return merged;
    },
    {}
  );
}

function mapLeaf(
  value: any,
  key: string,
  mapper: (value: any, key: string) => any
) {
  return mapper(value, key);
}

function mapNode(
  obj: any,
  prefix: string,
  mapper: (value: any, key: string) => any
) {
  const nestedPrefix = prefix ? `${prefix}.` : '';
  if (Record.isRecord(obj)) {
    return mapRecord(obj, nestedPrefix, mapper);
  } else if (isPlainObject(obj)) {
    return mapObject(obj, nestedPrefix, mapper);
  }

  return mapLeaf(obj, prefix, mapper);
}

export function mapValuesDeep<T, E>(
  obj: RecordOf<T> | T,
  mapper: (value: any, key: string) => E
): { [P in keyof T]-?: E } {
  return mapNode(obj, '', mapper);
}
