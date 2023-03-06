const getCountry = require("./countryController")

const getAllCountries = async (req, res) => {
    try {
        let result = await getCountry()
        res.status(201).json(result)
    } catch (error) {
        res.status(406).json({ error: error.message })

    }
}

module.exports = getAllCountries