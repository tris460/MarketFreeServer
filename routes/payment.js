const express = require("express");
const _ = require('underscore');
const app = express();
const Payment = require('../models/payment');

app.post ('/payment', async (req, res) => {
    //const {cardNumber, cardHolder, expirationDate, cvv} = req.body
    console.log(req.body)
    try {
        const resp = await Payment.findOne({ cardNumber: req.body.cardNumber});
        const {cardNumber, cardHolder, expirationDate, cvv} = resp
        console.log(resp)
        return res.json({
            cardNumber,
            cardHolder,
            expirationDate,
            cvv
        })
    } catch (error) {
        console.error("Valio madre payment", error)
        return res.status(500).json({mensaje: "Esta madre se cayó"})
    }    
})

module.exports = app;
