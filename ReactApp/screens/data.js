export default sampleData = {
    stockLine: {
        data: [
            [{
"x": 0,
"y": 15
}, {
"x": 10,
"y": 15
}],         
            
        ],
        options: {
            width: 370,
            height: 250,
            color: '#008000',
            axisX: {
                showAxis: false,
                showLines: false,
                showLabels: false,
                showTicks: false,
                zeroAxis: false,
                showDataPoint: false,
                orient: 'top',
                label: {
                    fontFamily: 'Arial',
                    fontSize: 14,
                    fontWeight: false,
                    fill: '#000000'
                }
            },
            axisY: {
                showAxis: false,
                showLines: false,
                showLabels: false,
                showTicks: false,
                showDataPoint: false,
                zeroAxis: false,
                orient: 'left',
                label: {
                    fontFamily: 'Arial',
                    fontSize: 16,
                    fontWeight: false,
                    fill: 'black'
                }
            }
        }
    },
    smoothLine: {
        data: [
            [{
                "x": -10,
                "y": -1000
            }]
        ],
        options: {
            width: 632,
            height: 220,
            color: '#2980B9',
            margin: {
                top: 20,
                left: 45,
                bottom: 25,
                right: 20
            },
            animate: {
                type: 'delayed',
                duration: 200
            },
            axisX: {
                showAxis: true,
                showLines: true,
                showLabels: true,
                showTicks: true,
                zeroAxis: false,
                orient: 'bottom',
                label: {
                    fontFamily: 'Arial',
                    fontSize: 14,
                    fontWeight: true,
                    fill: '#000000'
                }
            },
            axisY: {
                showAxis: true,
                showLines: true,
                showLabels: true,
                showTicks: true,
                zeroAxis: false,
                orient: 'right',
                label: {
                    fontFamily: 'Arial',
                    fontSize: 14,
                    fontWeight: true,
                    fill: '#000000'
                }
            }
        }
    },
}