import { useState, SetStateAction, Dispatch, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  Box,
  Grid,
  Select,
  MenuItem,
  Button,
  useTheme,
  Autocomplete,
  TextField,
  InputLabel,
  FormControl,
} from '@mui/material'
import { RootState } from '@Redux/store'
import { OngFilter } from '@Interfaces/redux/ongs'
import { actions } from '@Redux/ongs/slice'
import { actions as usersActions } from '@Redux/users/slice'

interface FilterProps {
  setOngFilter: Dispatch<SetStateAction<OngFilter>>
}

export function Filter({ setOngFilter }: FilterProps) {
  const { breakpoints } = useTheme()
  const dispatch = useDispatch()
  const { listRoadNeighborhoodRequest, resetFilter } = actions
  const { choiceCity } = usersActions

  const { citys, city } = useSelector((state: RootState) => state.users)
  const { neighborhoods, roads, names, filter } = useSelector(
    (state: RootState) => state.ongs,
  )

  const [nameFilter, setNameFilter] = useState(filter.name)
  const [roadFilter, setRoadFilter] = useState(filter.road)
  const [neighborhoodFilter, setNeighborhoodFilter] = useState(
    filter.neighborhood,
  )

  function handleFilter() {
    setOngFilter({
      name: nameFilter,
      road: roadFilter,
      neighborhood: neighborhoodFilter,
    })
  }

  useEffect(() => {
    if (city) {
      dispatch(listRoadNeighborhoodRequest(city))
    }
  }, [city, dispatch, listRoadNeighborhoodRequest])

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Grid
        marginBottom={3}
        container
        spacing={2}
        width={breakpoints.values.lg}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12} sm={12} md={6} lg={3}>
          <Autocomplete
            disablePortal
            options={names}
            value={nameFilter}
            getOptionLabel={(option) => option}
            onChange={(_, value) => setNameFilter(value || '')}
            noOptionsText="Valor inválido"
            defaultValue=""
            renderInput={(params) => (
              <TextField {...params} label="Nome" size="small" />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={4} md={6} lg={3}>
          <Autocomplete
            disablePortal
            options={roads}
            value={roadFilter}
            onChange={(_, value) => setRoadFilter(value || '')}
            noOptionsText="Valor inválido"
            defaultValue=""
            renderInput={(params) => (
              <TextField {...params} label="Rua" size="small" />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={4} md={4} lg={3}>
          <Autocomplete
            disablePortal
            options={neighborhoods}
            value={neighborhoodFilter}
            onChange={(_, value) => setNeighborhoodFilter(value || '')}
            noOptionsText="Valor inválido"
            defaultValue=""
            renderInput={(params) => (
              <TextField {...params} label="Bairro" size="small" />
            )}
          />
        </Grid>

        {citys.length && (
          <Grid item xs={12} sm={4} md={4} lg={2}>
            <FormControl fullWidth>
              <InputLabel>Cidade</InputLabel>
              <Select
                label="Cidade"
                size="small"
                variant="outlined"
                value={city}
                onChange={(event) => {
                  const { value } = event.target

                  setNameFilter('')
                  setRoadFilter('')
                  setNeighborhoodFilter('')
                  dispatch(resetFilter())
                  dispatch(choiceCity(value))

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

        <Grid item xs={12} sm={12} md={4} lg={1}>
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
