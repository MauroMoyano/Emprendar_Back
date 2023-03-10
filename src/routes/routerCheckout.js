const { Router } = require("express");
const routeCheckout = Router()
const {checkoutHl} = require('../controllers/checkout/checkoutHandler')



routeCheckout.post('/payment', checkoutHl)


module.exports = routeCheckout