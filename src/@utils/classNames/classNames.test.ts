import { describe, expect, it } from 'vitest'
import { classNames } from './classNames'

describe('classNames', () => {
  it('should concatenate strings', () => {
    expect(classNames('foo', 'bar')).toBe('foo bar')
  })

  it('should handle classes with spaces', () => {
    expect(classNames('foo bar', 'baz')).toBe('foo bar baz')
  })

  it('should handle numbers', () => {
    expect(classNames(123, 'foo')).toBe('123 foo')
  })

  it('should ignore falsy values', () => {
    expect(classNames(null, undefined, false, 'foo')).toBe('foo')
  })

  it('should handle conditional class', () => {
    expect(classNames('foo', { bar: true })).toBe('foo bar')
  })

  it('should handle conditional expressions', () => {
    const foo = true
    expect(classNames(foo ? 'foo' : 'bar')).toBe('foo')
  })

  it('should handle arrays of classes', () => {
    expect(classNames(['foo', 'bar'], 'baz')).toBe('foo bar baz')
  })

  it('should handle nested arrays of classes', () => {
    expect(classNames(['foo', ['bar', 'baz']])).toBe('foo bar baz')
  })

  it('should handle functions', () => {
    const func = () => 'foo'
    expect(classNames(func, 'bar')).toBe('foo bar')
  })

  it('should ignore functions with empty and falsy values', () => {
    const funcEmpty = () => ''
    const funcNull = () => null
    const funcFalse = () => false
    const funcUndefined = () => undefined
    expect(
      classNames('foo', funcNull, funcFalse, funcUndefined, funcEmpty),
    ).toBe('foo')
  })

  it('should handle functions returning various types', () => {
    const funcTrue = () => ({ foo: true })
    const funcFalse = () => ({ bar: false })
    const funcString = () => 'baz'
    expect(classNames(funcTrue, funcFalse, funcString)).toBe('foo baz')
  })

  it('should handle mixed argument types', () => {
    const func = () => 'baz'
    expect(classNames('foo', ['bar', { qux: true }], func, 123)).toBe(
      'foo bar qux baz 123',
    )
  })
})
