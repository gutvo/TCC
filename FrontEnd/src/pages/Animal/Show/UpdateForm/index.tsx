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
import { zodResolver } from '@hookform/resolvers/zod'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '@Redux/animals/slice'
import { RootState } from '@Redux/store'
import { UpdateAnimalFormData } from '@Interfaces/pages/animals'
import { UpdateAnimal, updateAnimalFormSchema } from './validations'
import { TextFieldStyled } from '@Components/TextFieldStyled'

export function FormAnimal() {
  const { createAnimalRequest } = actions
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm<UpdateAnimal>({
    resolver: zodResolver(updateAnimalFormSchema),
  })

  const { data } = useSelector((state: RootState) => state.users)
  const dispatch = useDispatch()
  const imageBoolean = !!watch('imagesData')?.length
  function handleAddProduct(data: UpdateAnimalFormData) {
    dispatch(createAnimalRequest(data))
  }

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
          type="checkbox"
          style={{ display: 'none' }}
          {...register('image', {
            required: true,
            value: Boolean(imageBoolean === true),
          })}
        />

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
          rows={2}
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

        <TextFieldStyled
          errors={errors.description}
          label="Imagem"
          customType="file"
          {...register('imagesData')}
        />
        <Button variant="contained" color="success" type="submit" fullWidth>
          Cadastrar Animal
        </Button>
      </form>
    </Box>
  )
}
