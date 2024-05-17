# ts-parcel
学习笔记
option = {
    backgroundColor:'#0c2d55',
    tooltip: {
        trigger: 'axis',
    },
    color:['#fcba62','#69f0ff'],
    legend: {
        show:false,
        x: 'left',
        top: '11%',
        left:'15%',
        textStyle: {
            color: '#68a9ff',
            fontSize: 14,
            padding:[0,8,0,8]
        }
    },
    grid: {
        top: '15%',
        left: '10%',
        right: '5%',
        bottom: '15%',
    },
    xAxis: [
        {
            type: 'category',
            axisLine: {
                show:false,
                lineStyle: {
                    color: '#425b78'
                }
            },
            axisLabel: {

                color: '#b9bec6',
            },
            splitLine: {
                show: false,
            },
            // boundaryGap: false,
            data: ['2019年', '2020年', '2021年', '2022年', '2023年'], //this.$moment(data.times).format("HH-mm") ,
        },
    ],

    yAxis: [
        {
            type: 'value',
            // name: '单位：m/s',
            nameTextStyle:{
                         color:"#b9bec6", 
                         fontSize:12,  
                     },
            axisLine: {
                show:false,
                lineStyle: {
                    color: '#425b78',
                    fontSize: 14
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#587485',
                },
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#b9bec6',

                },
            },
        },
    ],
    series: [
        {
            name: '风速',
            type: 'line',
            showSymbol: true,
            symbolSize: 8, 
            lineStyle: {
                normal: {
                    color: '#fcba62',
                },
            },
            label: {
                show: true,
                position: 'top',
                textStyle: {
                    color: '#fff',
                }
            },
            itemStyle: {
                color: "#fff",
                borderColor: "#fcba62",
                borderWidth: 2,
               
                
            },
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(
                        0,
                        0,
                        0,
                        1,
                        [
                            {
                                offset: 0,
                                color: 'rgba(223,172,105,0.5)',
                            },
                            {
                                offset: 1,
                                color: 'rgba(212,190,161,0)',
                            },
                        ],
                        false
                    ),
                },
            },
            data: [4, 7, 5, 4, 3, 5, 8], //data.values
        },
      
    ],
};
