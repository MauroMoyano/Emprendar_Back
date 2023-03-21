const { Project, User, Country, Category } = require('../../db')
const { getCategories } = require('../category/categoryController');
const getCountry = require('../county/countryController');


const categoriesMostUsed = async ()=>{

    const listCategories = await getCategories();
    let result = [];

    for (const cat of listCategories) {
        const { count } = await Project.findAndCountAll({
            where: { deletedAt: null, validated: 'aceptado'},
    include: [{
        model: Category, where: {name: cat} , attributes: [], through: { attributes: [] }
    }, 
    {model: User, where: { confirmed: true, eliminatedByAdmin: false, deletedAt: null }, attributes: []}
]

    })
    result.push({name: cat, value: count})
    
}
    return result;

}

const countriesMostUsed = async ()=>{

    const listCountry = await getCountry();
    let result = [];

    for (const region of listCountry) {
        const { count } = await Project.findAndCountAll({
        where: { deletedAt: null, validated: 'aceptado'},
        include: [{
            model: Country, where: {name: region} , attributes: []
        }, 
        {model: User, where: { confirmed: true, eliminatedByAdmin: false, deletedAt: null }, attributes: []}
    ]

        })
        result.push({name: region, value: count})
    
    }
    return result;

}

const goalSuccessMedia = async ()=>{
    const AllProjects = await Project.findAll({
        where: { deletedAt: null, validated: 'aceptado'},
        attributes: ["goal", "amount_collected"],
        include: [{model: User, where: { confirmed: true, eliminatedByAdmin: false, deletedAt: null }, attributes: []}]
    })

    console.log(AllProjects)

        let countAll = 0;
        let countGoalComplete = 0;
    for (const meta of AllProjects) {
        countAll = countAll + 1; 
  
        console.log(meta.dataValues.amount_collected, meta.dataValues.goal)
        if(Number(meta.dataValues.amount_collected) >= Number(meta.dataValues.goal)){
            countGoalComplete = countGoalComplete + 1;
        }
    }
    

    let countGoalIncomplete = countAll - countGoalComplete;

    const result = [
        {name: "Sin Alcanzar la meta", value: countGoalIncomplete},
        {name: "Alcanzaron la meta", value: countGoalComplete},
    ]

    console.log(result)

    return result;


}

const totalUsers = async ()=>{
    const infoDB = await User.findAll({where: { confirmed: true, eliminatedByAdmin: false, deletedAt: null }});


    let countUser = 0;
    infoDB.map(user => {
        countUser = countUser + 1;
    })

    return countUser;
}

const totalProjects = async ()=>{
    const AllProjects = await Project.findAll({
        where: { deletedAt: null, validated: 'aceptado'},
        attributes: ["goal", "amount_collected"],
        include: [{model: User, where: { confirmed: true, eliminatedByAdmin: false, deletedAt: null }, attributes: []}]
    })

    let countAllProjects = 0;

    AllProjects.map(project => {
        countAllProjects = countAllProjects + 1;
    })

    return countAllProjects;
}

const totalGoalColected = async ()=>{
    const AllProjects = await Project.findAll({
        where: { deletedAt: null, validated: 'aceptado'},
        attributes: ["amount_collected"],
        include: [{model: User, where: { confirmed: true, eliminatedByAdmin: false, deletedAt: null }, attributes: []}]
    })

    let totalGoal = 0;
    AllProjects.map(Project =>{
        totalGoal = totalGoal + Number(Project.amount_collected);
    })

    return totalGoal;
}

const amount_collectedByID = async (id)=>{
    if(id){
        const infoDB = await Project.findAll({
            attributes: ['amount_collected'],
            where:{ validated: 'aceptado', deletedAt: null, },
            include: [{model: User, where: { id: id, confirmed: true, eliminatedByAdmin: false, deletedAt: null },
            attributes: []
            }]
        })

    let sumatoria = 0;

    infoDB.map(project => {
        sumatoria = sumatoria + Number(project.amount_collected);
    })

    return sumatoria;
    }else{
        throw new Error('No se recibio un ID para hacer la consulta');
    }
}






module.exports = {
    categoriesMostUsed,
    countriesMostUsed,
    goalSuccessMedia,
    totalUsers,
    totalProjects,
    totalGoalColected,
    amount_collectedByID,
}