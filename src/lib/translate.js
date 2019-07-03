import dlv from 'dlv'
import template from './template'

export default function translate(
  id,
  dictionary,
  fields,
  plural,
  fallback = null
) {
  let value = dictionary && id && dlv(dictionary, id)

  if ((plural || plural === 0) && value && typeof value === 'object') {
    if (plural === 0) {
      value = value.none
    } else if (plural === 1) {
      value = value.one
    } else {
      value = value.many
    }
  }

  return (value && template(value, fields)) || fallback
}
