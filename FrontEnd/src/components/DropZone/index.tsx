import { ChangeEvent, useState, forwardRef } from 'react'
import { Box, TextField, TextFieldProps } from '@mui/material'
import isNotFound from '@Images/isNotFound.jpg'

export interface DropZoneProps extends Omit<TextFieldProps, 'type'> {
  loading?: boolean
}

export const DropZone = forwardRef<HTMLInputElement, DropZoneProps>(
  function TextFieldPassword({ loading, ...rest }, ref) {
    const [imageURL, setImageURL] = useState('')

    function handleChangeImage(
      event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) {
      const fileInput = event.target as HTMLInputElement
      if (fileInput.files) {
        const file: File = fileInput.files[0]
        if (file) {
          const imageUrl = URL.createObjectURL(file)
          setImageURL(imageUrl)
        }
      }
    }
    return (
      <>
        <Box
          component="img"
          sx={{
            width: '100%',
            objectFit: 'cover',
            borderTopLeftRadius: 4,
            borderTopRightRadius: 4,
            marginBottom: 2,
          }}
          alt="Preview"
          src={imageURL || isNotFound}
        />

        <TextField
          size="medium"
          InputLabelProps={{ shrink: true }}
          color="info"
          type="file"
          {...rest}
          fullWidth
          inputRef={ref}
          label="Imagem"
          inputProps={{ accept: 'image/*' }}
          onChange={handleChangeImage}
        />
      </>
    )
  },
)
