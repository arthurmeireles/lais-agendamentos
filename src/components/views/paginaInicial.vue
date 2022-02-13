<template>
    <div id="estrutura" class="">

        <div class="d-flex w-100 h-100">
            <div class="menu">
                <Navbar :active="active" />
            </div>

            <div class="col-md-10 body-pagina">
                <div class="px-5 py-4">
                    <h3 class="titulo-login text-primary"> Meus Agendamentos</h3>
                </div>

                <div class="row px-5" v-if="agendamentos_usuario.length > 0">
                    <div class="col-md-3 col-sm-12"  v-for="agendamento in agendamentos_usuario" :key="agendamento.id">
                        
                        <div class="card card-lais border-0 mb-3">
                            <div class="header-card border-bottom-1 mx-3 py-3">
                                <div class="d-flex justify-content-between">
                                    <div class="d-flex">
                                        <div class="icone">
                                            <img height="40px" src="../../assets/images/vacina-2.png" alt="">
                                        </div>
                                        <div class="box-exame">
                                            <h4 class="tipo-exame mb-1">Tipo de exame</h4>
                                            <h4 class="nome-exame mb-0">{{agendamento.tipo_exame}}</h4>
                                        </div>
                                    </div>
                            
                                    <div class="box-situacao d-flex align-items-center justify-content-end">
                                        <span class="agendada" v-if="agendamento.status == 'AGENDADO'">Agendado</span>
                                        <span class="cancelado" v-else>Cancelado</span>

                                    </div>
                                </div>


                            </div>
                            <div class="body-card mx-3 mt-2" >
                                <div class="row">
                                    <div class="col-md-12 mt-2">
                                        <h4 class="conteudo-card-agendamento">
                                            <i class="fa fa-map-marker-alt mr-2"></i>
                                            {{agendamento.localizacao}}
                                        </h4>
                                    </div>
                                    <div class="col-md-7 mt-2">
                                        <h4 class="conteudo-card-agendamento" v-if="agendamento.data">
                                            <i class="fas fa-calendar-alt mr-2"></i>                                            
                                            {{formataData(agendamento.data)}}
                                        </h4>
                                    </div>

                                    <div class="col-md-5 mt-2">
                                        <h4 class="conteudo-card-agendamento">
                                            <i class="fas fa-clock mr-2"></i>                                            
                                            {{agendamento.hora}}
                                        </h4>
                                    </div>
                                </div>
                            </div>

                            <div class="footer-card">
                                <div class="mt-3">
                                    <b-button-group  class="w-100" size="lg">
                                        <b-button v-if="agendamento.status != 'CANCELADA'" @click="abrir_comprovante(agendamento)" variant="info">Detalhes</b-button>
                                        <b-button v-if="agendamento.status != 'CANCELADA'" @click="cancelarAgendamento(agendamento)" variant="danger">Cancelar</b-button>
                                    </b-button-group>
                                </div>
                            </div>
                        </div>
                    </div>
 
                </div>
            </div>
        </div>

        <modalcomprovante
            :dadosComprovante="dadosComprovante"
            :sinal="modal_comprovante"
            @atualiza_lista="get_dados">
        </modalcomprovante>

    </div>
</template>
<script>
import Navbar from '../reutilizaveis/Navbar'
import modalcomprovante from '../reutilizaveis/modal_comprovante'

import serviceAgendamentos from '@/service/serviceAgendamentos'
export default {
    components: {
        Navbar,
        modalcomprovante
    },
    data() {
        return {
            active: 'agendamentos',
            usuario_id: '',
            agendamentos_usuario: [],
            modal_comprovante: false,
            dadosComprovante: {}
        }
    },
    mounted() {
        this.usuario_id = localStorage.getItem('usuario_id');

        this.get_dados()

    },
    methods: {
        get_dados(){
            this.agendamentos_usuario = []
            let componente = this
            serviceAgendamentos.getAgendamentosUsuario().then(resposta => {
                for(let agendamento of resposta.data){
                    console.log(agendamento)
                    console.log(componente.agendamentos_usuario)

                    if(agendamento.usuario_id == this.usuario_id){
                        console.log('entra?')
                        componente.agendamentos_usuario.push(agendamento)
                    }
                }

                console.log(this.agendamentos_usuario)
            }).catch(
                (error) =>{
                    this.$swal.fire(
                        'Oops...',
                        'Tivemos um problema, na busca de seus agendamentos, tente novamente!',
                        'error',
                    )
                    console.log(error)
                }
            )
        },
        abrir_comprovante(agendamento){
            this.dadosComprovante = agendamento
            this.modal_comprovante = !this.modal_comprovante
        },

        formataData(data){
            let data_exibida = data.split('-')
            data = data_exibida[1] + '/' + data_exibida[0] + '/' + data_exibida[2]
            return data
        },

        cancelarAgendamento(agendamento){

            agendamento.status = "CANCELADA"

            serviceAgendamentos.atualizarAgendamento(agendamento).then(resposta => {
                this.$swal.fire(
                    resposta.statusText,
                    'Agendamento cancelado',
                    'success'
                ).then(function() {
                    this.get_dados()
                });
            }).catch(
                (error) =>{
                    this.$swal.fire(
                        'Oops...',
                        'Tivemos um problema, na busca de seus agendamentos, tente novamente!',
                        'error',
                    )
                    console.log(error)
                }
            )      
         
        }


    },  
}
</script>



<style scoped>
    #estrutura{
        height: 100vh;
        width: 100vw;
        max-width: 100vw;
        max-height: 100vh;
    }
    .menu{
        border-right: solid 2px #F72585;
    }
    .box-exame .tipo-exame{
        color: #F72585;
        font-size: 17px;
        font-weight: 600;
    }
    .box-exame .nome-exame{
        color: #F72585;
        font-size: 19px;
        letter-spacing: 0px;
        font-weight: 400;
    }
    span.agendada{
        color: #00CF9F;
        font-size: 15px;
        text-align: left;
        font: normal normal 600 15px/23px Poppins;
        letter-spacing: 0px;
        opacity: 1;       
    }
    span.cancelado{
        color: #DC2626;
        font-size: 15px;
        text-align: left;
        font: normal normal 600 15px/23px Poppins;
        letter-spacing: 0px;
        opacity: 1;  
    }
    .card-lais{
        box-shadow: 0px 8px 9px #00000029;
        border-radius: 4px;
        min-height: 250px;
    }

    .border-bottom-1{
        border-bottom: 1px solid #e1e1e1;
    }

    .conteudo-card-agendamento{
        font: var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-normal) 20px/30px var(--unnamed-font-family-poppins);
        letter-spacing: var(--unnamed-character-spacing-0);
        color: var(--unnamed-color-3a0ca3);
        text-align: left;
        font: normal normal normal 20px/30px Poppins;
        letter-spacing: 0px;
        color: #3A0CA3;
        opacity: 1;
    }
    .footer-card{
        height: 55px;
    }
    .footer-card button{
        width: 50%;
        font: normal normal normal 16px/25px Poppins;
        letter-spacing: 0px;
        color: #FFFFFF;
        opacity: 1;
        height: 55px;
        border-top-left-radius: 0px;
        border-top-right-radius: 0px;

    }
</style>
