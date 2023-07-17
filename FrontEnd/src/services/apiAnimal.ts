import axios from 'axios'

export interface AnimalData {
  id: number
  name: string
  race: string
  color: string
  sex: 'Macho' | 'Fêmea'
  description: string
  type: 'Cachorro' | 'Peixe' | 'Gato' | 'Outros'
  birthday: number
  image: boolean
  imagesData: File | null
}

const baseURL = import.meta.env.VITE_LINK

export const api = axios.create({
  baseURL,
})

export async function getAnimals(offset: number, limit: number) {
  const result = await api.get('/animal', {
    params: {
      offset,
      limit,
    },
  })
  return result.data
}

export async function getAnimalImage(animal: AnimalData[]) {
  const result: AnimalData[] = animal
  animal.map(async (item: AnimalData) => {
    if (item.image) {
      const response = await api.get(`/animal/images/${item.id}`)
      result[item.id].imagesData = response.data
    }
  })
  console.log(animal)

  return animal
}

// interface Animal {
//   id: number
//   name: string
//   race: string
//   color: string
//   sex: 'Macho' | 'Fêmea'
//   description: string
//   type: 'Cachorro' | 'Peixe' | 'Gato' | 'outros'
//   birthday: string
//   image: string
//   imagem?: string
// }

// interface AnimalFormData {
//   id?: number
//   name: string
//   race: string
//   color: string
//   sex: 'Macho' | 'Fêmea'
//   description: string
//   type: 'Cachorro' | 'Peixe' | 'Gato' | 'outros'
//   birthday: string
//   image: FileList | null
// }

// export async function getAnimais(
//   pagina: number,
//   limite: number,
//   filtro: string,
// ) {
//   try {
//     const response = await axios.get(link, {
//       params: { pagina, limite, filtro },
//     })

//     const animais = response.data.animais

//     const animaisComImagem = await Promise.all(
//       animais.map(async (animal: Animal) => {
//         if (parseInt(animal.image)) {
//           const imagemResponse = await axios.get(
//             link + `imagens/${animal.id}`,
//             {
//               responseType: 'blob',
//             },
//           )
//           const reader = new FileReader()

//           const base64ImagePromise = new Promise<string>((resolve, reject) => {
//             reader.onloadend = () => {
//               if (typeof reader.result === 'string') {
//                 resolve(reader.result)
//               } else {
//                 reject(new Error('Falha na conversão para base64.'))
//               }
//             }
//           })

//           reader.readAsDataURL(imagemResponse.data)

//           const base64Image = await base64ImagePromise

//           const animalComImagem: Animal = {
//             ...animal,
//             imagem: base64Image,
//           }

//           return animalComImagem
//         } else {
//           const animalComImagem: Animal = {
//             ...animal,
//             imagem: imageIsNotFound,
//           }

//           return animalComImagem
//         }
//       }),
//     )

//     response.data.animais = animaisComImagem

//     return response.data
//   } catch (error) {
//     console.log(error)
//   }
// }

// export async function addProduct(data: AnimalFormData) {
//   try {
//     Juntando os dados para envio
//     const formData = new FormData()
//     formData.append('type', data.type)
//     formData.append('color', data.color)
//     formData.append('name', data.name)
//     formData.append('description', data.description)
//     formData.append('race', data.race)
//     formData.append('birthday', data.birthday.toString())
//     formData.append('sex', data.sex)

//     verifica se tem uma imagem
//     if (data.image?.length === 1) {
//       converte a imagem para base64
//       const base64Imagem = await readFileAsBase64(data.image[0])
//       formData.append('imagem', base64Imagem)
//       const response = await axios.post(link, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       })
//       return response.data
//     } else {
//       const response = await axios.post(link, formData)
//       return response
//     }
//   } catch (error) {
//     return error
//   }
// }

// function readFileAsBase64(file: File): Promise<string> {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader()
//     reader.onloadend = () => {
//       const base64String = reader.result as string
//       const base64Data = base64String.split(',')[1]
//       resolve(base64Data)
//     }
//     reader.onerror = (error) => {
//       reject(error)
//     }
//     reader.readAsDataURL(file)
//   })
// }
