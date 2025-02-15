import { expect, MockInstance, vi } from 'vitest'
import type {
  ConsoleMethod,
  ConsoleMockStrategyTypes,
  SpyMap,
} from './ConsoleMockStrategy.types'

/**
 * Implements a strategy for mocking and spying on console methods.
 */
export class ConsoleMockStrategyImpl implements ConsoleMockStrategyTypes {
  private readonly spies: SpyMap = new Map()

  /**
   * Creates a spy for a console method.
   * @param method - Console method to spy on ('log', 'warn', 'error').
   * @param callOriginal - If `false`, replaces the method with a mock implementation.
   * @returns Spy instance for the method.
   */
  createSpy(
    method: ConsoleMethod,
    callOriginal: boolean = true,
  ): MockInstance<(...args: unknown[]) => void> {
    let spy = this.spies.get(method)

    if (!spy) {
      spy = vi.spyOn(console, method)

      if (!callOriginal) {
        spy.mockImplementation(() => {})
      }

      this.spies.set(method, spy)
    }

    return spy
  }

  /**
   * Creates a spy for a console method.
   * @param method - Console method to spy on ('log', 'warn', 'error').
   * @param callOriginal - If `false`, replaces the method with a mock implementation.
   * @returns Spy instance for the method.
   */
  getSpy(method: ConsoleMethod) {
    return this.spies.get(method)
  }

  /**
   * Restores all mocked console methods to their original implementations.
   */
  restoreSpies(): void {
    this.spies.forEach(spy => spy.mockRestore())
    this.spies.clear()
  }

  /**
   * Clears the call history of all active spies.
   */
  clearSpies(): void {
    this.spies.forEach(spy => spy.mockClear())
  }

  /**
   * Checks if a console method was called with specific arguments.
   * @param method - Console method to check ('log', 'warn', 'error').
   * @param args - Arguments to verify.
   * @returns `true` if the method was called with the arguments, otherwise `false`.
   */
  wasMethodCalled(method: ConsoleMethod, args?: unknown[]): boolean {
    const spy = this.spies.get(method)

    if (!spy) {
      return false
    }

    if (args) {
      return spy.mock.calls.some(call => this.compareArgs(call, args))
    }

    return !!spy.mock.calls.length
  }

  /**
   * Verifies that a console method was called with specific arguments and a specific number of times.
   * @param method - Console method to verify ('log', 'warn', 'error').
   * @param expectedArgs - Expected arguments for each call.
   * @throws Error if the method was not mocked or if the calls do not match expectations.
   */
  verifyMethodCalls(method: ConsoleMethod, expectedArgs: unknown[]): void {
    const spy = this.spies.get(method)

    if (!spy) {
      throw new Error(`No spy found for console.${method}`)
    }

    expectedArgs.forEach((arg, i) => {
      expect(spy).toHaveBeenNthCalledWith(i + 1, arg)
    })

    expect(spy).toHaveBeenCalledTimes(expectedArgs.length)
  }

  /**
   * Compares two sets of arguments for equality.
   * @param actualArgs - Actual arguments passed to the method.
   * @param expectedArgs - Expected arguments.
   * @returns `true` if arguments match, otherwise `false`.
   */
  private compareArgs(actualArgs: unknown[], expectedArgs: unknown[]): boolean {
    if (actualArgs.length !== expectedArgs.length) {
      return false
    }

    return actualArgs.every((arg, i) => arg === expectedArgs[i])
  }
}

/**
 * Instance of `ConsoleMockStrategyImpl` for mocking and verifying console calls in tests.
 */
export const ConsoleMockStrategy = new ConsoleMockStrategyImpl()
