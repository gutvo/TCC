import { RootState } from '@Redux/store'
import { Stack } from '@mui/material'
import { useSelector } from 'react-redux'
import { NavLinkButton } from '../NavLinkButton'
import { Menu } from '@Components/Menu'
import { Home, Apartment, Chat, Pets, Add, List } from '@mui/icons-material'

export function NavLinkList() {
  const { data, isLogged } = useSelector((state: RootState) => state.users)

  return (
    <Stack direction="row" spacing={2}>
      <NavLinkButton href="/" label="Home" Icon={Home} />
      {isLogged && <NavLinkButton href="/chat" label="Chat" Icon={Chat} />}

      {!data?.ongData && (
        <NavLinkButton href="/animals" label="Animais" Icon={Pets} />
      )}
      <NavLinkButton href="/ongs" label="Organizações" Icon={Apartment} />
      {isLogged && data?.ongData && (
        <Menu
          list={[
            { label: 'Lista', path: '/animals', Icon: List },
            { label: 'Cadastrar', path: '/animal/cadastrar', Icon: Add },
          ]}
          name="Animais"
          Icon={Pets}
        />
      )}
    </Stack>
  )
}
