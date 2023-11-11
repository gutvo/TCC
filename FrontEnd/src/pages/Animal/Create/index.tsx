import { useEffect } from 'react'
import {
  Box,
  TextField,
  Button,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Grid,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '@Redux/animals/slice'
import { RootState } from '@Redux/store'

import { newAnimalFormData } from '@Interfaces/pages/animals'
import { CreateAnimal, newAnimalFormSchema } from './validations'
import { TextFieldStyled } from '@Components/TextFieldStyled'
import { TextFieldImage } from '@Components/TextFieldImage'
import { Helmet } from 'react-helmet-async'

export function CreateAnimalForm() {
  const { createAnimalRequest } = actions
  const {
    handleSubmit,
    register,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CreateAnimal>({
    resolver: zodResolver(newAnimalFormSchema),
  })

  const { data } = useSelector((state: RootState) => state.users)

  const { loading } = useSelector((state: RootState) => state.animals)

  const dispatch = useDispatch()

  function handleAddProduct(data: newAnimalFormData) {
    dispatch(createAnimalRequest(data, reset))
  }

  useEffect(() => {
    if (data && data.ongData) {
      setValue('ongId', data.ongData.id)
    }
  }, [setValue, data])

  return (
    <>
      <Helmet title="Cadastro de animais" />

      <Box
        component="form"
        encType="multipart/form-data"
        sx={{ display: 'flex', justifyContent: 'center' }}
        onSubmit={handleSubmit(handleAddProduct)}
      >
        <Grid container spacing={4} maxWidth="60rem">
          <Grid item xs={12} display="flex" justifyContent="center">
            <TextFieldImage register={register} name="imageData" />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextFieldStyled
              errors={errors.name}
              label="Nome"
              placeholder="Digite o nome do animal."
              {...register('name', {
                required: true,
              })}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextFieldStyled
              errors={errors.race}
              label="Raça"
              placeholder="Digite a raça do animal."
              {...register('race', {
                required: true,
              })}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextFieldStyled
              errors={errors.color}
              label="Cor"
              fullWidth
              placeholder="Digite a cor do animal."
              {...register('color', {
                required: true,
              })}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <InputLabel>Sexo</InputLabel>
              <Select
                error={!!errors.sex?.message}
                label="Sexo"
                defaultValue=""
                displayEmpty
                {...register('sex', { required: true })}
              >
                <MenuItem value={'Macho'}>Macho</MenuItem>
                <MenuItem value={'Fêmea'}>Fêmea</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <InputLabel>Animal</InputLabel>
              <Select
                error={!!errors.sex?.message}
                label="Tipo"
                defaultValue=""
                displayEmpty
                {...register('type', { required: true })}
              >
                <MenuItem value={'Cachorro'}>Cachorro</MenuItem>
                <MenuItem value={'Gato'}>Gato</MenuItem>
                <MenuItem value={'Peixe'}>Peixe</MenuItem>
                <MenuItem value={'Outros'}>Outros</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              InputLabelProps={{ shrink: true }}
              type="date"
              error={!!errors.birthday?.message}
              helperText={errors.birthday?.message}
              color="info"
              label="Data de Nascimento"
              min="2020-01-01"
              max="2018-12-31"
              fullWidth
              {...register('birthday', {
                required: true,
                min: '2020-01-01',
                max: '2023-01-01',
              })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextFieldStyled
              errors={errors.description}
              label="Descrição"
              placeholder="Digite a descrição do animal."
              multiline
              rows={3}
              isOptional
              inputProps={{ maxLength: 255 }}
              {...register('description')}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              disabled={loading}
              variant="contained"
              color="success"
              type="submit"
              fullWidth
            >
              Cadastrar Animal
              {loading ? 'Cadastrando...' : 'Cadastrar Animal'}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}
