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
                    <p class="mb-0 mr-4 d-md-block d-none">Já tem conta?</p>
                    <b-button variant="purple" href="/login" class="align-items-center">
                        <b-icon icon="person" class="mr-2" aria-hidden="true"></b-icon>                        
                        Entrar
                    </b-button>
                </b-nav>

                <div id="box-card-form-cadastro" class="h-100 d-flex flex-column justify-content-center align-items-center">
                    <b-card id="card-form-cadastro" class="p-5">
    
                        <h4 class="text-info text-center font-bold d-none d-md-block">
                            Preencha os campos abaixo
                        </h4>
                        <p class="text-center f-16">É rápido, simples e seguro</p>


                        <b-form id="form-cadastro" class="mt-3">
                        
                           
                            <b-form-group
                                class="mb-2"
                                id="box-input-email"
                                label="Email"
                                label-for="input-email"
                                label-class="mb-0">
                                <b-form-input
                                    id="input-email"
                                    v-model="novo_usuario.email"
                                    type="email"
                                    placeholder="meunome@gmail.com"
                                    required >
                                </b-form-input>
                            </b-form-group>


                            <b-form-group
                                class="mb-2"
                                id="box-input-nome"
                                label="Nome"
                                label-for="input-nome"
                                label-class="mb-0">
                                <b-form-input
                                    id="input-nome"
                                    v-model="novo_usuario.nome"
                                    type="text"
                                    placeholder="Meu nome"
                                    required >
                                </b-form-input>
                            </b-form-group>

                            <b-form-group
                                class="mb-2"
                                id="box-input-senha"
                                label="Senha"
                                label-for="input-senha"
                                label-class="mb-0">
                                <b-form-input
                                    id="input-senha"
                                    v-model="novo_usuario.password"
                                    type="password"
                                    placeholder="********"
                                    required >
                                </b-form-input>
                                <b-form-invalid-feedback :state="validation">
                                    As senhas não são iguais
                                </b-form-invalid-feedback>
                            </b-form-group>
                            <b-form-group
                                class="mb-4"
                                id="box-input-confirmacao-senha"
                                label="Confirmação de senha"
                                label-for="input-confirmacao-senha"
                                label-class="mb-0">
                                <b-form-input
                                    id="input-confirmacao-senha"
                                    v-model="novo_usuario.confirmacao_senha"
                                    type="password"
                                    placeholder="********"
                                    required >
                                </b-form-input>
                            </b-form-group>

                            <b-button block @click="cadastrarUsuario" class="mt-3" variant="info">Entrar</b-button>
                        </b-form>

                    </b-card>
                    <p class="termos mt-3">
                        Ao assinar você concorda com os <a type="button" v-b-modal.modal-1 class="link">termos de serviço</a> e <a v-b-modal.modal-1 type="button" class="link">política de privacidade</a>.
                    </p>
                </div>
           
                <div class="h-initial px-3 py-2 d-md-none d-sm-block">
                    <div class="d-flex justify-content-around align-items-center">
                        <img left src="../../assets/images/logo-lais.png" width="145" height="45"  alt="Logo LAIS">
                        <img right src="../../assets/images/logo-ufrn.png" width="157" height="70" alt="Logo UFRN">
                    </div>
                </div>
            </div>
        </div>


        <b-modal id="modal-1" size="lg" hide-header>

            <div class="px-5 py-4">
                <h2 class=" titulo-modal mb-4">
                    Termos e Política de privacidade
                </h2>

                <p>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, 
                    sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, 
                    sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. 
                    Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. 
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, 
                    sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, 
                    sed diam voluptua.
                </p>
                <p>
                    At vero eos et accusam et justo duo dolores et ea rebum. 
                    Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. 
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, 
                    sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, 
                    sed diam voluptua. 
                    
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, 
                    sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, 
                    sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. 
                    Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. 
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, 
                    sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, 
                    sed diam voluptua. 
                </p>
            </div>
           <template #modal-footer>
                <div class="w-100">
                    <b-button
                        variant="outline-secondary"
                        size="md"
                        class="float-right btn-fechar-modal"
                        @click="$bvModal.hide('modal-1')">
                        Fechar
                    </b-button>
                </div>
            </template>
        </b-modal>

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
    #card-form-cadastro{
        box-shadow: 0px 3px 6px #0000001A;
        max-width: 500px;
        width: 100%;
        height: auto;
    }
    .termos{
        max-width: 500px;
        width: 100%;
        text-align: center;
        font: normal normal normal 16px/25px Poppins;
        letter-spacing: 0px;
        color: #4A4A4A;
        opacity: 1;
    }
    .titulo-modal{
        text-align: left;
        font: normal normal bold 30px/30px Poppins;
        letter-spacing: 0px;
        color: #F72585;
        opacity: 1;
    }
    #modal-1 p{
        text-align: left;
        font: normal normal normal 16px/30px Poppins;
        letter-spacing: 0px;
        color: #4A4A4A;
        opacity: 1;
    }
    .link{
        text-decoration: underline !important;
        cursor: pointer;
    }
    .btn-fechar-modal{
        min-width: 180px;
        text-align: center;
        font: normal normal normal 16px/25px Poppins;
        letter-spacing: 0px;
        color: #4A4A4A;
        opacity: 1;
    }
    .btn-fechar-modal:hover{
        color: white;
    }
</style>
<script>
import serviceCadastro from '@/service/serviceCadastro'
export default {
    name: 'Cadastro',
    data() {
        return {
            novo_usuario: {
                email: '',
                nome: '',
                password: '',
                confirmacao_senha: ''
            },
        }
    },
    methods: {
        cadastrarUsuario:function(){
            let component = this
     
            serviceCadastro.cadastrarUsuario(this.novo_usuario).then(resposta=>{
                if(resposta.status == 201 ){
                    this.$swal.fire(
                        'Cadastrado',
                        'Você foi cadastrado, por favor faça login',
                        'success'
                    ).then(function() {
                        localStorage.setItem('token', resposta.data.accessToken)
                        localStorage.setItem('usuario_id', resposta.data.user.id)
                        component.$router.push({name: 'paginaInicial'})
                    });
                }else{
                    console.log(resposta)
                }
            })


        },

    },
    computed: {
      validation() {
        return this.novo_usuario.senha == this.novo_usuario.confirmacao_senha
      }
    }
}
</script>