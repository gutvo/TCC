import { UseFormRegister } from 'react-hook-form'
import { InputHTMLAttributes, useCallback, useEffect, useState } from 'react'
import ImageNotFound from '@Images/isNotFound.jpg'
import { Box } from '@mui/material'
import { UploadFile } from '@mui/icons-material'
import { api } from '@Services/backendApi'
import { useSelector } from 'react-redux'
import { RootState } from '@Redux/store'
import { Loading } from '@Components/Loading'

export interface TextFieldImageProps
  extends InputHTMLAttributes<HTMLInputElement> {
  register: UseFormRegister<any>
  name: string
  animalId?: number
}

export function TextFieldImage({
  register,
  name,
  animalId,
  ...rest
}: TextFieldImageProps) {
  const [imageUrl, setImageUrl] = useState<string | null | void>()

  const animalLoading = useSelector((state: RootState) => state.animals.loading)

  const fetchImage = useCallback(async () => {
    try {
      const result: { data: Blob } = await api.get(
        `/animal/images/${animalId}`,
        {
          responseType: 'blob',
        },
      )
      setImageUrl(URL.createObjectURL(result.data))
    } catch (error) {
      setImageUrl(null)
    }
  }, [animalId])

  useEffect(() => {
    if (animalId) {
      fetchImage()
    }
  }, [animalId, fetchImage])
  return (
    <>
      {animalLoading ? (
        <Loading />
      ) : (
        <Box
          sx={{
            border: '1px solid #d4d4d4',
            width: '450px',
            borderRadius: 2,
            height: '300px',
            ':hover': {
              filter: 'brightness(0.7)',
              cursor: 'pointer',
              '.iconProfile': {
                display: 'block',
              },
            },
          }}
        >
          <Box
            sx={{ borderRadius: 2 }}
            component="img"
            src={imageUrl || ImageNotFound}
            onClick={() => document.getElementById('imageData')?.click()}
            alt="Preview"
            height="100%"
            width="100%"
          />

          <UploadFile
            color="primary"
            fontSize="large"
            className="iconProfile"
            sx={{
              position: 'absolute',
              fontSize: '4.5rem',
              display: 'none',
              top: '40%',
              left: '42%',
              pointerEvents: 'none',
            }}
          />
          <input
            id="imageData"
            type="file"
            accept="image/*"
            style={{ opacity: 0 }}
            {...rest}
            {...register('imageData', {
              onChange: (event) => {
                const { files } = event.target
                if (files && files.length > 0) {
                  const reader = new FileReader()
                  const [file] = files
                  reader.addEventListener('load', () =>
                    setImageUrl(reader.result?.toString()),
                  )
                  setImageUrl(reader.readAsDataURL(file))
                }
              },
            })}
          />
        </Box>
      )}
    </>
  )
}
