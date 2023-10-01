import {
  Box,
  Button,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  TextField,
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
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          paddingX: '1rem',
        }}
        encType="multipart/form-data"
        onSubmit={handleSubmit(handleUpdateProduct)}
      >
        <input
          style={{ display: 'none' }}
          {...register('id', { required: true })}
        />

        <Box display="flex" justifyContent="center">
          <TextFieldImage
            register={register}
            animalId={animalData.id}
            name="imageData"
          />
        </Box>

        <TextFieldStyled
          errors={errors.name}
          label="Nome"
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
              defaultValue={animalData.sex}
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
              defaultValue={animalData.type}
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
          placeholder="Digite uma descrição para o animal."
          multiline
          rows={2}
          isOptional
          inputProps={{ maxLength: 255 }}
          {...register('description')}
        />

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

        <Button
          disabled={loading}
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
        >
          {loading ? 'Atualizando...' : 'Atualizar'}
        </Button>
      </Box>
    </>
  )
}
