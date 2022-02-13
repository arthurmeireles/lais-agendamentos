import {API} from './config'

export default {
    cadastrarUsuario: (usuario) => {
        return API.post('/users', usuario)
    },


}
