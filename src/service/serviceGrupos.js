import {API} from './config'

export default {
    getGrupos: () => {
        return API.get('/grupos-atendimentos')
    },
}
