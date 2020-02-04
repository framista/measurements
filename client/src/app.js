import api from '../api'
var Chart = require('chart.js');

var ctx = document.getElementById('myChart');

var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            label: 'Temperatures',
            backgroundColor: 'rgb(255, 255, 255, 0.1)',
            borderColor: 'rgb(255, 99, 132)',
            data: [0, 10, 5, 2, 20, 30, 45]
        }]
    },
});




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