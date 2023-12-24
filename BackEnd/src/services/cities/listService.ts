import { City } from '@Models/cities'

export default async function ListCity () {
  const data = await City.findAll()

  return { data }
}
