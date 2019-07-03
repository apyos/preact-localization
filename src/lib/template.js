import dlv from 'dlv'

export default function template(string, fields) {
  return (
    string &&
    string.replace(/\{\{([\w.-]+)\}\}/g, (_, field) => {
      let value = dlv(fields, field)
      if (value == null) {
        return ''
      }

      // Allow for recursive {{config.xx}} references:
      if (typeof value === 'string' && value.match(/\{\{/)) {
        value = template(value, fields)
      }

      return value
    })
  )
}
