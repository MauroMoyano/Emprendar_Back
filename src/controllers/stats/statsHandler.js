const { categoriesMostUsed, countriesMostUsed, goalSuccessMedia, totalUsers, totalProjects, totalGoalColected, amount_collectedByID } = require("./statsController");


const statsHandler = async (req, res)=>{
    try {
        let result = {}
        result.categories = await categoriesMostUsed();
        result.countries = await countriesMostUsed();
        result.goalCompleted = await goalSuccessMedia();
        result.totalUsers = await totalUsers();
        result.totalProject = await totalProjects();
        result.totalGoal = await totalGoalColected();
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({error: error.message})
    }

}

const statsUserByID = async (req, res) =>{
    const { id } = req.query;
    try {
        let result = {};
        result.totalGoalID = await amount_collectedByID(id);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({error: error.message});
        
    }
}


module.exports = {
    statsHandler,
    statsUserByID
}