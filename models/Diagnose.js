const {EntitySchema} = require("typeorm")

module.exports = new EntitySchema({
    name: "Diagnose",
    tableName: "diagnose",
    columns:{
        id: {
            primary: true,
            type: "integer",
            generated: true,
        },
        description: {
            type: "varchar",
        },
        name:{
            type: "varchar",
        },
    },relations:{
        patient:{
            type: "many-to-one",
            target: "Patient",        
            joinColumn: { name: "patientId" }, // foreign key column
            nullable: false,          //diagnose must belong to a patient
            onDelete: "CASCADE",      // delete diagnose if patient is deleted
        }
    }
})