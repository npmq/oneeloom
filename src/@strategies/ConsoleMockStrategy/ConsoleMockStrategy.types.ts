import { MockInstance } from 'vitest'

/**
 * Console methods that can be mocked.
 * Includes 'log', 'warn', 'error', 'info', and 'debug'.
 */
export type ConsoleMethod = 'log' | 'warn' | 'error' | 'info' | 'debug'

/**
 * Map of console methods to their mock instances.
 * Used to store and manage spies for console methods.
 */
export type SpyMap = Map<
  ConsoleMethod,
  MockInstance<(...args: unknown[]) => void>
>

/**
 * Defines the interface for mocking and verifying console methods.
 * Provides methods to create spies, restore original behavior, clear call history, and verify calls.
 */
export interface ConsoleMockStrategyTypes {
  /**
   * Creates a spy for a console method.
   * @param method - Console method to spy on.
   * @returns Spy instance for the method.
   */
  createSpy(method: ConsoleMethod): MockInstance<(...args: unknown[]) => void>

  /**
   * Restores all mocked console methods to their original implementations.
   */
  restoreSpies(): void

  /**
   * Clears the call history of all active spies.
   */
  clearSpies(): void

  /**
   * Checks if a console method was called with specific arguments.
   * @param method - Console method to check.
   * @param args - Arguments to verify.
   * @returns `true` if the method was called with the arguments, otherwise `false`.
   */
  wasMethodCalled(method: ConsoleMethod, args?: unknown[]): boolean

  /**
   * Verifies that a console method was called with specific arguments and a specific number of times.
   * @param method - Console method to verify.
   * @param expectedArgs - Expected arguments for each call.
   * @throws Error if the method was not mocked or if the calls do not match expectations.
   */
  verifyMethodCalls(method: ConsoleMethod, expectedArgs: unknown[]): void
}
