import { useState, useEffect } from 'react'
import {
  Box,
  TextField,
  Button,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
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
    getValues,
    reset,
    formState: { errors },
  } = useForm<CreateAnimal>({
    resolver: zodResolver(newAnimalFormSchema),
  })

  const { data } = useSelector((state: RootState) => state.users)

  const [haveImage, setHaveImage] = useState(false)
  const dispatch = useDispatch()

  function handleAddProduct(data: newAnimalFormData) {
    dispatch(createAnimalRequest(data, reset))
  }

  useEffect(() => {
    if (data && data.ongData) {
      setValue('ongId', data.ongData.id)
    }
    if (haveImage) {
      setValue('image', haveImage)
    }
  }, [setValue, data, haveImage])

  return (
    <>
      <Helmet title="Cadastro de animais" />

      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          paddingX: '1rem',
        }}
        encType="multipart/form-data"
        onSubmit={handleSubmit(handleAddProduct)}
      >
        <Box display="flex" justifyContent="center">
          <TextFieldImage
            register={register}
            name="imageData"
            setHaveImage={setHaveImage}
          />
        </Box>

        <input
          type="checkbox"
          style={{ display: 'none' }}
          {...register('image', {
            required: true,
          })}
        />

        <TextFieldStyled
          errors={errors.name}
          label="Nome"
          // inputProps={{ maxLength: 24 }}
          placeholder="Digite o nome do animal."
          {...register('name', {
            required: true,
          })}
        />
        <TextFieldStyled
          errors={errors.race}
          label="Raça"
          placeholder="Digite a raça do animal."
          {...register('race', {
            required: true,
          })}
        />

        <Box width="100%" display="flex" gap="2%">
          <TextFieldStyled
            errors={errors.color}
            label="Cor"
            placeholder="Digite a cor do animal."
            sx={{ width: '32%' }}
            {...register('color', {
              required: true,
            })}
          />
          <FormControl sx={{ width: '32%' }}>
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
          <FormControl sx={{ width: '32%' }}>
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
        </Box>

        <TextFieldStyled
          errors={errors.description}
          label="Descrição"
          placeholder="Digite a cor do animal."
          multiline
          rows={3}
          inputProps={{ maxLength: 255 }}
          {...register('description', {
            required: true,
          })}
        />

        <TextField
          InputLabelProps={{ shrink: true }}
          type="date"
          error={!!errors.birthday?.message}
          helperText={errors.birthday?.message}
          color="info"
          label="Data de Nascimento"
          fullWidth
          {...register('birthday', { required: true, valueAsDate: true })}
        />

        <Button variant="contained" color="success" type="submit" fullWidth>
          Cadastrar Animal
        </Button>
      </Box>
    </>
  )
}
