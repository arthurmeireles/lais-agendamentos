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
                    inverted: true
                },
                credits: {
                    text: 'LAIS',
                    href: 'https://lais.huol.ufrn.br/'
                },

                xAxis: {
                    categories: ['D1', 'D2', 'D3']
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
                    text: 'Vacinados geral'
                },
                series: [
                    // {
                    //     colorByPoint: true,
                    //     data: []
                    // }
                ],
            }
        }
    },

    mounted() {
        // this.atualiza= !this.atualiza
        let d1 = {
            name: 'D1',
            y: 0
        }
        let d2 = {
            name: 'D2',
            y: 0
        }
        let d3 = {
            name: 'D3',
            y: 0
        }
        for(let i of this.dados){
            
            d1.y = d1.y + i.doses.d1
            d2.y = d2.y + i.doses.d2
            d3.y = d3.y + i.doses.d3

        }
        console.log(d1)
        console.log(d2)
        console.log(d3)
        this.chartOptions.series[0].data.push(d1)
        this.chartOptions.series[0].data.push(d2)
        this.chartOptions.series[0].data.push(d3)
        this.atualiza= !this.atualiza

    },
};
</script>
