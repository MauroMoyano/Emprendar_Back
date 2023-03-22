const { Router } = require('express')
const { postReputation, getReputation, changeReputationUser, getReputationPost } = require('../controllers/Reputation/reputationHandler')
const routerReputation = Router()

/* quey */
routerReputation.get('/', getReputation)
/* body */
routerReputation.post('/', postReputation)
/* body */
routerReputation.put('/', changeReputationUser)
/* query */
routerReputation.get('/user', getReputationPost)

module.exports = routerReputation