import axios from 'axios'
import {getTemperatures, deleteMeasurement, insertMeasurement, updateMeasurementById, getMeasurementById, getAllId} from './temperatures'

export const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json'
    },
})

const apis = {
    getTemperatures,
    deleteMeasurement, 
    insertMeasurement,
    updateMeasurementById,
    getMeasurementById,
    getAllId,
}

export default apis