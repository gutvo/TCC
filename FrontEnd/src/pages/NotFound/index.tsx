import { Typography } from '@mui/material'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export function NotFound() {
  const navigation = useNavigate()
  useEffect(() => navigation('/'), [navigation])
  return (
    <div>
      <div className="container">
        <Typography variant="h2" align="center" color="error">
          Página Não Encontrada
        </Typography>
      </div>
    </div>
  )
}
