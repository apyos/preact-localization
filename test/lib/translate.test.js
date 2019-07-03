import translate from '../../src/lib/translate'

describe('translate()', () => {
  it('should use correct pluralization', () => {
    const dictionary = {
      pluralization: {
        none: 'none',
        one: 'one',
        many: 'many'
      }
    }

    expect(translate('pluralization', dictionary, null, 0)).toBe('none')
    expect(translate('pluralization', dictionary, null, 1)).toBe('one')
    expect(translate('pluralization', dictionary, null, 2)).toBe('many')
    expect(translate('pluralization', dictionary, null, 10)).toBe('many')
  })

  it('should work with plural key without pluralization object', () => {
    const dictionary = {
      pluralization: 'text'
    }

    expect(translate('pluralization', dictionary, null, 0)).toBe('text')
    expect(translate('pluralization', dictionary, null, 1)).toBe('text')
    expect(translate('pluralization', dictionary, null, 2)).toBe('text')
    expect(translate('pluralization', dictionary, null, 10)).toBe('text')
  })
})
