import template from '../../src/lib/template'

describe('template()', () => {
  it('should leave fieldless unmodified', () => {
    expect(template('foo')).toBe('foo')
    expect(template('{foo}')).toBe('{foo}')
    expect(template('{{foo\\}}')).toBe('{{foo\\}}')
    expect(template('a{{$$}}')).toBe('a{{$$}}')
  })

  it('should inject top-level fields', () => {
    const FIELDS = {
      foo: 'FOO',
      bar: 'baz'
    }

    expect(template('{{foo}}', FIELDS)).toBe('FOO')
    expect(template('{{foo}}{{bar}}', FIELDS)).toBe('FOObaz')
    expect(template('a {{foo}} b {{bar}} c', FIELDS)).toBe('a FOO b baz c')
  })

  it('should inject nested fields', () => {
    const FIELDS = {
      foo: {
        bar: {
          baz: 'bat'
        }
      },
      arr: ['a', { b: 1 }]
    }

    expect(template('{{foo.bar.baz}}', FIELDS)).toBe('bat')
    expect(template('{{foo.bar}}', FIELDS)).toBe('[object Object]')
    expect(template('{{arr.0}}', FIELDS)).toBe('a')
    expect(template('{{arr.1.b}}', FIELDS)).toBe('1')
  })

  it('should support recursive field injection', () => {
    const FIELDS = {
      first: '1{{second}}2',
      second: '3{{third}}4',
      third: 'THIRD'
    }

    expect(template('{{first}}', FIELDS)).toBe('13THIRD42')
  })

  it('should replace empty fields with the empty string', () => {
    const FIELDS = {
      baz: 'baz'
    }

    expect(template('{{foo}}', FIELDS)).toBe('')
    expect(template('{{foo.bar}}', FIELDS)).toBe('')
    expect(template('Fooey {{foo.bar}}', FIELDS)).toBe('Fooey ')
    expect(template('Fooey {{foo.bar}} {{baz}}', FIELDS)).toBe('Fooey  baz')
  })

  it('should replace fields with falsey values', () => {
    const FIELDS = {
      foo: 0,
      bar: false
    }

    expect(template('{{foo}}', FIELDS)).toBe('0')
    expect(template('{{bar}}', FIELDS)).toBe('false')
  })
})
