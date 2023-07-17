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
// import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import axios from 'axios'
interface NewAnimalFormData {
  name: string
  race: string
  color: string
  sex: 'Macho' | 'Fêmea'
  description: string
  type: 'Cachorro' | 'Peixe' | 'Gato' | 'outros'
  birthday: string
  image: FileList | null
}

const newAnimalFormValidationSchema = zod.object({
  name: zod.string().min(2, 'O nome é obrigatório'),
  race: zod.string().min(2, 'A raça é obrigatório'),
  color: zod.string().min(2, 'A raça é obrigatório'),
  sex: zod.union([zod.literal('Macho'), zod.literal('Fêmea')]),
  description: zod
    .string()
    .min(2, 'A raça é obrigatório')
    .max(255, 'Não passe do Limite de 255 caracteres'),
  type: zod.union([
    zod.literal('Cachorro'),
    zod.literal('Peixe'),
    zod.literal('Gato'),
    zod.literal('outros'),
  ]),
  birthday: zod
    .string()
    .refine(
      (value) => !isNaN(parseFloat(value)),
      'O preço deve ser um número válido',
    ),
  image: zod.instanceof(FileList).nullable(),
})

type Animal = zod.infer<typeof newAnimalFormValidationSchema>

export function CadastroAnimal() {
  // const navigate = useNavigate()
  const newAnimalForm = useForm<Animal>({
    resolver: zodResolver(newAnimalFormValidationSchema),
  })
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = newAnimalForm
  async function handleAddProduct(data: NewAnimalFormData) {
    try {
      // const response = await addProduct(data)
      // toast.success(response.message)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 500) {
          toast.error(error.response.data.message)
        }
      }
    }
  }
  return (
    <Box>
      <Typography sx={{ textAlign: 'center' }} variant="h3" fontWeight={'bold'}>
        Formulário de cadastro de animais
      </Typography>
      <form
        encType="multipart/form-data"
        onSubmit={handleSubmit(handleAddProduct)}
      >
        <TextField
          error={!!errors.name?.message}
          helperText={errors.name?.message}
          type="text"
          variant={'outlined'}
          label={'Nome'}
          color="info"
          fullWidth
          {...register('name', { required: true })}
        />
        <TextField
          type="text"
          error={!!errors.race?.message}
          helperText={errors.race?.message}
          color="info"
          label="Raça"
          variant="outlined"
          fullWidth
          {...register('race', { required: true })}
        />
        <TextField
          type="text"
          error={!!errors.color?.message}
          helperText={errors.color?.message}
          color="info"
          label="Cor"
          variant="outlined"
          fullWidth
          {...register('color', { required: true })}
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Sexo</InputLabel>
          <Select
            error={!!errors.sex?.message}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Sexo"
            defaultValue=""
            variant="outlined"
            displayEmpty
            {...register('sex', { required: true })}
          >
            <MenuItem value={'Macho'}>Macho</MenuItem>
            <MenuItem value={'Fêmea'}>Fêmea</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Animal</InputLabel>
          <Select
            error={!!errors.sex?.message}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Tipo"
            defaultValue=""
            variant="outlined"
            displayEmpty
            {...register('type', { required: true })}
          >
            <MenuItem value={'Cachorro'}>Cachorro</MenuItem>
            <MenuItem value={'Gato'}>Gato</MenuItem>
            <MenuItem value={'Peixe'}>Peixe</MenuItem>
            <MenuItem value={'Outros'}>Outros</MenuItem>
          </Select>
        </FormControl>
        <TextField
          type="text"
          error={!!errors.description?.message}
          helperText={errors.description?.message}
          color="info"
          inputProps={{ maxLength: 255 }}
          label="Descrição"
          variant="outlined"
          fullWidth
          {...register('description', { required: true })}
        />

        <TextField
          type="text"
          error={!!errors.birthday?.message}
          helperText={errors.birthday?.message}
          color="info"
          label="Data de Nascimento"
          variant="outlined"
          fullWidth
          {...register('birthday', { required: true })}
        />
        <TextField
          type="file"
          error={!!errors.image?.message}
          helperText={errors.image?.message}
          color="info"
          variant="outlined"
          fullWidth
          {...register('image')}
        />
        <Button variant="contained" color="success" type="submit" fullWidth>
          Cadastrar
        </Button>
      </form>
    </Box>
  )
}
