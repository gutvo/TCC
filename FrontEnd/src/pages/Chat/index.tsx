import { RootState } from '@Redux/store'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export function Chat() {
  const { isLogged } = useSelector((state: RootState) => state.users)
  const navigate = useNavigate()
  useEffect(() => {
    if (!isLogged) {
      navigate('/login')
      toast.info('Porfavor entre na sua conta ou cadastre-se')
    }
  }, [isLogged, navigate])

  return (
    <div>
      <Helmet title="Chat" />
      <div className="container">
        <h1>Pagina do Chat</h1>
      </div>
    </div>
  )
}
