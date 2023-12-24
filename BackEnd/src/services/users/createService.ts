import { User } from '../../models/users/user'
import { message } from '../../teste'
import { City } from '../../models/cities'
import { Ong, type OngData } from '../../models/ongs/ongs'

interface CreateServiceProps {
  email: string
  name: string
  password: string
  ongData: OngData
}

export default async function createService ({ email, name, ongData, password }: CreateServiceProps) {
  const userExist = await User.findOne({ where: { email } })

  if (userExist !== null) {
    return { message: 'Esse email já foi cadastrado', status: 409 }
  }
  let data

  if (ongData !== undefined) {
    const { road, neighborhood, city, CEP, uf, cpfCnpj, houseNumber } = ongData
    const cpfCnpjExist = await Ong.findOne({ where: { cpfCnpj } })

    if (cpfCnpjExist !== null) {
      return { message: 'Esse CPF/CNPJ já foi cadastrado', status: 409 }
    }

    data = await User.create(
      {
        email,
        name,
        password,
        ongData: {
          road,
          neighborhood,
          city,
          CEP,
          uf,
          cpfCnpj,
          houseNumber
        }
      },
      {
        include: [{ association: User.associations.ongData }]
      }
    )

    await City.findOrCreate({
      where: { label: ongData.city }
    })
  } else {
    data = await User.create({
      email,
      name,
      password
    })
  }

  const formattedData = {
    id: data.id,
    email: data.email,
    name: data.name,
    ongData: ongData !== null && ongData
  }

  return {
    message: ongData !== undefined ? message.createOngSuccess : message.createUserSuccess,
    data: formattedData,
    status: 201
  }
}
