import { Navbars } from '../../components/Navbars'

export const App: React.FC<{ children: any }> = ({ children }) => {
  return (
    <>
      <Navbars />
      <div>{children}</div>
    </>
  )
}
