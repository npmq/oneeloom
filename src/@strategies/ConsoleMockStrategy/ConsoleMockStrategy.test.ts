import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { ConsoleMockStrategyImpl } from '.'

describe('ConsoleMockStrategyImpl', () => {
  let consoleMockStrategy: ConsoleMockStrategyImpl

  beforeEach(() => {
    consoleMockStrategy = new ConsoleMockStrategyImpl()
  })

  afterEach(() => {
    consoleMockStrategy.restoreSpies()
  })

  it('should create a spy for console.log', () => {
    const spy = consoleMockStrategy.createSpy('log')

    expect(spy).toBeDefined()
    expect(typeof spy.mockImplementation).toBe('function')

    expect(consoleMockStrategy.getSpy('log')).toBe(spy)
  })

  it('should call original console.log method if callOriginal is true', () => {
    const originalLog = vi.spyOn(console, 'log')
    const spy = consoleMockStrategy.createSpy('log')

    console.log('Original Call')

    expect(spy).toHaveBeenCalledWith('Original Call')
    expect(originalLog).toHaveBeenCalledWith('Original Call')

    originalLog.mockRestore()
  })

  it('should not call original console.log method if callOriginal is false', () => {
    const originalLog = vi.spyOn(console, 'log')
    const spy = consoleMockStrategy.createSpy('log', false)

    console.log('Not Original Message Console')

    expect(spy).toHaveBeenCalledWith('Not Original Message Console')
    expect(originalLog).not.toHaveBeenCalledWith()

    originalLog.mockRestore()
  })

  it('should verify that console method was called with expected arguments', () => {
    consoleMockStrategy.createSpy('error')

    console.error('Error Message!')
    console.error('Another Error!')

    consoleMockStrategy.verifyMethodCalls('error', [
      'Error Message!',
      'Another Error!',
    ])
  })

  it('should clear spies', () => {
    const spy = consoleMockStrategy.createSpy('log')

    console.log('Message')

    expect(spy).toHaveBeenCalled()
    consoleMockStrategy.clearSpies()
    expect(spy).not.toHaveBeenCalled()

    console.log('Another Message')

    expect(spy).toHaveBeenCalledWith('Another Message')
  })

  it('should restore spies', () => {
    const originalLog = vi.spyOn(console, 'log')
    const spy = consoleMockStrategy.createSpy('log')

    consoleMockStrategy.restoreSpies()

    expect(consoleMockStrategy.getSpy('log')).toBeUndefined()

    console.log('Others Message')

    expect(spy).not.toHaveBeenCalledWith('Others Message')

    originalLog.mockRestore()
  })

  it('should correctly compare arguments when called with matching args', () => {
    consoleMockStrategy.createSpy('log')

    console.log('Message A', 'Message B', 123)

    expect(
      consoleMockStrategy.wasMethodCalled('log', [
        'Message A',
        'Message B',
        123,
      ]),
    ).toBe(true)
  })

  it('should return false when called with non-matching args', () => {
    consoleMockStrategy.createSpy('log')

    console.log('Message C', 'Message D', 456)

    expect(
      consoleMockStrategy.wasMethodCalled('log', [
        'Message C',
        'Message A',
        123,
      ]),
    ).toBe(false)
  })
})
