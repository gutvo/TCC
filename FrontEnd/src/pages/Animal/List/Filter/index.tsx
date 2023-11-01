import { useState, SetStateAction, Dispatch } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actions as userActions } from '@Redux/users/slice'

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
  const dispatch = useDispatch()
  const { breakpoints } = useTheme()

  const { choiceCity } = userActions

  const { filter } = useSelector((state: RootState) => state.animals)
  const { data, city, citys } = useSelector((state: RootState) => state.users)

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
  const gridBreakPointsXs = !data?.ongData && citys.length ? 4 : 6

  const gridBreakPointsMd = !data?.ongData && citys.length ? 1 : 2

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Grid
        marginY={3}
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

        <Grid item xs={gridBreakPointsXs} md={gridBreakPointsMd}>
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
        <Grid item xs={gridBreakPointsXs} md={gridBreakPointsMd}>
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
          <Grid item xs={gridBreakPointsXs} md={gridBreakPointsMd}>
            <Select
              size="small"
              variant="outlined"
              value={city}
              onChange={(event) => {
                const { value } = event.target
                dispatch(choiceCity(value.toString()))
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
