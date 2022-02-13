import {API} from './config'

export default {
    getAgendamentosUsuario: () => {
        return API.get(`/agendamentos`)
    },
    getAgendamentosDisponiveis: (url) => {
        return API.get(url)
    },

    criarAgendamento: (agendamento) => {
        return API.post('/agendamentos', agendamento)
    },
    removerAgendamento: (agendamento) => {
        return API.patch(`/agendamentos/${agendamento.id}`, agendamento)
    },
    atualizarAgendamento: (agendamento) => {
        return API.put(`/agendamentos/${agendamento.id}`, agendamento)
    },
}

