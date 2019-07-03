import { h, render } from 'preact'
import { setupScratch, teardown } from '../_util/helpers'
import { IntlProvider, Text } from '../../src'

describe('<Text>', () => {
  let scratch

  beforeEach(() => {
    scratch = setupScratch()
  })

  afterEach(() => {
    teardown(scratch)
  })

  it('should fall back if not wrapped in a Provider', () => {
    render(<Text>FOO</Text>, scratch)

    expect(scratch.innerHTML).toBe('FOO')
  })

  it('should render text without scope', () => {
    render(
      <IntlProvider dictionary={{ foo: 'FOO!' }}>
        <div>
          <Text id="foo" />
        </div>
      </IntlProvider>,
      scratch
    )

    expect(scratch.innerHTML).toBe('<div>FOO!</div>')
  })

  it('should render html markup as string data, not markup', () => {
    render(
      <IntlProvider dictionary={{ foo: '<b>FOO</b>' }}>
        <div>
          <Text id="foo" />
        </div>
      </IntlProvider>,
      scratch
    )

    expect(scratch.innerHTML, '').toBe('<div>&lt;b&gt;FOO&lt;/b&gt;</div>')
  })

  it('should render default when requested id is not present', () => {
    render(
      <IntlProvider dictionary={{ foo: { bar: 'BAR!' } }}>
        <div>
          <Text id="asdf">DEFAULT</Text>
        </div>
      </IntlProvider>,
      scratch
    )

    expect(scratch.innerHTML, '').toBe('<div>DEFAULT</div>')
  })
})
