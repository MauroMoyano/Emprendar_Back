const { postNewReputation, getReputationUser, changeReputation } = require("./reputarionController")


const postReputation = async (req, res) => {
    try {
        await postNewReputation(req.body)
        res.status(201).send('ok')
    } catch (error) {
        res.status(406).json({ error: error.message })
    }
}

const getReputation = async (req, res) => {
    try {
        let result = await getReputationUser(req.query)
        res.status(201).json(result)
    } catch (error) {
        res.status(406).json({ error: error.message })
    }
}

const changeReputationUser = async (req, res) => {
    try {
        await changeReputation(req.body)
        res.status(201).send('cambio aceptado')
    } catch (error) {
        res.status(406).send({ error: error.message })

    }
}


module.exports = {
    postReputation,
    getReputation,
    changeReputationUser
}