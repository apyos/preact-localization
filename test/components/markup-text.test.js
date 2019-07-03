import { h, render } from 'preact'
import { setupScratch, teardown } from '../_util/helpers'
import { IntlProvider, MarkupText } from '../../src'

describe('<MarkupText>', () => {
  let scratch

  beforeEach(() => {
    scratch = setupScratch()
  })

  afterEach(() => {
    teardown(scratch)
  })

  it('should render nothing if no key or fallback is found', () => {
    render(<MarkupText />, scratch)

    expect(scratch.innerHTML).toBe('')
  })

  it('should fall back if not wrapped in a Provider', () => {
    render(
      <MarkupText>
        <b>FOO</b>
      </MarkupText>,
      scratch
    )

    expect(scratch.innerHTML).toBe('<span><b>FOO</b></span>')
  })

  it('should render multi-child fallback', () => {
    render(
      <MarkupText>
        This <b>is the fallback</b> with multiple children
      </MarkupText>,
      scratch
    )

    expect(scratch.innerHTML).toBe(
      '<span>This <b>is the fallback</b> with multiple children</span>'
    )
  })

  it('should render text', () => {
    render(
      <IntlProvider dictionary={{ foo: 'FOO!' }}>
        <div>
          <MarkupText id="foo" />
        </div>
      </IntlProvider>,
      scratch
    )

    expect(scratch.innerHTML).toBe('<div><span>FOO!</span></div>')
  })

  it('should render default when requested id is not present', () => {
    render(
      <IntlProvider dictionary={{ foo: { bar: 'BAR!' } }}>
        <div>
          <MarkupText id="asdf">
            <b>DEFAULT</b>
          </MarkupText>
        </div>
      </IntlProvider>,
      scratch
    )

    expect(scratch.innerHTML, '').toBe('<div><span><b>DEFAULT</b></span></div>')
  })

  it('should render html markup as markup', () => {
    render(
      <IntlProvider dictionary={{ foo: '<b>FOO</b>' }}>
        <div>
          <MarkupText id="foo" />
        </div>
      </IntlProvider>,
      scratch
    )

    expect(scratch.innerHTML, '').toBe('<div><span><b>FOO</b></span></div>')
  })

  it('should convert newlines to <br>', () => {
    render(
      <IntlProvider dictionary={{ foo: 'New\nline' }}>
        <div>
          <MarkupText id="foo" />
        </div>
      </IntlProvider>,
      scratch
    )

    expect(scratch.innerHTML, '').toBe('<div><span>New<br>line</span></div>')
  })

  it('should encode fields', () => {
    render(
      <IntlProvider dictionary={{ foo: '<b>{{message}}</b>' }}>
        <MarkupText
          id="foo"
          fields={{ message: '<script>alert("test")</script>' }}
        />
      </IntlProvider>,
      scratch
    )

    expect(scratch.innerHTML, '').toBe(
      '<span><b>&lt;script&gt;alert("test")&lt;/script&gt;</b></span>'
    )
  })

  it('should render as other element', () => {
    render(
      <IntlProvider dictionary={{ foo: 'FOO' }}>
        <MarkupText as="div" id="foo" />
      </IntlProvider>,
      scratch
    )

    expect(scratch.innerHTML).toBe('<div>FOO</div>')
  })
})
