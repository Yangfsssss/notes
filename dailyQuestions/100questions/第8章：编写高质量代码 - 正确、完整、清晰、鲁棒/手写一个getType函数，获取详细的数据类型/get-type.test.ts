/**
 * @description 获取详细的数据类型 test
 * @author Yang
 */

import { getType } from './get-type';

describe('获取详细的数据类型', () => {
  test('null', () => {
    expect(getType(null)).toBe('null');
  });

  test('undefined', () => {
    expect(getType(undefined)).toBe('undefined');
  });

  test('number', () => {
    expect(getType(100)).toBe('number');
    expect(getType(NaN)).toBe('number');
    expect(getType(Infinity)).toBe('number');
    expect(getType(-Infinity)).toBe('number');
    expect(getType(Number.MAX_VALUE)).toBe('number');
    expect(getType(Number.MAX_SAFE_INTEGER)).toBe('number');
    expect(getType(Number.MIN_VALUE)).toBe('number');
    expect(getType(Number.MIN_SAFE_INTEGER)).toBe('number');
    expect(getType(Number.POSITIVE_INFINITY)).toBe('number');
    expect(getType(Number.NEGATIVE_INFINITY)).toBe('number');
    expect(getType(Number.EPSILON)).toBe('number');
  });

  test('string', () => {
    expect(getType('abc')).toBe('string');
  });

  test('boolean', () => {
    expect(getType(true)).toBe('boolean');
  });

  test('symbol', () => {
    expect(getType(Symbol())).toBe('symbol');
  });

  test('bigint', () => {
    expect(getType(BigInt(100))).toBe('bigint');
  });

  test('object', () => {
    expect(getType({})).toBe('object');
  });

  test('array', () => {
    expect(getType([])).toBe('array');
  });

  test('function', () => {
    expect(getType(() => {})).toBe('function');
    expect(getType(class Foo {})).toBe('function');
  });

  test('map', () => {
    expect(getType(new Map())).toBe('map');
  });

  test('weakmap', () => {
    expect(getType(new WeakMap())).toBe('weakmap');
  });

  test('set', () => {
    expect(getType(new Set())).toBe('set');
  });

  test('weakset', () => {
    expect(getType(new WeakSet())).toBe('weakset');
  });

  test('date', () => {
    expect(getType(new Date())).toBe('date');
  });

  test('regexp', () => {
    expect(getType(new RegExp(''))).toBe('regexp');
  });

  test('error', () => {
    expect(getType(new Error())).toBe('error');
  });

  test('promise', () => {
    expect(getType(Promise.resolve())).toBe('promise');
  });
});
