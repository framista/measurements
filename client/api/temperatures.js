import {api} from './index'

export const getTemperatures = date => api.get(`/temperatures?date=${date}`)
export const deleteMeasurement = id => api.delete(`/temperatures/${id}`)
export const insertMeasurement = payload => api.post('/temperatures/', payload)
export const updateMeasurementById = (id, payload) => api.put(`/temperatures/${id}`, payload)
export const getMeasurementById = id => api.get(`/temperatures/${id}`)
export const getAllId = () => api.get(`/temperatures/ids`)