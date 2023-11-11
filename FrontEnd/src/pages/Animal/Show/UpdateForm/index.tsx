import {
  Box,
  Button,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  TextField,
  Grid,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDispatch } from 'react-redux'
import { actions } from '@Redux/animals/slice'
import { UpdateAnimalFormData } from '@Interfaces/pages/animals'
import { UpdateAnimal, updateAnimalFormSchema } from './validations'
import { TextFieldStyled } from '@Components/TextFieldStyled'
import { useEffect } from 'react'
import { AnimalData } from '@Interfaces/redux/animals'
import { TextFieldImage } from '@Components/TextFieldImage'
import { convertDate } from '@Functions'

interface FormAnimalProps {
  animalData: AnimalData
  loading: boolean
}

export function FormAnimal({ animalData, loading }: FormAnimalProps) {
  const { updateAnimalRequest } = actions

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<UpdateAnimal>({
    resolver: zodResolver(updateAnimalFormSchema),
  })

  useEffect(() => {
    setValue('birthday', convertDate(animalData.birthday))
    setValue('color', animalData.color)
    setValue('description', animalData.description)
    setValue('name', animalData.name)
    setValue('race', animalData.race)
    setValue('id', animalData.id)
  }, [animalData, setValue])

  const dispatch = useDispatch()

  function handleUpdateProduct(data: UpdateAnimalFormData) {
    const formatData = {
      ...data,
      previewImage: animalData.previewImage,
      birthday: convertDate(data.birthday),
    }
    dispatch(updateAnimalRequest(formatData))
  }
  return (
    <>
      <Box
        component="form"
        encType="multipart/form-data"
        sx={{ display: 'flex', justifyContent: 'center' }}
        onSubmit={handleSubmit(handleUpdateProduct)}
      >
        <Grid container spacing={4} maxWidth="60rem">
          <input
            style={{ display: 'none' }}
            {...register('id', { required: true })}
          />

          <Grid item xs={12} display="flex" justifyContent="center">
            <TextFieldImage
              register={register}
              animalId={animalData.id}
              name="imageData"
            />
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
                defaultValue={animalData ? animalData.sex : ''}
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
                defaultValue={animalData ? animalData.type : ''}
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
              color="primary"
              type="submit"
              fullWidth
            >
              {loading ? 'Atualizando...' : 'Atualizar'}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}
