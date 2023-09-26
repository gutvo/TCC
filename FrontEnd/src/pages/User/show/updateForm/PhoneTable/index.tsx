import { RootState } from '@Redux/store'
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import PhoneInput from './PhoneInput'
import { useEffect, useState } from 'react'
import { phoneData } from '@Interfaces/redux/users'
import { actions } from '@Redux/users/slice'
import { ModeEdit, Delete } from '@mui/icons-material'

export function PhoneTable() {
  const { deletePhoneRequest } = actions

  const dispatch = useDispatch()

  const ongData = useSelector((state: RootState) => state.users.data?.ongData)

  const [phone, setPhone] = useState<phoneData[]>()

  const [editIndex, setEditIndex] = useState<number | null>(null)

  useEffect(() => {
    if (ongData) {
      setPhone(ongData.phoneData)
    }
  }, [ongData, phone])

  return (
    <Box marginTop="2rem">
      <Typography textAlign="center" variant="h5" fontWeight="bold">
        Tabela de Telefones
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Número</TableCell>
              <TableCell align="right">Ação</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {phone?.length ? (
              phone.map((row, index) => {
                return (
                  <TableRow key={row.id}>
                    <TableCell
                      sx={{ fontSize: '1rem' }}
                      component="th"
                      scope="row"
                    >
                      {editIndex === index ? (
                        <PhoneInput
                          defaultValues={row.phone}
                          update={{ id: row.id, index, setEditIndex }}
                          width="14.6rem"
                        />
                      ) : (
                        row.phone
                      )}
                      {editIndex === null && (
                        <Button
                          color="warning"
                          onClick={() => {
                            setEditIndex(index)
                          }}
                        >
                          <ModeEdit />
                        </Button>
                      )}
                    </TableCell>
                    <TableCell align="right" component="th" scope="row">
                      <Button
                        color="error"
                        onClick={() => {
                          dispatch(deletePhoneRequest(row.id, index))
                        }}
                      >
                        <Delete />
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })
            ) : (
              <TableRow>
                <TableCell colSpan={2}>
                  <Typography color="red">Sem números cadastrados</Typography>
                </TableCell>
              </TableRow>
            )}
            <TableRow>
              <TableCell component="th" scope="row" colSpan={2} align="justify">
                <PhoneInput />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}
