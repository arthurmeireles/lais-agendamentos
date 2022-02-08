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


                    <b-button variant="info" block size="lg" class="mx-2">TRANSPARÊNCIA</b-button>
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
                    <p class="mb-0 mr-4 d-md-block d-none">Não tem uma conta?</p>
                    <b-button variant="purple" class="align-items-center">
                        <b-icon icon="person" class="mr-2" aria-hidden="true"></b-icon>                        
                        Crie uma
                    </b-button>
                </b-nav>

                <div id="box-card-form-login" class="h-100 d-flex justify-content-center align-items-center">
                    <b-card id="card-form-login" class="p-5">
    
                        <p class="f-16 text-info text-center d-none d-md-block">
                            Preencha os campos abaixo
                        </p>

                        <b-form id="form-login" class="mt-4">
                            <b-form-group
                                id="box-input-email"
                                label="Email"
                                label-for="input-email">
                                <b-form-input
                                    id="input-email"
                                    v-model="usuario.email"
                                    type="email"
                                    placeholder="Digite aqui seu e-mail"
                                    required >
                                </b-form-input>
                            </b-form-group>

                            <b-form-group id="box-input-senha" label="Senha" label-for="input-senha">
                                <b-form-input
                                    id="input-senha"
                                    v-model="usuario.senha"
                                    placeholder="Digite aqui sua senha"
                                    required>
                                </b-form-input>
                            </b-form-group>
                            <div class="w-100 d-flex justify-content-end">
                                <a class="text-right mb-3 text-normal" href="">Esqueceu sua senha?</a>
                            </div>
                         

                            <b-button block type="submit" variant="info">Entrar</b-button>
                        </b-form>

                    </b-card>
                </div>
           
                <div class="h-initial px-3 py-2 d-md-none d-sm-block">
                    <div class="d-flex justify-content-around align-items-center">
                        <img left src="../../assets/images/logo-lais.png" width="145" height="45"  alt="Logo LAIS">
                        <img right src="../../assets/images/logo-ufrn.png" width="157" height="70" alt="Logo UFRN">
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
import serviceLogin from '@/service/serviceLogin'
import axios from 'axios'

export default {
    name: 'Login',
    data() {
        return {
            usuario: {
                email: '',
                senha: ''
            }
        }
    },
    methods:{
        logarUsuario: function(){
            serviceLogin.login(this.usuario).then(resposta => {
                console.log(resposta.data)
                if(resposta.status == 200){
                    console.log("Logou")
                    localStorage.setItem('token', resposta.data.token)
                    localStorage.setItem('tipo_usuario', resposta.data.usuario.tipo_usuario)

                    axios.defaults.headers.common['Authorization'] = 'Token '+resposta.data.token ;
                    this.$router.push({name: 'dashboard'})

                }
            }).catch(
                (error) =>{
                    this.$swal.fire(
                        'Oops...',
                        'Tivemos um problema, tente novamente!',
                        'error',
                    )
                    console.log(error)
                }
            )
        }

    }
}
</script>