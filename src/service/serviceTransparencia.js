import {API} from './config'

export default {
    getDadosTransparencia: () => {
        return API.get('/transparencia')
    },


}
