import axios from "axios";
// import { Animal } from "@redux/animals/reducers";
import { UserData } from "@redux/users/reducers";

interface refleshTokenDTO {
  data: {
    data: UserData;
    token: string;
  };
}

const baseURL = import.meta.env.VITE_LINK as string;

export const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");

    config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  function (response) {
    console.log("passou");
    return response;
  },
  async function (error) {
    if (axios.isAxiosError(error) && error.response?.status.valueOf() === 401) {
      const data: UserData = JSON.parse(localStorage.getItem("user") || "");
      const user: refleshTokenDTO = await api.post("/refleshtoken", {
        email: data.email,
        password: data.password,
      });
      console.log(user);
      localStorage.setItem("token", user.data.token);
    } else {
      console.log("Outro erro");
    }
  }
);

// export async function getAnimalImage(animal: AnimalData[]) {
//   const result: AnimalData[] = animal
//   animal.map(async (item: AnimalData) => {
//     if (item.image) {
//       const response = await api.get(`/animal/images/${item.id}`)
//       result[item.id].imagesData = response.data
//     }
//   })
//   return animal
// }

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

// export async function addAnimal(data: Animal) {
//   try {
//     // Juntando os dados para envio
//     const formData = new FormData()
//     formData.append('type', data.type)
//     formData.append('color', data.color)
//     formData.append('name', data.name)
//     formData.append('description', data.description)
//     formData.append('race', data.race)
//     formData.append('birthday', data.birthday.toISOString())
//     formData.append('sex', data.sex)
//     formData.append('image', data.image.toString())

//     // verifica se tem uma imagem
//     if (data.imagesData?.length === 1) {
//       // converte a imagem para base64
//       const base64Imagem = await readFileAsBase64(data.imagesData[0])
//       formData.append('imageData', base64Imagem)
//     } else {
//       const response = await api.post('/animal', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       })
//       return response
//     }
//   } catch (error) {
//     console.log(error)
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
//       console.log(base64Data)
//     }
//     reader.onerror = (error) => {
//       reject(error)
//     }
//     reader.readAsDataURL(file)
//   })
// }
