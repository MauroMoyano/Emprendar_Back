const { Country } = require('../../db')


const getCountry = async () => {
    let country = await Country.findAll()

    return country.map(count => {
        return count.dataValues.name
    });
}

module.exports = getCountry