import { h } from 'preact'
import translate from '../lib/translate'
import { Context } from './provider'

export const Text = ({ id, children, plural, fields }) => (
  <Context.Consumer>
    {dictionary => translate(id, dictionary, fields, plural, children)}
  </Context.Consumer>
)
