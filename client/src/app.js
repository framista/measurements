import jsPDF from 'jspdf'

import api from '../api'
import { todayDate, currentTime } from './dateGenerator'
import { dataChartGenerator } from './chartGenerator'
import { findParameters } from './parameters'

const Chart = require('chart.js');

const ctx = document.getElementById('chart')
const createBtn = document.querySelector('.createMeasurement .form--button')
const temp1CreateIpt = document.querySelector('div:nth-child(1) > .form--input')
const temp2CreateIpt = document.querySelector('.createMeasurement div:nth-child(2) > .form--input')
const temp3CreateIpt = document.querySelector('.createMeasurement div:nth-child(3) > .form--input')
const temp4CreateIpt = document.querySelector('.createMeasurement div:nth-child(4) > .form--input')
const dateCreateIpt = document.querySelector('.form--date')

const updateBtn = document.querySelector('.updateMeasurement .form--button')
const idSelect = document.querySelector('.form--select')
const temp1UpdateIpt = document.querySelector('.updateMeasurement div:nth-child(2) > .form--input')
const temp2UpdateIpt = document.querySelector('.updateMeasurement div:nth-child(3) > .form--input')
const temp3UpdateIpt = document.querySelector('.updateMeasurement div:nth-child(4) > .form--input')
const temp4UpdateIpt = document.querySelector('div:nth-child(5) > .form--input')

const generatePdfBtn = document.querySelector('.generatePDF')
const generateCsvBtn = document.querySelector('.generateCSV')
const dateIpt = document.getElementById("date")
const createChartBtn = document.querySelector('.chart--form__button:nth-child(2)')

let lastOption = 1
let measurements

const chart = new Chart(ctx, {
    type: 'line',
    options: {
        legend: {
            display: false,
        },
    }
})

dateIpt.value = todayDate()
dateCreateIpt.value = currentTime()

api.getAllId().then(result => {
    const ids = result.data
    ids.map(d => {
        const option = document.createElement("option")
        option.setAttribute("value", d.id)
        const node = document.createTextNode(d.id)
        option.appendChild(node)
        idSelect.appendChild(option)
    })
})

idSelect.addEventListener('click', e => {
    const id = e.target.value
    if (lastOption !== id) {
        lastOption = id
        api.getMeasurementById(id).then(measurement => {
            const { temp1, temp2, temp3, temp4 } = measurement.data
            temp1UpdateIpt.value = temp1
            temp2UpdateIpt.value = temp2
            temp3UpdateIpt.value = temp3
            temp4UpdateIpt.value = temp4
        })
    }
})

generatePdfBtn.addEventListener('click', e => {
    const newCanvas = document.querySelector('#chart');
    const newCanvasImg = newCanvas.toDataURL("image/jpeg", 1.0);
    const doc = new jsPDF();
    const parameters = findParameters(measurements);
    doc.setFontSize(20);
    doc.text(15, 15, `Data for ${dateIpt.value}`);
    doc.text(15, 35, `Minimal temperature: ${parameters.min} on ${parameters.minDate}`);
    doc.text(15, 50, `Maximal temperature: ${parameters.max} on ${parameters.maxDate}`);
    doc.text(15, 65, `Mean temperature: ${parameters.mean}`);
    doc.addImage(newCanvasImg, 'JPEG', 35, 80, 140, 75);
    doc.save(`report${dateIpt.value}`);
})

generateCsvBtn.addEventListener('click', e => {
    var csv = `Date ${dateIpt.value}\n`;
    csv += `ID, temp1, temp2, temp3, temp4, date \n`
    measurements.forEach(row => {
        csv += `${row.id},${row.temp1},${row.temp2},${row.temp3},${row.temp4},${row.date}`
        csv += "\n"
    })
    const hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'data.csv';
    hiddenElement.click();
})

createBtn.addEventListener('click', e => {
    e.preventDefault()
    const measurement = {
        "temp1": parseFloat(temp1CreateIpt.value),
        "temp2": parseFloat(temp2CreateIpt.value),
        "temp3": parseFloat(temp3CreateIpt.value),
        "temp4": parseFloat(temp4CreateIpt.value),
        "date": dateCreateIpt.value
    }
    api.insertMeasurement(measurement)
})

updateBtn.addEventListener('click', e => {
    e.preventDefault()
    const measurement = {
        "temp1": parseFloat(temp1UpdateIpt.value),
        "temp2": parseFloat(temp2UpdateIpt.value),
        "temp3": parseFloat(temp3UpdateIpt.value),
        "temp4": parseFloat(temp4UpdateIpt.value),
    }
    const id = idSelect.value
    api.updateMeasurementById(id, measurement)
})

createChartBtn.addEventListener('click', e => {
    e.preventDefault()
    const date = dateIpt.value
    removeData(chart)
    api.getTemperatures(date).then(result => {
        measurements = result.data
        addData(chart, measurements)
    })
})

function removeData(chart) {
    chart.data.datasets.forEach((dataset) => {
        dataset.data.pop()
    })
    chart.update()
}

function addData(chart, measurements) {
    const dataChart = dataChartGenerator(measurements)
    chart.data = {
        datasets: [{
            backgroundColor: 'rgb(255, 255, 255, 0.1)',
            borderColor: 'rgb(255, 99, 132)',
            data: dataChart
        }]
    }
    chart.options = {
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
        },
    }
    chart.update();
}
