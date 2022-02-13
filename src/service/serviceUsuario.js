import {API} from './config'

export default {

  getUsuario: (usuarioId)=>{
      return API.get(`/users/${usuarioId}`)
  }
}
