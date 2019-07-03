import { h } from 'preact'
import { escapeHtml } from '../lib/util'
import { Text } from './text'
import { Localizer } from './localizer'

function Markup({ as, text, ...props }) {
  if (!text) {
    return text
  }

  const Element = as || 'span'
  return typeof text === 'string' ? (
    <Element
      {...props}
      dangerouslySetInnerHTML={{ __html: text.replace(/\n/g, '<br/>') }}
    />
  ) : (
    <Element>{text}</Element>
  )
}

export function MarkupText({ as, class: className, fields, ...props }) {
  for (let key in fields) {
    fields[key] = escapeHtml(new String(fields[key]))
  }

  return (
    <Localizer>
      <Markup
        as={as}
        class={className}
        text={<Text {...props} fields={fields} />}
      />
    </Localizer>
  )
}
