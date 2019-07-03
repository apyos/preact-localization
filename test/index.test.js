import { IntlProvider, Text, MarkupText } from '../src'

describe('preact-localization', () => {
  it('should export things', () => {
    expect(typeof IntlProvider).toBe('function')
    expect(typeof Text).toBe('function')
    expect(typeof MarkupText).toBe('function')
  })
})
