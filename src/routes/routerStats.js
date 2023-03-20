const { Router } = require('express')
const { statsHandler, statsUserByID } = require('../controllers/stats/statsHandler')
const routerStats = Router()


routerStats.get('/', statsHandler);
routerStats.get('/user', statsUserByID);

module.exports = routerStats
