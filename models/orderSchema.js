const mongoose = require("mongoose");
const customers = require("./customerSchema");


const orderSchema = new mongoose.Schema({
    orderNo: {
        type: String,
        require: true,
    },
    brand: {
        type: String,
        require: true,
    },
    orderDate: {
        type: Date,
        // require: true,
    },
    expectedDate: {
        type: Date,
        // require: true,
    },
    customerName: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:'customers'
    }],
    productCount: {
        type: Number,
        require: true,
    },
    orderStatus: {
        type: String,
        // default:false
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
    bill: {
        type: String,
    },
    ship: {
        type: String,
    },
})

const orders = new mongoose.model("order", orderSchema)

module.exports = orders;