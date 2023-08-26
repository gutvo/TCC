import { Typography } from '@mui/material'
import { useLocation } from 'react-router-dom'

interface titleProps {
  title: string
  path: string
}

export function DictionaryPaths() {
  const locations = useLocation().pathname
  const titles: titleProps[] = [
    { title: 'Home', path: '/' },
    { title: 'Lista de Animais', path: '/animals' },
    { title: 'Animal', path: '/animal' },
    { title: 'Cadastro de Animais', path: '/animal/cadastrar' },
    { title: 'Login', path: '/login' },
    { title: 'Cadastro de conta', path: '/cadastro' },
    { title: 'Perfil', path: '/usuario' },
    { title: 'Chat', path: '/chat' },
    {
      title: 'Lista das Organizações',
      path: '/ongs',
    },
    { title: 'Organização', path: '/ong' },
  ]
  const titleFromHelmet = titles.filter((item) => item.path === locations)
  return (
    <Typography width="60%" variant="h6" noWrap fontWeight="bold">
      {titleFromHelmet[0].title}
    </Typography>
  )
}
