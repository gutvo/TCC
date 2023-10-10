import { UseFormRegister } from 'react-hook-form'
import { InputHTMLAttributes, useCallback, useEffect, useState } from 'react'
import ImageNotFound from '@Images/isNotFound.jpg'
import userNotFound from '@Images/userNotFound.png'
import { Box, Skeleton } from '@mui/material'
import { UploadFile } from '@mui/icons-material'
import { api } from '@Services/backendApi'

export interface TextFieldImageProps
  extends InputHTMLAttributes<HTMLInputElement> {
  register: UseFormRegister<any>
  name: string
  animalId?: number
  profileEmail?: string
  isProfile?: boolean
  isDisabled?: boolean
}

export function TextFieldImage({
  register,
  name,
  animalId,
  profileEmail,
  isProfile = false,
  isDisabled = false,
  ...rest
}: TextFieldImageProps) {
  const [imageUrl, setImageUrl] = useState<string | null | void>()
  const image = isProfile ? userNotFound : ImageNotFound
  const [loading, setLoading] = useState(false)

  const hover = isDisabled
    ? {}
    : {
        filter: 'brightness(0.7)',
        cursor: 'pointer',
        '.iconProfile': {
          display: 'block',
        },
      }

  const fetchAnimalImage = useCallback(async () => {
    setLoading(true)
    try {
      const result: { data: Blob } = await api.get(
        `/${animalId ? 'animal' : 'user'}/images/${animalId || profileEmail}`,
        {
          responseType: 'blob',
        },
      )
      setImageUrl(URL.createObjectURL(result.data))
    } catch (error) {
      setImageUrl(null)
    } finally {
      setLoading(false)
    }
  }, [animalId, profileEmail])

  useEffect(() => {
    if (animalId || profileEmail) {
      fetchAnimalImage()
    }
  }, [animalId, fetchAnimalImage, profileEmail])

  return (
    <>
      {loading ? (
        <Skeleton
          variant={isProfile ? 'circular' : 'rectangular'}
          width={isProfile ? '250px' : '270px'}
          height={isProfile ? '250px' : '200px'}
        />
      ) : (
        <Box
          sx={{
            border: '1px solid #d4d4d4',
            width: isProfile ? '250px' : '270px',
            borderRadius: isProfile ? '100%' : 2,
            height: isProfile ? '250px' : '200px',
            ':hover': hover,
          }}
        >
          <Box
            sx={{ borderRadius: isProfile ? '100%' : 2 }}
            component="img"
            src={imageUrl || image}
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
              top: '35%',
              left: '35%',
              pointerEvents: 'none',
            }}
          />
          <input
            id="imageData"
            type="file"
            accept="image/*"
            disabled={isDisabled}
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
