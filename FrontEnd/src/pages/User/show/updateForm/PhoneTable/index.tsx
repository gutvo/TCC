import { RootState } from '@Redux/store'
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import PhoneInput from './PhoneInput'
import { useEffect, useState } from 'react'
import { phoneData } from '@Interfaces/redux/users'
import { actions } from '@Redux/users/slice'
import { ModeEdit, Delete, Close, Check } from '@mui/icons-material'

export function PhoneTable() {
  const { deletePhoneRequest, updatePhoneRequest } = actions

  const dispatch = useDispatch()

  const ongData = useSelector((state: RootState) => state.users.data?.ongData)

  const [phone, setPhone] = useState<phoneData[]>()

  const [editPhoneData, setEditPhoneData] = useState<string>('')
  const [editIndex, setEditIndex] = useState<number | null>(null)
  useEffect(() => {
    if (ongData) {
      setPhone(ongData.phoneData)
    }
  }, [ongData])

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Número de telefone</TableCell>
              <TableCell align="right">Ação</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {phone?.length ? (
              phone.map((row, index) => {
                return (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {editIndex === index ? (
                        <>
                          <TextField
                            inputProps={{ style: { height: '0.25rem' } }}
                            type="text"
                            defaultValue={row.phone}
                            onChange={(event) =>
                              setEditPhoneData(event.target.value)
                            }
                          />
                          <Button
                            color="success"
                            onClick={() =>
                              dispatch(
                                updatePhoneRequest(
                                  editPhoneData,
                                  row.id,
                                  index,
                                  setEditIndex,
                                ),
                              )
                            }
                          >
                            <Check />
                          </Button>
                          <Button
                            color="error"
                            onClick={() => setEditIndex(null)}
                          >
                            <Close />
                          </Button>
                        </>
                      ) : (
                        row.phone
                      )}
                      {editIndex === null && (
                        <Button
                          color="warning"
                          onClick={() => {
                            setEditIndex(index)
                            setEditPhoneData(row.phone)
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
                  <Typography color="red">Sem celulares cadastrados</Typography>
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
    </>
  )
}
