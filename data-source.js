require('reflect-metadata')
const {DataSource} = require("typeorm")
const Doctor = require('./models/Doctor')

const AppDataSource = new DataSource({
    type:"sqlite",
    database: "klinik.sqlite",
    synchronize: true, // auto create tables
    logging: false,
    entities: [Doctor],
})

module.exports = AppDataSource