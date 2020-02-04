const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

const AppDAO = require('../db/dao')
const TemperatureRepository = require('../models/temperatureRepository')
const dao = new AppDAO('./db/database.sqlite3');
const temperatureRepo = new TemperatureRepository(dao);

router.get('/:id', async (req, res) => {
    const measurement = await temperatureRepo.getById(req.params.id);
    if (!measurement) return res.status(404).send("The measurement was not found");
    res.send(measurement);
})

router.get('/', async (req, res) => {
    const date = req.query.date;
    const measurements = await temperatureRepo.getAllByDate(date);    
    res.send(measurements);
})

router.post('/', async (req, res) => {
    const temp1 = req.body.temp1;
    const temp2 = req.body.temp2;
    const temp3 = req.body.temp3;
    const temp4 = req.body.temp4;
    const date = req.body.date;
    try{
        let response = await temperatureRepo.create(temp1, temp2, temp3, temp4, date);
        res.send(response);
    }catch (err){
        res.send(err.message);
    }
})

router.put('/:id', bodyParser.json(), async(req, res) => {
    const id = req.params.id;
    const temp1 = req.body.temp1;
    const temp2 = req.body.temp2;
    const temp3 = req.body.temp3;
    const temp4 = req.body.temp4;
    const date = req.body.date;
    const  measurement = { id, temp1, temp2, temp3, temp4, date };
    try{
        const measurementDb = await temperatureRepo.getById(req.params.id);
        if (!measurementDb) return res.status(404).send("The measurement was not found - cannot be updated");
        let response = await temperatureRepo.update(measurement);
        res.send(response)
    }catch (err){
        return res.status(404).send("The measurement was not found - cannot be updated");
    }
})

router.delete('/:id', async(req, res) => {
    const measurement = await temperatureRepo.delete(req.params.id);
    if (!measurement) return res.status(404).send("The measurement was not found - can not be deleted");
    res.send(measurement);
})

module.exports = router;