import api from '../api'
import {todayDate} from './dateGenerator'
import {dataChartGenerator} from './chartGenerator'

const dateIpt = document.getElementById("date")
dateIpt.value = todayDate();

const Chart = require('chart.js');
const ctx = document.getElementById('chart');

api.getTemperatures("2020-01-01").then(result => {

    const measurements = result.data
    const dataChart = dataChartGenerator(measurements)
  
    console.log(dataChart)
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                backgroundColor: 'rgb(255, 255, 255, 0.1)',
                borderColor: 'rgb(255, 99, 132)',
                data: dataChart
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    type: 'time',
                    time: {
                        displayFormats: {
                            unit: 'hour'
                        }
                    }
                }]
            },
            tooltips: {
                callbacks: {
                    label: tooltipItem => {
                        let label = `Temp1 ${measurements[tooltipItem.index].temp1}  Temp2 ${measurements[tooltipItem.index].temp2}  Temp3 ${measurements[tooltipItem.index].temp3}  Temp4 ${measurements[tooltipItem.index].temp4}  `;
                        label += `Mean ${Math.round(tooltipItem.yLabel * 100) / 100}`;
                        return label;
                    }
                }
            },
            legend: {
                display: false,
            }
        }
    });

})




/*
api.getMeasurementById(5).then(measurement => console.log(measurement.data))

const measurement = {
    "temp1": 11.1,
    "temp2": 12.2,
    "temp3": 13.3,
    "temp4": 14.4,
    "date": "2020-11-11 12:10:10:12.000"
}
api.insertMeasurement(measurement).then(result => console.log(result.data))

const date = { "date": "2020-11-11" }
api.getTemperatures("2020-11-11").then(result => console.log(result.data))

*/