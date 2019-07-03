import translate from './translate'
import { Text } from '../components/text'

export default function translateMapping(props, dictionary) {
  const out = {}

  for (const name in props) {
    if (props.hasOwnProperty(name) && props[name]) {
      const def = props[name]

      if (def.type === Text) {
        const { props } = def
        out[name] = translate(
          props.id,
          dictionary,
          props.fields,
          props.plural,
          props.children
        )
      }
    }
  }

  return out
}
