import {
  Typography,
  Box,
  TextField,
  Button,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '@Redux/animals/slice'
import { RootState } from '@Redux/store'
import { useEffect } from 'react'

interface newAnimalFormData {
  ongId: number
  name: string
  race: string
  color: string
  sex: 'Macho' | 'Fêmea'
  description: string
  type: 'Cachorro' | 'Peixe' | 'Gato' | 'Outros'
  birthday: Date
  image: boolean
  imagesData: FileList
}

const newAnimalFormValidationSchema = zod.object({
  ongId: zod.number(),
  name: zod.string().min(2, 'O nome é obrigatório'),
  race: zod.string().min(2, 'A raça é obrigatório'),
  color: zod.string().min(2, 'A color é obrigatório'),
  sex: zod.union([zod.literal('Macho'), zod.literal('Fêmea')]),
  description: zod.string().max(255, 'Não passe do Limite de 255 caracteres'),

  type: zod.union([
    zod.literal('Cachorro'),
    zod.literal('Peixe'),
    zod.literal('Gato'),
    zod.literal('Outros'),
  ]),
  birthday: zod.date(),
  imagesData: zod.instanceof(FileList),
  image: zod.boolean(),
})

type Animal = zod.infer<typeof newAnimalFormValidationSchema>

export default function CreateAnimal() {
  const { createAnimalRequest } = actions
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
    watch,
  } = useForm<Animal>({
    resolver: zodResolver(newAnimalFormValidationSchema),
  })

  const { data } = useSelector((state: RootState) => state.users)
  const dispatch = useDispatch()
  const imageBoolean = !!watch('imagesData')?.length
  function handleAddProduct(data: newAnimalFormData) {
    dispatch(createAnimalRequest(data))
  }

  useEffect(() => {
    if (data) {
      setValue('ongId', data.id)
    }
  }, [setValue, data])

  console.log(errors)
  return (
    <Box>
      <Typography sx={{ textAlign: 'center' }} variant="h3" fontWeight={'bold'}>
        Formulário de cadastro de animais
      </Typography>
      <form
        style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        encType="multipart/form-data"
        onSubmit={handleSubmit(handleAddProduct)}
      >
        <input
          type="number"
          style={{ display: 'none' }}
          {...register('ongId', {
            required: true,
            valueAsNumber: true,
          })}
        />
        <input
          type="checkbox"
          style={{ display: 'none' }}
          {...register('image', {
            required: true,
            value: Boolean(imageBoolean === true),
          })}
        />

        <TextField
          InputLabelProps={{ shrink: true }}
          error={!!errors.name?.message}
          helperText={errors.name?.message}
          placeholder="Digite o nome do animal"
          type="text"
          label={'Nome'}
          color="info"
          fullWidth
          {...register('name', { required: true })}
        />
        <TextField
          placeholder="Digite a Raça do animal"
          InputLabelProps={{ shrink: true }}
          type="text"
          error={!!errors.race?.message}
          helperText={errors.race?.message}
          color="info"
          label="Raça"
          fullWidth
          {...register('race', { required: true })}
        />
        <Box width="100%" display="flex" gap="2%">
          <TextField
            placeholder="Digite a cor do animal"
            InputLabelProps={{ shrink: true }}
            type="text"
            error={!!errors.color?.message}
            helperText={errors.color?.message}
            color="info"
            label="Cor"
            sx={{ width: '32%' }}
            {...register('color', { required: true })}
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
        <TextField
          InputLabelProps={{ shrink: true }}
          type="text"
          error={!!errors.description?.message}
          helperText={errors.description?.message}
          color="info"
          multiline
          rows={2}
          inputProps={{ maxLength: 255 }}
          label="Descrição"
          fullWidth
          {...register('description', { required: true })}
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
        <TextField
          InputLabelProps={{ shrink: true }}
          type="file"
          error={!!errors.imagesData?.message}
          helperText={errors.imagesData?.message}
          color="info"
          fullWidth
          {...register('imagesData')}
        />
        <Button variant="contained" color="success" type="submit" fullWidth>
          Cadastrar Animal
        </Button>
      </form>
    </Box>
  )
}
