import api from '../api'

const dateIpt = document.getElementById("date")
dateIpt.value = todayDate();

const Chart = require('chart.js');
const ctx = document.getElementById('myChart');

api.getTemperatures("2020-01-01").then(result => {

    const measurements = result.data
    const dataChart = measurements.map(measurement => {
        const { temp1, temp2, temp3, temp4, date } = measurement;
        let meanTemperature = (temp1 + temp2 + temp3 + temp4) / 4;
        return {
            x: new Date(date).toUTCString(),
            y: meanTemperature
        }
    })
    console.log(dataChart)
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                label: 'Temperatures',
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
            }
        }
    });

})

function todayDate() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    return today;
}


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