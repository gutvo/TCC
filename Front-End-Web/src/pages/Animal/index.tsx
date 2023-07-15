import { useEffect, useState, useCallback } from 'react'
import { getAnimais } from '../../services/apiAnimal'
import loadGif from '../../images/loadGif.gif'
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Pagination,
  Typography,
  Input,
} from '@mui/material'
// import { Button } from "../../components/Button";

// eslint-disable-next-line no-unused-vars
interface Animal {
  id: number
  name: string
  race: string
  color: string
  sex: 'Macho' | 'Fêmea'
  description: string
  type: 'Cachorro' | 'Peixe' | 'Gato' | 'outros'
  birthday: string
  image: boolean
  imagem: string
}

// eslint-disable-next-line no-redeclare
export function Animal() {
  const [animais, setAnimais] = useState<Animal[] | null>([])
  const [pagina, setPagina] = useState(1)
  const [filtro, setFiltro] = useState('')
  const [limite, setLimite] = useState(12)
  const [total, setTotal] = useState()

  const pegarAnimais = useCallback(async () => {
    try {
      const response = await getAnimais(pagina, limite, filtro)
      if (Array.isArray(response.animais)) {
        setAnimais(response.animais)
        setTotal(response.total_paginas)
      }
    } catch (erro) {
      setAnimais(null)
    }
  }, [pagina, limite, filtro])

  useEffect(() => {
    setPagina(1)
  }, [filtro, limite])

  useEffect(() => {
    pegarAnimais()
  }, [pagina, limite, filtro, pegarAnimais])
  return (
    <>
      <Input
        type="text"
        value={filtro}
        onChange={(event) => {
          setFiltro(event.target.value)
        }}
        fullWidth
      />

      {animais != null && animais !== undefined ? (
        <>
          <Grid container spacing={6} justifyContent={'center'}>
            {animais.map((animal) => (
              <Grid item key={animal.id}>
                <Card
                  sx={{
                    width: '20rem',
                    height: '28rem',
                    borderRadius: 3,
                    ':hover': {
                      transform: 'scale(1.2)',
                      transition: '400ms',
                    },
                  }}
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height={'250'}
                      image={animal.imagem}
                      alt={animal.type}
                    />
                    <CardContent sx={{ height: '100%' }}>
                      <Typography gutterBottom variant="h5" component="div">
                        {animal.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {animal.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Pagination
            boundaryCount={1}
            sx={{ display: 'flex', justifyContent: 'center', paddingY: 4 }}
            count={total}
            shape="rounded"
            variant="outlined"
            size="large"
            onChange={(_, value) => {
              setPagina(value)
            }}
          />
        </>
      ) : (
        <div className="carregandoImagem">
          <img src={loadGif} alt="Carregando" />
        </div>
      )}
    </>
  )
}
