require('reflect-metadata')
const {DataSource} = require("typeorm")
const Doctor = require('./models/Doctor')
const Patient = require('./models/Patient')
const Diagnose = require('./models/Diagnose')
const User = require('./models/User')

const AppDataSource = new DataSource({
    type:"sqlite",
    database: "klinik.sqlite",
    synchronize: true, // auto create tables
    logging: false,
    entities: [Doctor,Patient, Diagnose, User],
})

module.exports = AppDataSource