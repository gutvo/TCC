import {
  useTheme,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Box,
} from '@mui/material'
import { BarChart, LineChart } from '@mui/x-charts'
import { actions } from '@Redux/reports/slice'
import { RootState } from '@Redux/store'
import { differenceInYears } from 'date-fns'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export function RecuedAdoptedAnimal() {
  const dispatch = useDispatch()
  const theme = useTheme()
  const { palette } = theme
  const { getRescuedAdoptedAnimalRequest } = actions

  const { animalData } = useSelector((state: RootState) => state.reports)
  const { data } = useSelector((state: RootState) => state.users)

  const [chartType, setChartType] = useState('bars')
  const [chartYear, setChartYear] = useState(new Date().getFullYear())
  const [chartYearOptions, setChartYearOptions] = useState<number[]>([
    new Date().getFullYear(),
  ])

  const initialArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

  const [chartDataAdoptedData, setChartDataAdoptedData] =
    useState<number[]>(initialArray)

  const [chartDataRescueData, setChartDataRescueData] =
    useState<number[]>(initialArray)

  const formatChartData = useCallback(() => {
    const chartAdoptedData = []
    const chartRescueData = []
    for (let count = 0; count < 12; count++) {
      const filteredAdoptedAnimal = animalData.filter(
        (item) =>
          new Date(item.updatedAt).getMonth() === count &&
          item.situation === 'adopted',
      )
      chartAdoptedData.push(
        filteredAdoptedAnimal.length !== 0 ? filteredAdoptedAnimal.length : 0,
      )

      const filteredRescueAnimal = animalData.filter(
        (item) =>
          new Date(item.createdAt).getMonth() === count &&
          item.situation === 'available',
      )
      chartRescueData.push(
        filteredRescueAnimal.length !== 0 ? filteredRescueAnimal.length : 0,
      )
    }
    setChartDataAdoptedData(chartAdoptedData)
    setChartDataRescueData(chartRescueData)
  }, [animalData, setChartDataAdoptedData])

  useEffect(() => {
    formatChartData()
  }, [animalData, formatChartData])

  useEffect(() => {
    if (data?.ongData?.id) {
      dispatch(getRescuedAdoptedAnimalRequest(data.ongData.id, chartYear))
    }
  }, [dispatch, data?.ongData?.id, getRescuedAdoptedAnimalRequest, chartYear])

  useEffect(() => {
    if (data?.createdAt) {
      const difference = differenceInYears(new Date(), new Date(data.createdAt))

      if (difference === 0) {
        return
      }
      const years = []
      const initialYear = new Date(data.createdAt).getFullYear()
      for (let count = 0; count < difference; count++) {
        years.push(initialYear + count)
      }
      setChartYearOptions([...chartYearOptions, ...years])
    }
  }, [data?.createdAt, chartYearOptions])

  const xAxisData = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ]

  const width = 1000
  const height = 400

  return (
    <>
      <Box display="flex" justifyContent="center" marginBottom={1} gap={5}>
        <FormControl sx={{ width: '8rem' }}>
          <InputLabel>Tipo de gráfico</InputLabel>
          <Select
            size="small"
            value={chartType}
            label="Tipo de gráfico"
            onChange={(event) => {
              setChartType(event.target.value)
            }}
            defaultValue="bars"
          >
            <MenuItem value="bars">Barras</MenuItem>
            <MenuItem value="lines">Linhas</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ width: '8rem' }}>
          <InputLabel>Ano</InputLabel>
          <Select
            size="small"
            value={chartYear}
            label="Ano"
            onChange={(event) => {
              const value = event.target.value
              const number = typeof value === 'string' ? parseInt(value) : value
              setChartYear(number)
            }}
          >
            {chartYearOptions.map((item) => {
              return (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              )
            })}
          </Select>
        </FormControl>
      </Box>

      <Box display="flex" justifyContent="center">
        {chartType === 'bars' ? (
          <BarChart
            yAxis={[{ tickMinStep: 1 }]}
            xAxis={[
              {
                label: chartYear.toString(),
                scaleType: 'band',
                data: xAxisData,
              },
            ]}
            series={[
              {
                data: chartDataAdoptedData,
                color: palette.primary.main,
                label: 'Animais adotados',
              },
              {
                data: chartDataRescueData,
                color: palette.secondary.main,
                label: 'Animais resgatados',
              },
            ]}
            width={width}
            height={height}
          />
        ) : (
          <LineChart
            yAxis={[{ tickMinStep: 1 }]}
            xAxis={[
              {
                label: chartYear.toString(),
                scaleType: 'band',
                data: xAxisData,
              },
            ]}
            series={[
              {
                // curve: 'linear',
                data: chartDataAdoptedData,
                color: palette.primary.main,
                label: 'Animais adotados',
              },
              {
                // curve: 'linear',
                data: chartDataRescueData,
                color: palette.secondary.main,
                label: 'Animais resgatados',
              },
            ]}
            width={width}
            height={height}
          />
        )}
      </Box>
    </>
  )
}
