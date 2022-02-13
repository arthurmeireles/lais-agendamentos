import {API} from './config'

export default {

    getCampanhas: () => {
        return API.get(`/campanha`)
    },
}

