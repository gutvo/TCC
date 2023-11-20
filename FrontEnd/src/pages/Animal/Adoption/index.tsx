import { useCallback, useEffect, useState } from 'react'

import { RootState } from '@Redux/store'
import {
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Paper,
  Button,
  TablePagination,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '@Redux/adoptions/slice'
import { DetailModal } from './DetailModal'
import { AnimalData } from '@Interfaces/redux/animals'
import { Check, Close } from '@mui/icons-material'

export function Adoption() {
  const { listAdoptionRequest, adoptAnimalRequest, deleteAdoptionRequest } =
    actions
  const dispatch = useDispatch()
  const ongData = useSelector((state: RootState) => state.users.data?.ongData)

  const { adoptionData, pagination } = useSelector(
    (state: RootState) => state.adoptions,
  )

  const [limit, setLimit] = useState(pagination.limit)
  const [offset, setOffset] = useState(pagination.offset)
  const [open, setOpen] = useState(false)
  const [type, setType] = useState('')
  const [userData, setUserData] = useState<{
    id: number
    name: string
    email: string
  } | null>(null)
  const [animalData, setAnimalData] = useState<AnimalData | null>(null)

  function openModal(
    typeData: string,
    user: { id: number; name: string; email: string },
    animal: AnimalData,
  ) {
    setType(typeData)
    setOpen(true)
    setUserData(user)
    setAnimalData(animal)
  }

  const fetchAdoptedRequests = useCallback(() => {
    if (ongData?.id) {
      dispatch(listAdoptionRequest(ongData.id, offset, limit))
    }
  }, [dispatch, limit, offset, ongData?.id, listAdoptionRequest])

  function handleAdoptedAnimal(adoptionId: number) {
    dispatch(adoptAnimalRequest(adoptionId, fetchAdoptedRequests))
  }

  function handleDeleteAdoptionRequest(adoptionId: number) {
    dispatch(deleteAdoptionRequest(adoptionId, fetchAdoptedRequests))
  }

  useEffect(() => {
    fetchAdoptedRequests()
  }, [fetchAdoptedRequests])
  return (
    <>
      {open && (
        <DetailModal
          open={open}
          setOpen={setOpen}
          type={type}
          animalValue={animalData}
          userValue={userData}
        />
      )}
      <Typography
        variant="h4"
        fontWeight="bold"
        textAlign="center"
        marginBottom={4}
      >
        Lista de pedidos para adoção
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Nome do Animal</TableCell>
              <TableCell align="center">Nome do Adotante</TableCell>
              <TableCell align="right">Ação</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {adoptionData.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="left" component="th" scope="row">
                  <Button
                    onClick={() =>
                      openModal('animal', row.userData, row.animalData)
                    }
                  >
                    {row.animalData.name}
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button
                    onClick={() =>
                      openModal('usuario', row.userData, row.animalData)
                    }
                  >
                    {row.userData.name}
                  </Button>
                </TableCell>
                <TableCell align="right">
                  <Button
                    size="small"
                    sx={{ marginRight: '1rem' }}
                    startIcon={<Check />}
                    onClick={() => {
                      handleAdoptedAnimal(row.id)
                    }}
                    variant="contained"
                  >
                    Confirmar
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    startIcon={<Close />}
                    onClick={() => {
                      handleDeleteAdoptionRequest(row.id)
                    }}
                    variant="contained"
                  >
                    Recusar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20, 50]}
        component="div"
        count={Math.ceil(pagination.count / limit)}
        rowsPerPage={limit}
        page={Math.ceil(offset / limit)}
        onPageChange={(_, value) => {
          setOffset(value * limit - limit)
        }}
        onRowsPerPageChange={(value) => {
          setLimit(parseInt(value.target.value))
        }}
      />
    </>
  )
}
