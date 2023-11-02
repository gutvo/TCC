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
import { animalFilterProps } from '@Interfaces/redux/animals'

interface FilterProps {
  setAnimalFilter: Dispatch<SetStateAction<animalFilterProps>>
}

export function Filter({ setAnimalFilter }: FilterProps) {
  const { breakpoints } = useTheme()

  const { filter } = useSelector((state: RootState) => state.animals)
  const { data, citys } = useSelector((state: RootState) => state.users)

  const [raceFilter, setRaceFilter] = useState(filter.race)
  const [sexFilter, setSexFilter] = useState(filter.sex)
  const [typeFilter, setTypeFilter] = useState(filter.type)
  const [cityFilter, setCityFilter] = useState(filter.city)

  const typeOptions = ['Cachorro', 'Peixe', 'Gato', 'Outros', 'Todos']
  const sexOptions = ['Macho', 'Fêmea', 'Todos']
  function handleFilter() {
    setAnimalFilter({
      race: raceFilter,
      sex: sexFilter,
      type: typeFilter,
      city: cityFilter,
    })
  }
  const gridBreakPointsXs = !data?.ongData && citys.length ? 4 : 6

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Grid
        // marginY={3}
        marginBottom={3}
        container
        spacing={2}
        width={breakpoints.values.lg + 24}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12} md={gridBreakPointsXs}>
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

        <Grid item xs={gridBreakPointsXs} md={2}>
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
        <Grid item xs={gridBreakPointsXs} md={2}>
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

        {!data?.ongData && citys.length && (
          <Grid item xs={gridBreakPointsXs} md={2}>
            <FormControl fullWidth>
              <InputLabel>Cidade</InputLabel>
              <Select
                label="Cidade"
                size="small"
                variant="outlined"
                value={cityFilter}
                onChange={(event) => {
                  const { value } = event.target
                  setCityFilter(value)
                  localStorage.setItem('city', `${value}`)
                }}
              >
                {citys.map((item) => {
                  return (
                    <MenuItem key={item.label} value={item.label}>
                      {item.label}
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </Grid>
        )}

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
