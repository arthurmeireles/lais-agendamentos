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
        dados: Array,
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
                    text: 'Doses aplicadas'
                },
                series: [

                ],


            }
        }
    },

    mounted() {
        this.atualiza= !this.atualiza
        let d1 = {
            name: 'D1',
            data: []
        }
        let d2 = {
            name: 'D2',
            data: []
        }
        let d3 = {
            name: 'D3',
            data: []
        }
        for(let i of this.dados){
            this.chartOptions.xAxis.categories.push(i.faixa)
            d1.data.push(i.doses.d1)
            d2.data.push(i.doses.d2)
            d3.data.push(i.doses.d3)
        }
        this.chartOptions.series.push(d1)
        this.chartOptions.series.push(d2)
        this.chartOptions.series.push(d3)
        this.atualiza= !this.atualiza

    },
};
</script>
