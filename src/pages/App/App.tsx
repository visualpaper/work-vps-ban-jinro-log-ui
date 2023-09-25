import { Container } from '@mui/material'
import { Navbars } from '../../components/Navbars'
import { Fragment, useEffect, useState } from 'react'
import { User, UserProvider } from '../UserContext'
import {
  InitializeMutation,
  useInitializeMutation,
} from '../../types/generated/query'
import { graphqlRequestClient } from '../../common/client'

export const App: React.FC<{ children: any }> = ({ children }) => {
  const [loginUser, setLoginUser] = useState<User | null>(null)
  const { isLoading, mutate } = useInitializeMutation(graphqlRequestClient, {
    onSuccess: ({ initialize }: InitializeMutation) => {
      setLoginUser({
        id: initialize.id,
        villageNumbers: initialize.villageNumbers.map((v) => Number(v)),
      })
    },
    // 本 API が失敗した場合はそのまま ErrorBoundary に飛ばす。
    useErrorBoundary: true,
  })

  /**
   * https://reactjs.org/docs/strict-mode.html#ensuring-reusable-state いわく 2 回呼ばれるらしい。
   * 開発時にのみ発生するらしいので要注意
   */
  useEffect(() => {
    mutate({})
  }, [])

  if (isLoading) {
    return <Fragment />
  }

  // Navbar は "<Container maxWidth="xl">" とし body より大きくしている。
  // body は以下 window の幅段階的に幅が変化するように top に <Container fixed> を設定している。
  // (参照) https://mui.com/material-ui/customization/breakpoints/
  return (
    <UserProvider loginUser={loginUser || null} setLoginUser={setLoginUser}>
      <Navbars />
      <Container fixed>{children}</Container>
    </UserProvider>
  )
}
