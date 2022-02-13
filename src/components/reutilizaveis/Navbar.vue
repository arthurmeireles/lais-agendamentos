<template>
<!-- Vertical navbar -->
<div class="vertical-nav bg-white" id="sidebar">
    <div class="p-edit">
        <div class="d-flex">
            <b-iconstack style="width: 50px; height: 50px" class="mb-3 d-flex justify-content-center align-items-center mr-2">
                <b-icon stacked icon="calendar4" style="color: #3A0CA3;" scale="0.75"></b-icon>
            </b-iconstack>
            <h3 class="titulo-navbar text-primary">Agendamento <br> Online</h3>
        </div>
    </div>



    <div class=" mb-4">
        <div class="media w-100 d-block">
            <a class="nav-link dropdown-toggle" style="color: #000000" id="btn-drop" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
                <b-avatar class="b-avatar-img"></b-avatar>

                <div>
                    <p class="seja-bem-vindo mb-0">Seja bem vindo</p>
                    <h4 class="nome-user mb-0">{{usuario.nome}}</h4>
                </div>
            </a>
            <div class="dropdown-menu">
                <a class="dropdown-item" href="#">Meu Perfil</a>
                <a class="dropdown-item" href="#">Sair</a>
            </div>
        </div>
    </div>
    <div class="col">
        <hr style="background-color: #f4f4f4;">
    </div>

    <div class="col mt-4">
        <ul id="menu" class="nav flex-column bg-white mb-0">
            <li class="nav-item">
                <a :class="{active: escolheActive('agendamentos')}" href="/" class="nav-link">
                    <i class="fa fa-th-large mr-3 fa-fw"></i>
                    Meus Agendamentos
                </a>
            </li>
            <li class="nav-item mt-3">
                <a :class="{active: escolheActive('agendar')}" href="/agendar" class="nav-link">
                    <i class="fa fa-address-card mr-3 fa-fw"></i>
                    Agendar
                </a>
            </li>
        </ul>

    </div>

</div>
</template>

<script>
import serviceUsuario from '@/service/serviceUsuario';
export default {
    props: {
        active: String
    },
    data() {
        return {
            usuario_id: '',
            usuario: '',
        }
    },
    mounted() {
        this.usuario_id = localStorage.getItem('usuario_id');
        serviceUsuario.getUsuario(this.usuario_id).then(resposta => {
            this.usuario = resposta.data
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
        escolheActive(menu){
            if(menu == this.active){
                return true
            }
            else{
                false
            }
        }
    },

        
}
</script>

<style scoped>
    #menu .nav-link{
        text-align: left;
        font: normal normal normal 16px/25px Poppins;
        letter-spacing: 0px;
        color: #3A0CA3;
        opacity: 1;
        height: 46px;
    }

    #menu .nav-link i{
        color: #F72585;
    }
    #menu .nav-link.active i{
        color: white;
    }
    #menu .nav-link.active{
        background: #F72585 0% 0% no-repeat padding-box;
        border-radius: 4px;
        opacity: 1;
        color: white
    }
    .p-edit{
        padding: 1.5rem 1rem ;
    }
    .titulo-navbar{
        letter-spacing: 0px;
        color: #3A0CA3;
        opacity: 1;
        font-size: 16px;
        font-weight: bold;
    }

    .b-avatar-img {
        width: 48px;
        height: 48px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #btn-drop{
        height: 60px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .seja-bem-vindo{
        color: #4A4A4A;
        text-align: left;
        font: normal normal 300 16px/26px Poppins;
        letter-spacing: 0px;
        color: #4A4A4A;
        opacity: 1;
    }
    .nome-user{
        letter-spacing: 0;
        text-align: left;
        font: normal normal bold 16px/26px Poppins;
        letter-spacing: 0px;
        color: #F72585;
        opacity: 1;
    }
</style>