import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '../../redux/animals/slice'
import isNotFound from '../../images/isNotFound.jpg'
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Pagination,
  Typography,
  Input,
  CircularProgress,
  Box,
} from '@mui/material'
import { RootState } from '../../redux/store'

// eslint-disable-next-line no-redeclare
export function Animal() {
  const dispatch = useDispatch()
  const { getAnimalRequest } = actions
  const { list, pagination, loading } = useSelector(
    (state: RootState) => state.animals,
  )
  const [filter, setFilter] = useState('')
  const [limit] = useState(4)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    dispatch(getAnimalRequest(limit, offset))
  }, [dispatch, limit, offset, getAnimalRequest])
  return (
    <Box>
      {loading ? (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            height: '100vh',
            justifyContent: 'center',
          }}
        >
          <CircularProgress color="error" size={'10rem'} />
        </Box>
      ) : (
        <>
          {list.length ? (
            <Box>
              <Input
                type="text"
                value={filter}
                onChange={(event) => {
                  setFilter(event.target.value)
                }}
                sx={{ marginBottom: '2rem' }}
                fullWidth
              />
              <Grid container spacing={6}>
                {list.map((animal) => (
                  <Grid item key={animal.id}>
                    <Card
                      sx={{
                        width: '20rem',
                        height: '28rem',
                        borderRadius: 3,
                        ':hover': {
                          transform: 'scale(1.06)',
                          transition: '400ms',
                        },
                      }}
                    >
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          height={'250'}
                          src={
                            animal.image
                              ? `data:image/jpeg;base64,${animal.image}`
                              : isNotFound
                          }
                          alt={animal.type}
                        />
                        <CardContent sx={{ height: '100%' }}>
                          <Typography gutterBottom variant="h5" component="div">
                            {animal.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {animal.description}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              <Pagination
                boundaryCount={1}
                sx={{
                  display: 'flex',
                  height: '100%',
                  justifyContent: 'center',
                  paddingTop: 4,
                }}
                page={Math.ceil(offset / limit) + 1}
                color="secondary"
                count={Math.ceil(pagination.count / limit)}
                shape="rounded"
                variant="outlined"
                size="large"
                onChange={(_, value) => {
                  setOffset(value * limit - limit)
                }}
              />
            </Box>
          ) : null}
        </>
      )}
    </Box>
  )
}
