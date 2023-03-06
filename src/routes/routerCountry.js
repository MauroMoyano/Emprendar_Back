const { Router } = require("express");
const getAllCountries = require("../controllers/county/countryHandler");

const routerCountry = Router()


routerCountry.get('/', getAllCountries)



module.exports = routerCountry