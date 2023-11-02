import { RootState } from '@Redux/store'
import { CardKpis } from './Card'
import { Grid } from '@mui/material'
import { useSelector } from 'react-redux'

export function Kpi() {
  const dashboadHomeData = useSelector(
    (state: RootState) => state.reports.dashboadHomeData,
  )
  return (
    <Grid
      container
      spacing={2}
      display="flex"
      justifyContent="center"
      marginBottom={4}
    >
      <Grid item>
        <CardKpis
          value={dashboadHomeData?.countTotalOngs}
          label="Organizações cadastrados"
        />
      </Grid>
      <Grid item>
        <CardKpis
          value={dashboadHomeData?.countAvailableAnimals}
          label="Animais disponiveis"
        />
      </Grid>
      <Grid item>
        <CardKpis
          value={dashboadHomeData?.countAdoptedAnimals}
          label="Animais adotados"
        />
      </Grid>
      <Grid item>
        <CardKpis
          value={dashboadHomeData?.countTotalAnimals}
          label="Animais no total"
        />
      </Grid>
    </Grid>
  )
}
