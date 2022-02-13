<template>
  <div>
    <highcharts :key="atualiza" class="hc" :options="chartOptions" ref="chart"></highcharts>
  </div>
</template>

<script>
import Highcharts from 'highcharts'
import exportingInit from 'highcharts/modules/exporting'
exportingInit(Highcharts)

export default {
    props:{
        dados: Object,
        tipoChart: String
    },

    data() {
        return {
            dataseries: [],
            variavel: '',

            atualiza: false,
            chartOptions: {
                chart: {
                    type: this.tipoChart,
            
                },
                credits: {
                    text: 'LAIS',
                    href: 'https://lais.huol.ufrn.br/'
                },

                xAxis: {
                    categories: []
                },
                tooltip: {
                    headerFormat: '<b>{point.x}</b><br/>',
                    pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
                },
                accessibility: {
                    point: {
                        valueSuffix: '%'
                    }
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        colors: [
                            '#F72585',
                            '#3A0CA3',
                            '#1FB451',
                            '#1F78B4',
                            '#7E1FB4'
                        ],
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                        }
                    }
                },
                title: {
                    text: 'Doses recebidas'
                },
                series: [{
                    data: []
                }],

            }
        }
    },

    mounted() {
        this.atualiza= !this.atualiza
        for(let i of Object.keys(this.dados)){
            let objeto ={
                name: i,
                y: parseInt(this.dados[i].split('%')[0]),
                data: [parseInt(this.dados[i].split('%')[0])]
            }
       
            this.dataseries.push(objeto)
        }
        this.chartOptions.series[0].data = this.dataseries
        this.atualiza= !this.atualiza

    },
};
</script>
