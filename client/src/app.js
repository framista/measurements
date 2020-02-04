import api from '../api'

api.getMeasurementById(5).then(measurement => console.log( measurement.data))

const measurement = {
	"temp1": 11.1,
	"temp2": 12.2,
	"temp3": 13.3,
	"temp4": 14.4,
	"date": "2020-11-11 12:10:10:12.000"
}
api.insertMeasurement(measurement).then(result => console.log(result.data))

const date = {"date": "2020-11-11"}
api.getTemperatures("2020-11-01").then(result => console.log(result.data))