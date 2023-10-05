import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export function NotFound() {
  const navigation = useNavigate()
  useEffect(() => navigation('/'), [navigation])
  return <></>
}
