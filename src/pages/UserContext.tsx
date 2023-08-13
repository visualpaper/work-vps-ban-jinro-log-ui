import { createContext, ReactNode, FC } from 'react'

export interface User {
  id: string
  villageNumbers: number[]
}

export const UserContext = createContext<{
  user: User | null
  setUser: (user: User | null) => void
}>({
  user: null,
  setUser: () => {},
})

interface UserProviderProps {
  loginUser: User | null
  setLoginUser: (user: User | null) => void
  children: ReactNode
}

export const UserProvider: FC<UserProviderProps> = (props) => {
  const { loginUser, setLoginUser, children } = props

  return (
    <UserContext.Provider
      value={{
        user: loginUser,
        setUser: setLoginUser,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
