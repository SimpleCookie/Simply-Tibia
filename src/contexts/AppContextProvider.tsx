import { createContext, useState } from "react"
import { Pages } from "../Constants"

type AppContextType = [
  State,
  React.Dispatch<React.SetStateAction<State>>,
]
interface State {
  page: Pages
}
interface Props {
  children: React.ReactNode
}
export const AppContext = createContext(null as unknown as AppContextType)

export const AppContextProvider = ({ children }: Props) => {
  const [state, setState] = useState<State>({ page: Pages.Houses })
  const value: AppContextType = [
    state,
    setState,
  ]


  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
