const {EntitySchema} = require("typeorm")

module.exports = new EntitySchema({
    name: "Patient",
    tableName: "patients",
    columns:{
        id: {
            primary: true,
            type: "integer",
            generated: true,
        },
        firstname: {
            type: "varchar",
        },
        lastname:{
            type: "varchar",
        },
        address:{
            type: "varchar",
        },
        insuranceNR:{
            type: "varchar",
            unique: true,
        },
    },relations:{
        doctor:{
            type: "many-to-one",
            target: "Doctor",        
            joinColumn: { name: "doctorId" }, // foreign key column
            nullable: false,          // patient must belong to a doctor
            onDelete: "CASCADE",      // delete patients if doctor is deleted
        }
    }
})