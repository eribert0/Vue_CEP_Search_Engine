<template>
    <div class="d-flex align-items-center justify-content-center w-100">
        <div class="row justify-content-center">
            <div class="col-8 mb-5 w-100">
                <header class="text-center">
                    <h3>Buscador de CEP</h3>
                </header>
                <div class="alert alert-danger text-center" role="alert" v-if="messageError">
                    {{ messageError }}
                </div>
                <div class="mb-3">
                    <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="59190-000"
                        v-model="cepInput">

                </div>
                <div class="d-grid gap-2">
                    <button class="btn btn-outline-primary" type="button" v-if="isLoading">
                        <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                        <span role="status">Loading...</span>
                    </button>
                    <button type="button" class="btn btn-outline-primary" @click="onSubmit" v-else>Buscar</button>
                </div>

            </div>

            <div class="col-12" v-if="responseSuccess">
                <table class="table table-dark table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Logradouro</th>
                            <th scope="col">Bairro</th>
                            <th scope="col">Cidade</th>
                            <th scope="col">Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{{ getLogradouro }}</td>
                            <td>{{ getBairro }}</td>
                            <td>{{ getCidade }}</td>
                            <td>{{ getEstado }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios'
const getCep = async (cep) => {
    try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
        return {
            data: response.data,
            status: 200
        }
    } catch (error) {
        return {
            status: 400,
            message: 'ERRO AO BUSCAR CEP'
        }
    }

}
export default {
    name: 'MainView',
    data() {
        return {
            isLoading: false,
            responseSuccess: false,
            cepInput: '',
            cepData: {},
            messageError: ''
        }
    },
    computed: {
        getLogradouro() {
            if (this.cepData.logradouro === '') {
                return 'NÃO EXISTE'
            }
            return this.cepData.logradouro
        },
        getBairro() {
            if (this.cepData.bairro === '') {
                return 'NÃO EXISTE'
            }
            return this.cepData.bairro
        },
        getCidade() {
            if (this.cepData.localidade === '') {
                return 'NÃO EXISTE'
            }
            return this.cepData.localidade
        },
        getEstado() {
            if (this.cepData.uf === '') {
                return 'NÃO EXISTE'
            }
            return this.cepData.uf
        }
    },

    methods: {
        async onSubmit() {
            this.isLoading = true
            const { status, message, data } = await getCep(this.cepInput)
            if (status == 200) {
                this.cepData = data
                this.responseSuccess = true
            } else {
                this.messageError = message
            }
            this.isLoading = false
        }
    }
}

</script>

