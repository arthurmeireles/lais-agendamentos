 
 <template>
    <div>
        <b-modal size="lg" id="modal_comprovante" ref="modal_comprovante" hide-header title="Indicação de Prestador">
            <div class="px-5 py-4">
                <h2 class=" titulo-modal mb-4">
                    Termos e Política de privacidade
                </h2>
                <div class="d-flex">
                    <div class="box-data-hora d-inline">
                        <h2 v-if="dadosComprovante.data" class="info-modal text-primary mr-3">
                            {{formataData(dadosComprovante.data)}} -{{dadosComprovante.hora}}
                        </h2>
                    
                    </div>
         
                    <h2 class="info-modal text-sucesso ">
                        Agendada
                    </h2>
                </div>

                <h4 class="text-primary orientacoes mb-3 mt-4">Orientações</h4>

                <ul class="lista-orientacoes pl-3">
                    <li class="mb-3">Caso sejam informados dados falsos relacionados ao seu agendamento, ele poderá ser cancelado a critério do vacinador ou supervisor da sala de vacina (Art. 299 - Código Penal)</li>
                    <li class="mb-3">Você poderá cancelar seu agendamento com até 24h de antecedência. Em caso de não comparecimento, um novo agendamento será permitido após 48h do agendamento anterior.</li>
                    <li class="mb-3">O horário de agendamento poderá sofrer alterações, caso surjam problemas logísticos identificados pelo supervisor da sala de vacina</li>
                </ul>

                <div class="mt-5">
                    <hr style="background-color: #f4f4f4;">
                </div>

                <div class="d-flex align-items-center">
                    <h4 class="text-primary mb-0 mr-3">Cidadão:</h4> <h5 class="text-primary mb-0">{{nome_usuario}}</h5>
                </div>
                <div class="d-flex align-items-center">
                    <h4 class="text-primary mb-0 mr-3">Localização:</h4> <h5 class="text-primary mb-0">{{dadosComprovante.localizacao}}</h5>
                </div>
            
            </div>
           <template #modal-footer>
                <div class="w-100">
                    <b-button
                        variant="outline-secondary"
                        size="md"
                        class="float-right btn-fechar-modal"
                        @click="fecharModal">
                        Fechar
                    </b-button>
                    <b-button
                        variant="danger"
                        size="md"
                        class="float-right mr-3"
                        @click="cancelarAgendamento(agendamento)">
                        Cancelar agendamento
                    </b-button>
          
                </div>
            </template>
        </b-modal>
    </div>
</template>
<script>
import serviceAgendamentos from '@/service/serviceAgendamentos'

export default {
    
    props:{
        dadosComprovante: Object,
        sinal: Boolean,
    },
    watch: {
        sinal: function () {
            this.$refs["modal_comprovante"].show();
            this.nome_usuario = localStorage.getItem('nome_usuario')
        },
    },


data() {
    return {
        nome_usuario: ''
    }
},
    methods: {
        fecharModal(){
            this.$refs['modal_comprovante'].hide()
        },
        formataData(data){
            let data_exibida = data.split('-')
            data = data_exibida[1] + '/' + data_exibida[0] + '/' + data_exibida[2]
            return data
        },
        cancelarAgendamento(){
            var componente = this
            this.dadosComprovante.status = "CANCELADA"

            serviceAgendamentos.atualizarAgendamento(this.dadosComprovante).then(resposta => {
                this.$swal.fire(
                    resposta.statusText,
                    'Agendamento cancelado',
                    'success'
                ).then(function() {

                    componente.fecharModal()
                    componente.$emit('atualiza_lista')
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
    }
}
</script>

<style scoped>
    .info-modal{
        text-align: left;
        font: normal normal bold 24px/35px Poppins;
        letter-spacing: 0px;
        opacity: 1;
    }

    .lista-orientacoes{
        text-align: left;
        font: normal normal normal 16px/23px Poppins;
        letter-spacing: 0px;
        color: #FF4646;
        opacity: 1;
    }
    .orientacoes{
        text-align: left;
        font: normal normal bold 18px/27px Poppins;
        letter-spacing: 0px;
        color: #3A0CA3;
        opacity: 1;
    }
</style>