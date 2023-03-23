const { Reputation } = require('../../db')

const postNewReputation = async (data) => {
    const { userQualifier, qualifiedUser, qualification } = data

    await Reputation.create({
        userQualifier,
        qualifiedUser,
        qualification
    })
    return 'ok'
}

const getReputationUser = async (data) => {
    let { qualifiedUser } = data
    console.log(qualifiedUser);
    return await Reputation.findAll({ where: { qualifiedUser: qualifiedUser }, attributes: ['qualification'] })
        .then(res => {
            if (!res.length) return { reputation: 0, count: 0 }
            let result = []
            let div = res.length
            for (const rep of res) {
                result.push(Number(rep.dataValues.qualification))
            }

            let resss = { reputation: Math.floor((result.reduce((a, b) => a + b, 0)) / div), count: div }
            return resss
        })
}

const getMiPostReputation = async (data) => {
    let { userQualifier, qualifiedUser } = data
    console.log('getMi =>>>>>', data);
    let result = await Reputation.findOne({ where: { qualifiedUser: qualifiedUser, userQualifier: userQualifier }, attributes: ['qualification'] })

    let reputation

    result
        ? reputation = result.dataValues.reputation
        : reputation = 0

    return reputation

}

const changeReputation = async (data) => {
    let { userQualifier, qualifiedUser, qualification } = data
    console.log('getChange =>>>>>', data);

    let reputationToChange = await Reputation.findOne({ where: { userQualifier, qualifiedUser } })

    reputationToChange.qualification = qualification

    reputationToChange.save()
}


module.exports = {
    postNewReputation,
    getReputationUser,
    changeReputation,
    getMiPostReputation
}