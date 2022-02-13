<template>
    <div id="estrutura" class="">

        <div class="d-flex w-100 h-100">
            <div class="menu">
                <Navbar :active="active" />
            </div>

            <div class="col-md-10 body-pagina">
                <div class="px-5 py-4">
                    <h3 class="titulo-login text-primary">Agendar</h3>
                </div>

                <div class="row px-5">
                    <div class="col-md-4 col-sm-12" >
                        <div class="card border-0 card-lais">
                            <div class="card-body p-4">
                                <b-form id="form-filtro-disponibilidade">
                                    <b-form-group id="input-group-3" label="Campanha:" label-for="input-3">
                                        <b-form-select
                                          id="input-3"
                                          v-model="filtros.campanha"
                                          :options="campanhas"
                                          value-field="nome"
                                          text-field="nome"
                                          required>
                                        <b-form-select-option :value="null">Selecione uma opção</b-form-select-option>

                                        </b-form-select>
                                    </b-form-group>
                                    <b-form-group id="input-group-3" label="Municipio:" label-for="input-municipios">
                                        <b-form-select
                                          id="input-municipios"
                                          v-model="filtros.municipio"
                                          :options="municipios"
                                          required>

                                          
                                            <b-form-select-option value="null">Selecione uma opção</b-form-select-option>
                                            <b-form-select-option value="Natal">Natal</b-form-select-option>
                                            <b-form-select-option value="Mossoró">Mossoró</b-form-select-option>
                                            <b-form-select-option value="Parnamirim">Parnamirim</b-form-select-option>
                                            <b-form-select-option value="Acari">Acari</b-form-select-option>
                                            <b-form-select-option value="Caicó">Caicó</b-form-select-option>
                                            <b-form-select-option value="Currais Novos">Currais Novos</b-form-select-option>

                                        </b-form-select>
                                    </b-form-group>
                               
                                    <b-form-group id="input-group-3" label="Grupo de atendimento:" label-for="input-grupo">
                                        <b-form-select
                                          id="input-grupo"
                                          v-model="filtros.grupo"
                                          :options="grupos_atendimento"
                                          value-field="id"
                                          text-field="nome"
                                          required>                                            
                                            <b-form-select-option :value="null">Selecione uma opção</b-form-select-option>
                                        </b-form-select>
                                    </b-form-group>


                                    <b-form-group id="input-group-2" label="Data:" label-for="input-data">
                                        <b-form-input
                                          id="input-data"
                                          v-model="filtros.data"
                                          placeholder="##/##/####"
                                          required
                                          v-mask="'##/##/####'"
                                        ></b-form-input>
                                      </b-form-group>


                                      <b-form-group label="Tipo de exame" v-slot="{ ariaDescribedby }">
                                        <b-form-radio v-model="filtros.tipo_exame" :aria-describedby="ariaDescribedby" name="some-radios" checked value="RT-PC">RT-PC</b-form-radio>
                                        <b-form-radio v-model="filtros.tipo_exame" :aria-describedby="ariaDescribedby" name="some-radios" value="Antígeno">Antígeno</b-form-radio>
                                      </b-form-group>
                                </b-form>

                                <b-button variant="info" block size="lg" @click="filtrar" class="">Procurar</b-button>

                            </div>
                     
                        </div>
                    </div>
                    <div class="col-md-8 col-sm-12" >
                        <div class="card card-lais card-agenda border-0">

                            <div class="card-body">
                                <h3 class="titulo-login text-primary mb-5">Locais de exame - 04/02/2022</h3>


                                <div class="box-grupo-local" v-for="i in agendamentos_disponiveis" :key="i.id"> 
                                    <h5 class="text-primay titulo-lista-agendamentos">{{i.localizacao}} |<span v-if="i.campanha"> {{i.campanha}} |</span><span v-else> {{i.municipio}} |</span> {{formataData(i.data)}}</h5>
                                    <div class="grid-agenda mt-4">

                                        <div v-for="h in Object.keys(i.vagas)" :key="h">

                                            <input type="radio" class="btn-check d-none" :value="i.id+'-'+h" v-model="agendamento" :id="i.id+'-'+h"  >
                                            <label class="btn label-radios p-0" :for="i.id+'-'+h">
                                                <div class="label-hora">
                                                    {{h}}

                                                </div>
                                                <div class="label-vagas">
                                                    {{i.vagas[h]}}
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                    <hr style="background-color: #f4f4f4;">
                                </div>
                                <b-button variant="info" size="lg" @click="criarAgendamento" class="btn-confirmacao">Confirmar</b-button>

                            </div>
 
                        </div>
                    </div>
 
                </div>
            </div>
        </div>


    </div>
</template>
<script>
import Navbar from '../reutilizaveis/Navbar'

import serviceAgendamentos from '@/service/serviceAgendamentos'
import serviceCampanhas from '@/service/serviceCampanhas'
import serviceGrupos from '@/service/serviceGrupos'

