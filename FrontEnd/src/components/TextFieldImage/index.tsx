import { UseFormRegister } from 'react-hook-form'
import { InputHTMLAttributes, useState } from 'react'
import ImageNotFound from '@Images/isNotFound.jpg'
import { Box } from '@mui/material'
import { UploadFile } from '@mui/icons-material'

export interface TextFieldImageProps
  extends InputHTMLAttributes<HTMLInputElement> {
  register: UseFormRegister<any>
  name: string
  setHaveImage: (data: boolean) => void
}

export function TextFieldImage({
  register,
  name,
  setHaveImage,
  ...rest
}: TextFieldImageProps) {
  const [imageUrl, setImageUrl] = useState<string | undefined | void>('')
  return (
    <>
      <Box
        sx={{
          width: '400px',
          borderRadius: 2,
          height: '400px',
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
            top: '35%',
            left: '36%',
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
                setHaveImage(true)
              }
            },
          })}
        />
      </Box>
    </>
  )
}
