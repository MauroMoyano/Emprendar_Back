const { Router } = require('express')
const { postReputation, getReputation, changeReputationUser } = require('../controllers/Reputation/reputationHandler')
const routerReputation = Router()

/* quey */
routerReputation.get('/', getReputation)
/* body */
routerReputation.post('/', postReputation)
/* body */
routerReputation.put('/', changeReputationUser)


module.exports = routerReputation