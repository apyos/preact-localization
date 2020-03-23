import { h, render } from 'preact'
import { setupScratch, teardown } from '../_util/helpers'
import { IntlProvider, Localizer, Text } from '../../src'

describe('<Localizer>', () => {
  let scratch

  beforeEach(() => {
    scratch = setupScratch()
  })

  afterEach(() => {
    teardown(scratch)
  })

  it('should translate any <Text> props on its child', () => {
    render(
      <IntlProvider dictionary={{ input: { pl: 'type a name' } }}>
        <Localizer>
          <input
            placeholder={<Text id="input.pl" />}
            title={<Text id="input.title">blah</Text>}
            type="email"
            minlength={0}
            maxlength={1}
            required
          />
        </Localizer>
      </IntlProvider>,
      scratch
    )

    expect(scratch.innerHTML).toBe(
      `<input placeholder="type a name" title="blah" type="email" minlength="0" maxlength="1" required="">`
    )
  })
})
