const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    contact: {
        type: Number,
        require: true,
    },
    country: {
        type: String,
        require: true,
    },
    state: {
        type: String,
        require: true,
    },
    city: {
        type: String,
        require: true,
    },
    zip: {
        type: Number,
        require: true,
    },
    addDate: {
        type: String,
        // require: true,
    },   
})

const customers = new mongoose.model("customers", customerSchema)

module.exports = customers;
