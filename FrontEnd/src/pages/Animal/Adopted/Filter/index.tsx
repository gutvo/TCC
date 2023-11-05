import { useState, SetStateAction, Dispatch } from 'react'
import { useSelector } from 'react-redux'

import {
  Box,
  Grid,
  Select,
  MenuItem,
  Button,
  useTheme,
  Autocomplete,
  Chip,
  TextField,
  InputLabel,
  FormControl,
} from '@mui/material'
import { RootState } from '@Redux/store'
import { animalFilterProps } from '@Interfaces/redux/adoptions'

interface FilterProps {
  setAnimalFilter: Dispatch<SetStateAction<animalFilterProps>>
}

export function Filter({ setAnimalFilter }: FilterProps) {
  const { breakpoints } = useTheme()

  const { filter } = useSelector((state: RootState) => state.animals)

  const [raceFilter, setRaceFilter] = useState(filter.race)
  const [sexFilter, setSexFilter] = useState(filter.sex)
  const [typeFilter, setTypeFilter] = useState(filter.type)

  const typeOptions = ['Cachorro', 'Peixe', 'Gato', 'Outros', 'Todos']
  const sexOptions = ['Macho', 'Fêmea', 'Todos']
  function handleFilter() {
    setAnimalFilter({
      race: raceFilter,
      sex: sexFilter,
      type: typeFilter,
    })
  }
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Grid
        marginBottom={3}
        container
        spacing={2}
        width={breakpoints.values.lg + 24}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12} md={6}>
          <Autocomplete
            size="small"
            fullWidth
            limitTags={2}
            onChange={(_, value) => {
              setRaceFilter(value)
            }}
            options={[]}
            freeSolo
            multiple
            renderTags={(value, props) =>
              value.map((option, index) => (
                <Chip
                  color="primary"
                  size="small"
                  label={option}
                  {...props({ index })}
                  key={index}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                label="Raça"
                {...params}
                InputLabelProps={{ shrink: true }}
              />
            )}
          />
        </Grid>

        <Grid item xs={6} md={2}>
          <FormControl fullWidth>
            <InputLabel>Tipo de animal</InputLabel>
            <Select
              fullWidth
              size="small"
              variant="outlined"
              label="Tipo de animal"
              value={typeFilter}
              onChange={(event) => {
                const { value } = event.target
                setTypeFilter(value)
              }}
            >
              {typeOptions.map((item) => {
                return (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} md={2}>
          <FormControl fullWidth>
            <InputLabel>Sexo</InputLabel>
            <Select
              fullWidth
              size="small"
              variant="outlined"
              label="Sexo"
              value={sexFilter}
              onChange={(event) => {
                const { value } = event.target
                setSexFilter(value)
              }}
            >
              {sexOptions.map((item) => {
                return (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={2}>
          <Button
            variant="contained"
            fullWidth
            sx={{
              height: '2.5rem',
            }}
            onClick={handleFilter}
          >
            Pesquisar
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}
