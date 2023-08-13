import { Container } from '@mui/material'
import { Navbars } from '../../components/Navbars'

export const App: React.FC<{ children: any }> = ({ children }) => {
  // Navbar は "<Container maxWidth="xl">" とし body より大きくしている。
  // body は以下 window の幅段階的に幅が変化するようにしている。
  // (参照) https://mui.com/material-ui/customization/breakpoints/
  return (
    <>
      <Navbars />
      <Container fixed>{children}</Container>
    </>
  )
}
