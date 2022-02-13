<template>
    <div id="estrutura" class="w-100 h-100 overflow-hidden">
        <div class="d-flex">

            <div class="h-vh-100 p-5 box-img-login d-md-flex d-none flex-column">
                <div class="d-md-flex d-sm-none  h-100 flex-column align-items-center justify-content-center">
                    <b-iconstack font-scale="5" class="mb-3">
                        <b-icon stacked icon="calendar4" variant="white"  scale="0.75"></b-icon>

                    </b-iconstack>
                    <h3 class="text-white mb-4 titulo-login">Agendamento online</h3>

                    <p class="text-white f-16 mb-4">Rápido e seguro</p>
                    <p class="text-white f-16 mb-4 text-center">Evite filas e aglomeração.<br> O seu bem é o bem de todos</p>


                    <b-button variant="info" href="/transparencia" block size="lg" class="mx-2">TRANSPARÊNCIA</b-button>
                </div>


                <div class="py-2">

                    <div class="d-flex justify-content-between align-items-center">
                        <img left src="../../assets/images/logo-lais.png" width="145" height="45"  alt="Logo LAIS">
                        <img right src="../../assets/images/logo-ufrn.png" width="157" height="70" alt="Logo UFRN">
                    </div>
                </div>
            </div>

            <div class="w-100 d-block">
                <b-nav class="nav-login p-3 justify-content-end align-items-center">
                    <b-iconstack font-scale="5" class="d-md-none d-sm-block">
                        <b-icon stacked icon="calendar4" variant="white"  scale="0.75"></b-icon>

                    </b-iconstack>
                    <b-button variant="purple" href="#" class="align-items-center mr-3">
                        Filtros
                    </b-button>
                    <b-button variant="purple" href="/login" class="align-items-center">
                        Voltar
                    </b-button>
                </b-nav>

                <div id="box-card-form-cadastro" v-if="dadosTransparencia" class="h-100 row">
                    <div class="col-md-6 col-sm-12">
                        <Grafico :dados="dadosTransparencia.doses['recebidas']" :tipoChart="chartPizza" ></Grafico>

                    </div>

                    <div class="col-md-6 col-sm-12">
                        <GraficoBarra :dados="dadosTransparencia.doses['aplicadas']" :tipoChart="chartBarra" ></GraficoBarra>
                    </div>

                    <div class="col-md-6 col-sm-12">
                        <GraficoBarraHorizontal :dados="dadosTransparencia.vacinacao" :tipoChart="chartBarraH" ></GraficoBarraHorizontal>
                    </div>

                </div>
       
            </div>
        </div>
    </div>


</template>
<style scoped>
    #estrutura{
        height: 100vh;
        width: 100vw;
        align-items: center;
        max-width: 100vw;
        max-height: 100vh;
        overflow: hidden;
    }

</style>
<script>
import GraficoBarra from '../reutilizaveis/GraficoBarra'
import Grafico from '../reutilizaveis/Grafico'
import GraficoBarraHorizontal from '../reutilizaveis/GraficoBarraHorizontal'


import serviceTransparencia from '@/service/serviceTransparencia'
export default {
    name: 'portalTransparencia',
    components: {
        Grafico: Grafico,
        GraficoBarra: GraficoBarra,
        GraficoBarraHorizontal: GraficoBarraHorizontal
    },

    data() {
        return {
            dadosTransparencia: [],
            chartPizza: 'pie',
            chartBarra: 'column',
            chartBarraH: 'column'

        }
    },
    methods: {
        get_dados(){
            let componente = this
            serviceTransparencia.getDadosTransparencia().then(resposta => {
                componente.dadosTransparencia= resposta.data
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
    mounted() {
        this.get_dados()
    },

}
</script>