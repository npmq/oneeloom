import { describe, expect, test } from 'bun:test'

// Smoke coverage for the public-api service boundary before runtime logic is added.
describe('service entrypoint', () => {
  test('keeps the source entrypoint importable', async () => {
    const module = await import('../src/index')

    expect(module).toBeDefined()
  })
})
