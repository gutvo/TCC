// import { ChangeEvent, useState, forwardRef } from 'react'
// import { Box, TextField, TextFieldProps } from '@mui/material'
// import isNotFound from '@Images/isNotFound.jpg'

// export interface DropZoneProps extends Omit<TextFieldProps, 'type'> {
//   loading?: boolean
// }

// export const DropZone = forwardRef<HTMLInputElement, DropZoneProps>(
//   function TextFieldPassword({ loading, ...rest }, ref) {
//     const [imageURL, setImageURL] = useState('')

//     function handleChangeImage(
//       event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
//     ) {
//       const fileInput = event.target as HTMLInputElement
//       if (fileInput.files) {
//         const file: File = fileInput.files[0]
//         if (file) {
//           const imageUrl = URL.createObjectURL(file)
//           setImageURL(imageUrl)
//         }
//       }
//     }
//     return (
//       <>
//         <Box
//           component="img"
//           sx={{
//             width: '100%',
//             objectFit: 'cover',
//             borderTopLeftRadius: 4,
//             borderTopRightRadius: 4,
//             marginBottom: 2,
//           }}
//           alt="Preview"
//           src={imageURL || isNotFound}
//         />

//         <TextField
//           size="medium"
//           InputLabelProps={{ shrink: true }}
//           color="info"
//           type="file"
//           {...rest}
//           fullWidth
//           inputRef={ref}
//           label="Imagem"
//           inputProps={{ accept: 'image/*' }}
//           onChange={handleChangeImage}
//         />
//       </>
//     )
//   },
// )
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Box } from '@mui/material'
import isNotFound from '@Images/isNotFound.jpg'

export function DropZone() {
  const [imageURL, setImageURL] = useState('')
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles[0])
    const imageUrl = URL.createObjectURL(acceptedFiles[0])
    setImageURL(imageUrl)
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <Box
      sx={{
        width: '15rem',
        height: '15rem',
        ':hover': {
          bgcolor: 'green',
          cursor: 'pointer',
        },
      }}
    >
      <Box {...getRootProps()}>
        <input {...getInputProps({ accept: 'image/*', disabled: true })} />
        <Box
          component="img"
          sx={{
            width: '50%',
            objectFit: 'cover',
            borderTopLeftRadius: 4,
            borderTopRightRadius: 4,
            marginBottom: 2,
          }}
          alt="Preview"
          src={imageURL || isNotFound}
        />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag drop some files here, or click to select files</p>
        )}
      </Box>
    </Box>
  )
}
