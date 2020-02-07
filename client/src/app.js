import api from '../api'
import { todayDate, currentTime } from './dateGenerator'
import { dataChartGenerator } from './chartGenerator'

const Chart = require('chart.js');

const ctx = document.getElementById('chart')
const createBtn = document.querySelector('.createMeasurement .form--button')
const temp1CreateIpt = document.querySelector('div:nth-child(1) > .form--input')
const temp2CreateIpt = document.querySelector('.createMeasurement div:nth-child(2) > .form--input')
const temp3CreateIpt = document.querySelector('.createMeasurement div:nth-child(3) > .form--input')
const temp4CreateIpt = document.querySelector('.createMeasurement div:nth-child(4) > .form--input')
const dateCreateIpt = document.querySelector('.form--date')

const updateBtn = document.querySelector('.updateMeasurement .form--button')
const idIptOption = document.querySelector('.form--select')
const temp1UpdateIpt = document.querySelector('.updateMeasurement div:nth-child(2) > .form--input')
const temp2UpdateIpt = document.querySelector('.updateMeasurement div:nth-child(3) > .form--input')
const temp3UpdateIpt = document.querySelector('.updateMeasurement div:nth-child(4) > .form--input')
const temp4UpdateIpt = document.querySelector('div:nth-child(5) > .form--input')

const generatePdfBtn = document.querySelector('.generatePDF')
const generateCsvBtn = document.querySelector('.generateCSV')
const dateIpt = document.getElementById("date")
const dataChartBtn = document.querySelector('.chart--form__button:nth-child(2)')
const createChartBtn = document.querySelector('.chart--form__button:nth-child(3)')

dateIpt.value = todayDate()
dateCreateIpt.value = currentTime()

api.getAllId().then(result => {
    const ids = result.data
    ids.map( d  => {
        const option = document.createElement("option")
        option.setAttribute("value", d.id)
        const node = document.createTextNode(d.id)
        option.appendChild(node)
        idIptOption.appendChild(option)
    })
})

createBtn.addEventListener('click', e => {
    e.preventDefault()
    let measurement = {
        "temp1": parseFloat(temp1CreateIpt.value),
        "temp2": parseFloat(temp2CreateIpt.value),
        "temp3": parseFloat(temp3CreateIpt.value),
        "temp4": parseFloat(temp4CreateIpt.value),
        "date": dateCreateIpt.value
    }
    api.insertMeasurement(measurement)
})

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