export default {
    components: {
        Navbar
    },
    data() {
        return {
            active: 'agendar',
            url_agendamentos_disponiveis: '/agendamento-disponibilidade',
            usuario_id: '',
            agendamentos_disponiveis: [],
            agendamento: '',
            filtros: {
                campanha: 'null',
                municipio: 'null',
                grupo: 'null',
                data: '',
                tipo_exame: 'RT-PC'
            },
            campanhas: [],
            grupos_atendimento: [],
            municipios: [],
            objeto_agendamento: {
                usuario_id: this.usuario_id,
                campanha_id: 1,
                grupo_atendimento_id: 4,
                municipio: '',
                localizacao: '',
                data: '',
                hora: '',
                status: "AGENDADO",
                tipo_exame: 'RT-PC'
            }
        }
    },
    mounted() {
        this.usuario_id = localStorage.getItem('usuario_id');
        serviceAgendamentos.getAgendamentosDisponiveis(this.url_agendamentos_disponiveis).then(resposta => {
            this.agendamentos_disponiveis = resposta.data
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
        serviceCampanhas.getCampanhas().then(resposta => {
            this.campanhas = resposta.data
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
        serviceGrupos.getGrupos().then(resposta => {
            this.grupos_atendimento = resposta.data
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
    methods: {
        formataData(data){
            let data_exibida = data.split('-')
            data = data_exibida[1] + '/' + data_exibida[0] + '/' + data_exibida[2]
            return data
        },
        filtrar(){
            this.url_agendamentos_disponiveis = this.url_agendamentos_disponiveis+'?'

            if(this.filtros.campanha != 'null'){
                this.url_agendamentos_disponiveis = this.url_agendamentos_disponiveis + 'campanha='+this.filtros.campanha+'&'
            }
            if(this.filtros.municipio != 'null'){
                this.url_agendamentos_disponiveis = this.url_agendamentos_disponiveis + 'municipio='+this.filtros.municipio+'&'
            }
            if(this.filtros.grupo != 'null'){
                this.url_agendamentos_disponiveis = this.url_agendamentos_disponiveis + 'grupo_atendimento='+this.filtros.grupo+'&'
            }
            if(this.filtros.data != ''){
                let array_data = this.filtros.data.split('/')
                array_data = array_data[1] + '-' + array_data[0] + "-" + array_data[2]
                this.url_agendamentos_disponiveis = this.url_agendamentos_disponiveis + 'data='+array_data+'&'
            }
            if(this.filtros.tipo_exame != ''){
                this.url_agendamentos_disponiveis = this.url_agendamentos_disponiveis + 'tipo_exame='+this.filtros.tipo_exame+'&'
            }


    

        },

        criarAgendamento(){
            let agenda_id = this.agendamento.split('-')[0]
            let agenda_hora = this.agendamento.split('-')[1]
            let url_agenda = `/agendamento-disponibilidade/${agenda_id}`

            this.objeto_agendamento.hora = agenda_hora

            serviceAgendamentos.getAgendamentosDisponiveis(url_agenda).then(resposta => {
                this.objeto_agendamento.municipio = resposta.data.municipio
                this.objeto_agendamento.localizacao = resposta.data.localizacao
                this.objeto_agendamento.data = resposta.data.data
                this.objeto_agendamento.tipo_exame = this.filtros.tipo_exame
                this.objeto_agendamento.usuario_id = this.usuario_id
                serviceAgendamentos.criarAgendamento(this.objeto_agendamento).then(resposta => {
                    this.$swal.fire(
                        resposta.statusText,
                        'Agendamento marcado',
                        'success'
                    ).then(function() {
                        window.location = ''
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
    .card-lais.card-agenda .card-body{
        max-height: 80vh;
        overflow: scroll;
        overflow-x: hidden;
    }
    .btn-confirmacao{
        width: 225px;
    }
    @media (max-width: 550px) {
        .btn-confirmacao{
            width: 100% !important;
            display: block;
        }  
    }
    .grid-agenda{
        display: grid;
        grid-gap: 1rem;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;

    }
    input:checked ~ .label-radios{ 
        border: 1px solid #F72585;

    }
    input:checked ~ .label-radios .label-vagas{
        background-color: #F72585 !important;

    }
    input:checked ~ .label-radios .label-hora{
        color: #F72585;

    }

    .label-radios{
        width: 135px;
        border: 1px solid var(--unnamed-color-3a0ca3);
        background: #FFFFFF 0% 0% no-repeat padding-box;
        border: 1px solid #3A0CA3;
        border-radius: 4px;
        opacity: 1;
        display: flex;
        height: 45px;
    }
    .label-vagas{
        width: 81px;
        background-color: #3A0CA3 ;
        border-radius: 0px 4px 4px 0px;
        opacity: 1;
        text-align: center;
        letter-spacing: 0px;
        color: #FFFFFF;
        opacity: 1;
        font-size: 16px;
        justify-content: center;
        align-items: center;
        display: flex;
    }
    .label-hora{
        justify-content: center;
        display: flex;
        align-items: center;
        width: 50%;
        text-align: center;
        letter-spacing: 0px;
        color: #3A0CA3;
        opacity: 1;
        font-size: 16px;
    }

    .titulo-lista-agendamentos{
        text-align: left;
        font: normal normal medium 18px/26px Poppins;
        letter-spacing: 0px;
        color: #3A0CA3;
        opacity: 1;
    }
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
