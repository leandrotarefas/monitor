<template>

    <div class="container mt-2">    
        
        <div class="progress" style="height:40px">
            <div class="progress-bar" role="progressbar" :style="{ width: percent + '%' }" aria-valuenow="0"
                aria-valuemin="0" aria-valuemax="100">
                <h4>{{ percent }}%</h4>
            </div>
        </div>
        
        <table class="table table-striped" v-if="mostraPendentes">
          <thead>
            <tr>
              <th>Arquivos Pendentes</th>
              <th>Ultimo Recebimento</th>             
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in pendencias" :key="index">
              <td>{{ item.nome }} </td>
              <td>{{ item.dataRecebimento }}</td>
            </tr>
          </tbody>
        </table>
      </div>

</template>

<script>

export default {

    data() {
        return {
            tamanhoDiv: 200,
            percent: 0,
            pendencias: [],
            mostraPendentes : false
        };
    },
    mounted() {

        setInterval(() => {

            fetch('http://localhost:3004/extratores')
                .then(response => response.json())

                .then(data => {

                    this.percent = data.preenchidos.percentual;
                    this.pendencias = data.atrasados.extratores
                    this.mostraPendentes = this.pendencias.length > 0;

                }).catch((err) => {
                    console.log(err)
                });

        }, 3000);


    }
}

</script>