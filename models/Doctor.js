const {EntitySchema} = require("typeorm")

module.exports = new EntitySchema({
    name: "Doctor",
    tableName: "doctors",
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
        email:{
            type: "varchar",
            unique: true,
        },
    },
})