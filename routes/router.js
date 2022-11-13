const express = require("express");
const router = express.Router();
const customers = require("../models/customerSchema");
const orders = require("../models/orderSchema");

// router.get("/",(req,res)=>{
//     console.log("Connect");
// })

router.get("/getCustomer", async (req, res) => {
    try {
        const customerData = await customers.find();
        res.status(201).json(customerData);
        // console.log(userData);
    } catch (error) {

    }
})

router.get("/getOrders", async (req, res) => {
    try {
        const customerData = await orders.find()
        .populate({path: "customerName"})
        // return this._id.orderDate.toDateString();
        res.status(201).json(customerData);
        console.log(customerData);
    } catch (error) {

    }
})

router.post("/registerCustomer", async (req, res) => {
    // console.log(req.body);

    const { name,email,contact,country,state,city,zip,addDate } = req.body;

    if (!name || !email || !contact || !country || !state || !city || !zip ) {

        res.status(422).json("plz fill data");
        return
    }

    try {

        const preCustomer = await customers.findOne({ contact: contact });
        console.log(preCustomer);

        if (preCustomer) {
            res.status(422).json("User already present");
        }
        else {
            const addCustomer = new customers({
                name,email,contact,country,state,city,zip,addDate
            });
            await addCustomer.save();
            res.status(201).json(addCustomer);
            console.log(addCustomer);
        }


    } catch (error) {
        res.status(422).json(error);
    }
})

router.post("/registerOrder", async (req, res) => {
    // console.log(req.body);

    const { orderNo,brand,orderDate,expectedDate,customerName,productCount,orderStatus,country,state,city,zip,bill,ship } = req.body;

    if (!orderNo || !brand  || !productCount ) {

        res.status(422).json("plz fill data");
        return
    }

    try {

        const preOrder = await orders.findOne({ orderNo: orderNo });
        console.log(preOrder);

        if (preOrder) {
            res.status(422).json("User already present");
        }
        else {
            const addOrder = new orders({
                orderNo,brand,orderDate,expectedDate,customerName,productCount,orderStatus,country,state,city,zip,bill,ship
            });
            await addOrder.save();
            res.status(201).json(addOrder);
            console.log(addOrder);
        }


    } catch (error) {
        res.status(422).json(error);
    }
})

router.delete("/deleteCustomer/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const deleteCustomer = await customers.findByIdAndDelete({_id:id});
        console.log(deleteCustomer);
        res.status(201).json(deleteCustomer);
}catch (error) {
    res.status(422).json(error);
}
})

router.delete("/deleteOrder/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const deleteOrder = await orders.findByIdAndDelete({_id:id});
        console.log(deleteOrder);
        res.status(201).json(deleteOrder);
}catch (error) {
    res.status(422).json(error);
}
})

router.patch("/updateCustomer/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const updatedCustomer = await customers.findByIdAndUpdate( id, req.body,
            // {$push:{bank:req.body.users}},
            {
            new: true
        });
        console.log(updatedCustomer);
        res.status(201).json(updatedCustomer);
}catch (error) {
    res.status(422).json(error);
}
})

router.patch("/updateOrder/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const updatedOrder = await orders.findByIdAndUpdate( id, req.body,
            // {$push:{bank:req.body.users}},
            {
            new: true
        });
        console.log(updatedOrder);
        res.status(201).json(updatedOrder);
}catch (error) {
    res.status(422).json(error);
}
})

router.get("/getCustomer/:id", async (req, res) => {
    try {
        console.log(req.params);
        const { id } = req.params;

        const userindividual = await customers.findById({ _id: id });

        console.log(userindividual);
        res.status(201).json(userindividual);

    } catch (error) {
        res.status(422).json(error);
    }
})

router.get("/getOrder/:id", async (req, res) => {
    try {
        console.log(req.params);
        const { id } = req.params;

        const orderindividual = await orders.findById({ _id: id });

        console.log(orderindividual);
        res.status(201).json(orderindividual);

    } catch (error) {
        res.status(422).json(error);
    }
})






module.exports = router;
