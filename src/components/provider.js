import { h, createContext } from 'preact'

export const Context = createContext()

export const IntlProvider = ({ children, dictionary }) => (
  <Context.Provider value={dictionary}>{children}</Context.Provider>
)
