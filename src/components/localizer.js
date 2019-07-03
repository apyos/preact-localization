import { h, cloneElement, toChildArray } from 'preact'
import translateMapping from '../lib/translate-mapping'
import { Context } from './provider'

export const Localizer = ({ children }) => (
  <Context.Consumer>
    {dictionary =>
      toChildArray(children).map(child =>
        cloneElement(child, translateMapping(child.props, dictionary))
      )
    }
  </Context.Consumer>
)
