import adoptService from './adoptService'
import createService from './createService'
import deleteService from './deleteService'
import listService from './listService'

const adoptionsService = {
  adoptService,
  listService,
  createService,
  deleteService
}

export default adoptionsService
